import React from "react";
import { useRouter } from "next/router";
import Helmet from "react-helmet";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import CustomLoader from "../../components/common/custom-loader";
import EditProfile from "~/components/features/modals/forms/EditProfileForm";
import ALink from "~/components/features/custom-link";

function Account(props) {
  const router = useRouter();

  if (!props.loadingAuth && !props.auth) router.push("/pages/login");
  if (!props.loadingAuth && props.auth)
    return (
      <main className="main account">
        <Helmet>
          <title>Riode React eCommerce Template | Account</title>
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
            <h2 className="title title-center mb-10">My Account</h2>

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
                  <ALink className="nav-link" href="/">
                    Change Password
                  </ALink>
                </Tab>
              </TabList>
              <div className="tab-content col-lg-9 col-md-8">
                <TabPanel className="tab-pane dashboard">
                  <p className="mb-0">
                    Hello <span>{props.user.full_name}</span>
                  </p>
                  <p className="mb-8">
                    From your account dashboard you can view your recent orders,
                    manage and edit your password and account details.
                  </p>
                  <ALink href="/shop" className="btn btn-dark btn-rounded">
                    Go To Shop<i className="d-icon-arrow-right"></i>
                  </ALink>
                </TabPanel>
                <TabPanel className="tab-pane">
                  <table className="order-table">
                    <thead>
                      <tr>
                        <th className="pl-2">Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th className="pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="order-number">
                          <ALink href="#">#3596</ALink>
                        </td>
                        <td className="order-date">
                          <time>February 24, 2021</time>
                        </td>
                        <td className="order-status">
                          <span>On hold</span>
                        </td>
                        <td className="order-total">
                          <span>$900.00 for 5 items</span>
                        </td>
                        <td className="order-action">
                          <ALink
                            href="#"
                            className="btn btn-primary btn-link btn-underline"
                          >
                            View
                          </ALink>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel className="tab-pane">
                  <EditProfile user={props.user} />
                </TabPanel>
                <TabPanel className="tab-pane">
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
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    );
  return <CustomLoader type="Grid" />;
}

export default React.memo(Account);
