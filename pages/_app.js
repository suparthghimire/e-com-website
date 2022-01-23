import { useState, useEffect } from "react";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Helmet from "react-helmet";
import { QueryClient, QueryClientProvider } from "react-query";
import { TITLE } from "~/config";
import Layout from "~/components/layout";
import makeStore from "~/store";
import Cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "~/public/sass/style.scss";
import { GET_USER, GET_ACCESS_TOKEN } from "~/api/queries";

const queryClient = new QueryClient();

const App = ({ Component, pageProps, store }) => {
  const [auth, setAuth] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState(null);
  const refresh = Cookie.get("rameti_ec_refresh");
  const access = Cookie.get("rameti_ec_access");

  useEffect(() => {
    if (!access || access === undefined) {
      setAuth(false);
      setLoadingAuth(false);
      GET_ACCESS_TOKEN(refresh)
        .then(([tokens, error]) => {
          //ask refresh token to generate another access token and set that access token for the user
          if (error) throw error;
          setAccessToken(tokens.access);
          setRefreshToken(tokens.refresh);
        })
        .catch((error) => {
          console.error(error);
          // toast.error(
          //   "Failed to Fetch Access Token Using Refresh Token. Login Again",
          //   { autoClose: 1200 }
          // );
        });
    } else if (
      access === "" ||
      access.trim() === "" ||
      !refresh ||
      refresh === "" ||
      refresh.trim() === ""
    ) {
      const error = new Error("Unauthorized Error");
      error.status = 401;
      throw error;
    } else {
      setAccessToken(access);
      setRefreshToken(refresh);
      setLoadingAuth(true);
      GET_USER(access, refresh)
        .then(([user, error]) => {
          if (error) throw error;
          setUser(user);
          setAuth(true);
        })
        .catch((error) => {
          if (error.status === 401) {
            toast.error("Access/Refresh Token Invalid. Login Again", {
              autoClose: 1200,
            });
          }
        })
        .finally(() => {
          setLoadingAuth(false);
        });
    }
  }, [access, refresh, refreshToken, accessToken]);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate
          persistor={store.__persistor}
          loadingAuth={
            <div className="loadingAuth-overlay">
              <div className="bounce-loader">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
                <div className="bounce4"></div>
              </div>
            </div>
          }
        >
          <Helmet>
            <meta charSet="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />

            <title>{TITLE}</title>

            <meta name="keywords" content="React Template" />
            <meta
              name="description"
              content="Riode - React eCommerce Template"
            />
            <meta name="author" content="D-THEMES" />
          </Helmet>

          <Layout auth={auth} user={user}>
            <Component
              {...pageProps}
              auth={auth}
              user={user}
              loadingAuth={loadingAuth}
            />
          </Layout>
          <ToastContainer />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

App.getInitialProps = async ({ Component, ctx, req }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default withRedux(makeStore)(App);
