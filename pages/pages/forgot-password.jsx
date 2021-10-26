import React from "react";
import Helmet from "react-helmet";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { SHOP_NAME } from "../../config";
import ALink from "~/components/features/custom-link";
import ForgotPasswordForm from "~/components/features/modals/forms/ForgotPasswordForm";

function ForgotPassword() {
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
                        Forgot Password
                      </span>
                    </Tab>
                  </TabList>

                  <div className="tab-content">
                    <p className="text-dark text-center">
                      Lost Your Password? Don't Worry! We have got you covered.
                      Enter Your Email Below to Proceed
                    </p>
                    <hr />
                    <TabPanel className="tab-pane">
                      <ForgotPasswordForm />
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

export default React.memo(ForgotPassword);
