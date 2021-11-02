import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { SHOP_NAME } from "~/config";
import ALink from "~/components/features/custom-link";
import ResetPasswordForm from "~/components/features/modals/forms/ResetPasswordForm";
import { useRouter } from "next/router";
import CustomLoader from "~/components/common/custom-loader";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
function ForgotPassword(props) {
  const router = useRouter();
  const [loadingToken, setLoadingToken] = useState(true);
  const token = router.query.token;

  useEffect(() => {
    if (!token || token === "") {
      toast.info("Token Is Empty", { autoClose: 1200 });
      setLoadingToken(false);
      router.push("/");
    }
    setLoadingToken(true);
    fetch(`${BASE_URL}/password_reset/validate_token/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.status === 404) throw new Error("Not Found");
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Token Not Valid", { autoClose: 1200 });
        router.push("/");
      })
      .finally(() => {
        setLoadingToken(false);
      });
  }, []);
  if (loadingToken) return <CustomLoader type="Grid" />;
  if (!props.loadingAuth && props.auth) router.push("/");
  if (!props.loadingAuth && !props.auth) {
    return (
      <main className="main">
        <Helmet>
          <title>Riode React eCommerce Template | Login</title>
        </Helmet>

        <h1 className="d-none">Riode React eCommerce Template - Login</h1>
        <nav className="breadcrumb-nav">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <ALink href="/">
                  <i className="d-icon-home"></i>
                </ALink>
              </li>
              <li>
                <ALink href="/shop">{SHOP_NAME} Shop</ALink>
              </li>
              <li>My Account</li>
            </ul>
          </div>
        </nav>
        <div className="page-content mt-6 pb-2 mb-10">
          <div className="container">
            <div className="login-popup">
              <div className="form-box">
                <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                  <Tabs
                    selectedTabClassName="active"
                    selectedTabPanelClassName="active"
                  >
                    <TabList className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                      <Tab className="nav-item">
                        <span className="nav-link border-no lh-1 ls-normal">
                          Reset Password
                        </span>
                      </Tab>
                    </TabList>

                    <div className="tab-content">
                      <p className="text-dark text-center">
                        Enter New Password
                      </p>
                      <hr />
                      <TabPanel className="tab-pane">
                        <ResetPasswordForm token={token} />
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  return <CustomLoader type="Grid" />;
}

export default React.memo(ForgotPassword);
