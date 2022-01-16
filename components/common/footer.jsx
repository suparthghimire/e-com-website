import ALink from "~/components/features/custom-link";

import CustomLoader from "~/components/common/custom-loader";
import { GET_HOME_DATA_NEW } from "~/api/queries";
import { useQuery } from "react-query";
import brandSection from "../partials/home/brand-section";
export default function Footer() {
  const { data, status } = useQuery(["home-data", {}], GET_HOME_DATA_NEW);
  if (status === "loading") return <CustomLoader type="Grid" />;
  const { facebook_link, instagram_link, twitter_link, youtube_link } =
    data.results.company;
  const aboutus = data.results.pages.filter(
    (page) => page.content_type === "aboutus"
  );
  const customer = data.results.pages.filter(
    (page) => page.content_type === "customer"
  );
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
                      <ALink href={"tel:" + data.results.company.contact_one}>
                        {data.results.company.contact_one}
                      </ALink>
                    </li>
                    <li className="info email">
                      <label>Email:</label>
                      <ALink href={"mailto:" + data.results.company.email}>
                        {data.results.company.email}
                      </ALink>
                    </li>
                    <li className="info addr">
                      <label>Address:</label>
                      {data.results.company.address}
                    </li>
                    <li className="info work">
                      <label>Business Name:</label>
                      {data.results.company.company_name}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="widget widget-info">
                <h4 className="widget-title">About Us</h4>
                <ul className="widget-body">
                  {aboutus.map((item, index) => (
                    <li>
                      <ALink
                        href={"/singlepage/" + item.slug}
                        key={"singlepage-" + index}
                      >
                        {item.title}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="widget widget-service">
                <h4 className="widget-title">Customer Service</h4>
                <ul className="widget-body">
                  {customer.map((item, index) => (
                    <li>
                      <ALink
                        href={"/singlepage/" + item.slug}
                        key={"singlepage-" + index}
                      >
                        {item.title}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
              <span className="color-primary">
                {" "}
                {data.results.company.company_name}
              </span>
              &nbsp;, 2021 &nbsp;|&nbsp;Powered By: Bidhee Pvt. Ltd.
            </p>
          </div>
          <div className="footer-right">
            <div className="social-links">
              <a
                href={facebook_link}
                className="social-link social-facebook fab fa-facebook-f"
                target={facebook_link ? "_blank" : ""}
              ></a>
              <a
                href={twitter_link}
                className="social-link social-twitter fab fa-twitter"
                target={twitter_link ? "_blank" : ""}
              ></a>
              <a
                href={instagram_link}
                className="social-link social-instagram fab fa-instagram"
                target={instagram_link ? "_blank" : ""}
              ></a>

              <a
                href={youtube_link}
                className="social-link social-youtube fab fa-youtube"
                target={youtube_link ? "_blank" : ""}
              ></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
