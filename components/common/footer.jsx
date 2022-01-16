import ALink from "~/components/features/custom-link";

import CustomLoader from "~/components/common/custom-loader";
import { GET_HOME_DATA_NEW } from "~/api/queries";
import { useQuery } from "react-query";
import brandSection from "../partials/home/brand-section";
export default function Footer() {
  const { data, status } = useQuery(["home-data", {}], GET_HOME_DATA_NEW);
  if (status === "loading") return <CustomLoader type="Grid" />;
  return (
    <footer className="footer mt-10">
      <div className="container container-large">
        <div className="footer-middle">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="widget widget-about">
                <ALink href="/" className="logo-footer">
                  <img
                    src="./images/home/vamalogo_edit.png"
                    alt="logo-footer"
                    width="100"
                  />
                  {/* height="71.8" */}
                </ALink>

                <div className="widget-contact-info widget-collapsible">
                  <ul className="contact-info">
                    <li className="info phone">
                      <label>Phone:</label>
                      <ALink href="tel:#">
                        {data.results.company.contact_one}
                      </ALink>
                    </li>
                    <li className="info email">
                      <label>Email:</label>
                      <ALink href="mailto:mail@riode.com">
                        {data.results.company.email}
                      </ALink>
                    </li>
                    <li className="info addr">
                      <label>Address:</label>
                      <ALink href="#">{data.results.company.address}</ALink>
                    </li>
                    <li className="info work">
                      <label>Business Name:</label>
                      <ALink href="#">
                        {data.results.company.company_name}
                      </ALink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="widget widget-info">
                <h4 className="widget-title">About Us</h4>
                <ul className="widget-body">
                  {data.results.pages.map((item, index) =>
                    item.content_type === "aboutus" ? (
                      <li>
                        <ALink
                          href={"/singlepage/" + item.slug}
                          key={"singlepage-" + index}
                        >
                          {item.title}
                        </ALink>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="widget widget-service">
                <h4 className="widget-title">Customer Service</h4>
                <ul className="widget-body">
                  {data.results.pages.map((item, index) =>
                    item.content_type === "customer" ? (
                      <li>
                        <ALink
                          href={"/singlepage/" + item.slug}
                          key={"singlepage-" + index}
                        >
                          {item.title}
                        </ALink>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>

            {/* <div className="col-lg-3 col-sm-6">
              <div className="widget widget-instagram">
                <h4 className="widget-title">Instagram</h4>
                <figure className="widget-body row">
                  <div className="col-3">
                    <img
                      src="./images/instagram/01.jpg"
                      alt="instagram 1"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <img
                      src="./images/instagram/02.jpg"
                      alt="instagram 2"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <img
                      src="./images/instagram/03.jpg"
                      alt="instagram 3"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <img
                      src="./images/instagram/04.jpg"
                      alt="instagram 4"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <img
                      src="./images/instagram/05.jpg"
                      alt="instagram 5"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <img
                      src="./images/instagram/06.jpg"
                      alt="instagram 6"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <img
                      src="./images/instagram/07.jpg"
                      alt="instagram 7"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <img
                      src="./images/instagram/08.jpg"
                      alt="instagram 8"
                      width="64"
                      height="64"
                    />
                  </div>
                </figure>
              </div>
            </div> */}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <figure className="payment">
              <img
                src="./images/payment_new.png"
                alt="payment"
                width="159"
                height="29"
              />
            </figure>
          </div>
          <div className="footer-center">
            <p className="copyright">
              All Rights Reserved to{" "}
              <span className="color-primary"> Rameti</span>
              &nbsp;, 2021 &nbsp;|&nbsp;Powered By: Bidhee Pvt. Ltd.
            </p>
          </div>
          <div className="footer-right">
            <div className="social-links">
              <a
                href={data.results.company.facebook_link}
                className="social-link social-facebook fab fa-facebook-f"
              ></a>
              <ALink
                href="#"
                className="social-link social-twitter fab fa-twitter"
              ></ALink>
              <ALink
                href="#"
                className="social-link social-linkedin fab fa-linkedin-in"
              ></ALink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
