import React from "react";
import { useRouter } from "next/router";
import Helmet from "react-helmet";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import CustomLoader from "../../components/common/custom-loader";
import EditProfile from "~/components/features/modals/forms/EditProfileForm";
import ChangePassword from "~/components/features/modals/forms/ChangePasswordForm";
import Orders from "~/components/partials/account/orders";
import Dashboard from "~/components/partials/account/dashboard";
import ALink from "~/components/features/custom-link";
import { TITLE } from "~/config";

function Account(props) {
  const router = useRouter();

  if (!props.loadingAuth && !props.auth) router.push("/pages/login");
  if (!props.loadingAuth && props.auth)
    return (
      <main className="main account">
        <Helmet>
          <title>{TITLE} | Account</title>
        </Helmet>

        <h1 className="d-none">Riode React eCommerce Template - Account</h1>

        <nav className="breadcrumb-nav">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <ALink href="/">
                  <i className="d-icon-home"></i>
                </ALink>
              </li>
              <li>Account</li>
            </ul>
          </div>
        </nav>

        <div className="page-content mt-4 mb-10 pb-6">
          <div className="container">
            <h2 className="title title-center mb-10">{props.user.full_name}</h2>

            <Tabs
              selectedTabClassName="show"
              selectedTabPanelClassName="active"
              defaultIndex={0}
              className="tab tab-vertical gutter-lg"
            >
              <TabList
                className="nav nav-tabs mb-4 col-lg-3 col-md-4"
                role="tablist"
              >
                <Tab className="nav-item">
                  <a className="nav-link">Dashboard</a>
                </Tab>
                <Tab className="nav-item">
                  <a className="nav-link">Orders</a>
                </Tab>
                <Tab className="nav-item">
                  <a className="nav-link">Account details</a>
                </Tab>
                <Tab className="nav-item">
                  <a className="nav-link">Change Password</a>
                </Tab>
                {/* <Tab className="nav-item">
                  <a className="nav-link">Billing Address and Shipping Address</a>
                </Tab> */}
              </TabList>
              <div className="tab-content col-lg-9 col-md-8">
                <TabPanel className="tab-pane dashboard">
                  <Dashboard user={props.user} />
                </TabPanel>
                <TabPanel className="tab-pane">
                  <Orders />
                </TabPanel>
                <TabPanel className="tab-pane">
                  <EditProfile user={props.user} />
                </TabPanel>
                <TabPanel className="tab-pane">
                  <ChangePassword />
                </TabPanel>
                {/* <TabPanel className="tab-pane">
                  <p className="mb-2">
                    The following addresses will be used on the checkout page by
                    default.
                  </p>
                  <div className="row">
                    <div className="col-sm-6 mb-4">
                      <div className="card card-address">
                        <div className="card-body">
                          <h5 className="card-title text-uppercase">
                            Billing Address
                          </h5>
                          <p>
                            John Doe
                            <br />
                            Riode Company
                            <br />
                            Steven street
                            <br />
                            El Carjon, CA 92020
                          </p>
                          <ALink
                            href="#"
                            className="btn btn-link btn-secondary btn-underline"
                          >
                            Edit <i className="far fa-edit"></i>
                          </ALink>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 mb-4">
                      <div className="card card-address">
                        <div className="card-body">
                          <h5 className="card-title text-uppercase">
                            Shipping Address
                          </h5>
                          <p>You have not set up this type of address yet.</p>
                          <ALink
                            href="#"
                            className="btn btn-link btn-secondary btn-underline"
                          >
                            Edit <i className="far fa-edit"></i>
                          </ALink>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel> */}
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    );
  return <CustomLoader type="Grid" />;
}

export default React.memo(Account);
