import React from "react";
import { connect } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import ALink from "~/components/features/custom-link";

import { modalActions } from "~/store/modal";

import { toDecimal } from "~/utils";
function DescOne(props) {
  const {
    product,
    isGuide = true,
    isDivider = true,
    openModal,
    isShipping = false,
  } = props;
  let colors = [] && product.product_image.map((pdt) => pdt.color_hex);
  let sizes = [] && product.available_sizes;
  console.log(product);
  const setRating = (e) => {
    e.preventDefault();

    if (e.currentTarget.parentNode.querySelector(".active")) {
      e.currentTarget.parentNode
        .querySelector(".active")
        .classList.remove("active");
    }

    e.currentTarget.classList.add("active");
  };

  const showVideoModalHandler = (e) => {
    e.preventDefault();
    let link = e.currentTarget.closest(".btn-play").getAttribute("data");
    openModal(link);
  };

  return (
    <Tabs
      className="tab tab-nav-simple product-tabs"
      selectedTabClassName="show"
      selectedTabPanelClassName="active"
      defaultIndex={0}
    >
      <TabList className="nav nav-tabs justify-content-center" role="tablist">
        <Tab className="nav-item">
          <span className="nav-link">Description</span>
        </Tab>
        {/* <Tab className="nav-item">
          <span className="nav-link">Additional information</span>
        </Tab> */}
        {isGuide ? (
          <Tab className="nav-item">
            <span className="nav-link">Size Guide</span>
          </Tab>
        ) : (
          ""
        )}
        {isShipping ? (
          <Tab className="nav-item">
            <span className="nav-link">Shipping &amp; Returns</span>
          </Tab>
        ) : (
          ""
        )}

        <Tab className="nav-item">
          <span className="nav-link">How to Use</span>
        </Tab>
      </TabList>

      <div className="tab-content">
        <TabPanel className="tab-pane product-tab-description">
          <div className="row mt-6">
            <div className="col-md-12">
              <h5 className="description-title mb-4 font-weight-semi-bold ls-m">
                Features
              </h5>
              <p className="mb-2">{product.description}</p>
            </div>
          </div>
        </TabPanel>
        {isShipping ? (
          <TabPanel className="tab-pane product-tab-shipping">
            <h6 className="mb-2">Free Shipping</h6>
            <p className="mb-0">
              We deliver to over 100 countries around the world. For full
              details of the delivery options we offer, please view our{" "}
              <ALink href="#" className="text-primary">
                Delivery information
              </ALink>
              <br />
              We hope you’ll love every purchase, but if you ever need to return
              an item you can do so within a month of receipt. For full details
              of how to make a return, please view our <br />
              <ALink href="#" className="text-primary">
                Returns information
              </ALink>
            </p>
          </TabPanel>
        ) : (
          ""
        )}
        <TabPanel className="tab-pane product-tab-description">
          <div className="row mt-6">
            <div className="col-md-12">
              <h6 className="mb-2">How to Use</h6>
              <p className="mb-2">{product.how_to_use}</p>
            </div>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
}

export default connect("", { openModal: modalActions.openModal })(DescOne);
