import { useState, useEffect } from "react";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Helmet from "react-helmet";

import Layout from "~/components/layout";

import makeStore from "~/store";
import { demoActions } from "~/store/demo";
import Cookie from "js-cookie";
import { currentDemo } from "~/server/queries";
import { ToastContainer } from "react-toastify";
import "~/public/sass/style.scss";
import { BASE_URL } from "../config";

const App = ({ Component, pageProps, store }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (store.getState().demo.current !== currentDemo) {
      store.dispatch(demoActions.refreshStore(currentDemo));
    }
    const refresh = Cookie.get("rameti_ec_refresh");
    const access = Cookie.get("rameti_ec_access");

    fetch(`${BASE_URL}/me/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.code && user.code === "token_not_valid")
          throw Error("Invalid Token Error");
        console.log("User:", user);
        setUser(user);
        setAuth(true);
      })
      .catch((err) => {
        console.error(err.message);
        setAuth(false);
      });
  }, [auth]);

  return (
    <Provider store={store}>
      <PersistGate
        persistor={store.__persistor}
        loading={
          <div className="loading-overlay">
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

          <title>Riode - React eCommerce Template</title>

          <meta name="keywords" content="React Template" />
          <meta name="description" content="Riode - React eCommerce Template" />
          <meta name="author" content="D-THEMES" />
        </Helmet>

        <Layout auth={auth} user={user}>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </PersistGate>
    </Provider>
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
