import React from "react";
import Helmet from "react-helmet";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useRouter } from "next/router";
import { SHOP_NAME } from "../../config";
import ALink from "~/components/features/custom-link";
import LoginForm from "~/components/features/modals/forms/LoginForm";
import RegisterForm from "~/components/features/modals/forms/RegisterForm";
import CustomLoader from "../../components/common/custom-loader";
import { TITLE } from "~/config";

function Login(props) {
  const router = useRouter();
  if (props.auth) router.push("/");
  else if (!props.loadingAuth)
    return (
      <main className="main">
        <Helmet>
          <title>{TITLE} | Login</title>
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
                          Sign in
                        </span>
                      </Tab>
                      <li className="delimiter">or</li>
                      <Tab className="nav-item">
                        <span className="nav-link border-no lh-1 ls-normal">
                          Register
                        </span>
                      </Tab>
                    </TabList>

                    <div className="tab-content">
                      <TabPanel className="tab-pane">
                        <LoginForm />
                      </TabPanel>

                      <TabPanel className="tab-pane">
                        <RegisterForm />
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
  return <CustomLoader type="Grid" />;
}

export default React.memo(Login);
