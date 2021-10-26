import React from "react";
import Reveal from "react-awesome-reveal";
import Menu from "~/components/partials/home/menu-section";
// import Custom Components
import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";

import { introSlider } from "~/utils/data/carousel";
import {
  fadeInUpShorter,
  fadeInRightShorter,
  fadeIn,
  fadeInLeftShorter,
} from "~/utils/data/keyframes";

function IntroSection() {
  return (
    <section className="intro-section">
      <div className="container">
        <div className="row grid">
          <Reveal
            keyframes={fadeInRightShorter}
            delay={200}
            triggerOnce
            style={{ display: "contents" }}
          >
            <Menu />
          </Reveal>

          <div className="grid-item height-x2">
            <Reveal keyframes={fadeIn} delay={200} triggerOnce>
              <OwlCarousel
                adClass="intro-slider owl-theme owl-dot-inner owl-dot-dark owl-full-height animation-slider"
                options={introSlider}
              >
                <div
                  className="intro-slide1 banner banner-fixed banner-radius"
                  style={{ backgroundColor: "#f6f5f7" }}
                >
                  <figure>
                    <img
                      src="./images/home/slides/1.jpg"
                      width="580"
                      height="508"
                      alt="banner"
                    />
                  </figure>
                  <div className="banner-content y-50">
                    <Reveal keyframes={fadeInLeftShorter} duration={1000}>
                      <h4 className="banner-subtitle text-uppercase font-weight-normal ls-normal">
                        <span className="text-primary font-weight-bold">
                          01.&nbsp;&nbsp;
                        </span>
                        BEST SELLERS STORE
                      </h4>
                    </Reveal>

                    <Reveal
                      keyframes={fadeInLeftShorter}
                      duration={1000}
                      delay={400}
                    >
                      <h3 className="banner-title font-weight-bold ls-md">
                        Our greatest hits <br />
                        for women
                      </h3>
                    </Reveal>

                    <Reveal
                      keyframes={fadeInUpShorter}
                      duration={1000}
                      delay={700}
                    >
                      <p className="font-weight-normal ls-normal lh-1 text-uppercase text-dark mb-5">
                        Starting At{" "}
                        <strong className="text-primary">$24.00</strong>
                      </p>
                    </Reveal>

                    <Reveal
                      keyframes={fadeInUpShorter}
                      duration={1000}
                      delay={900}
                    >
                      <ALink
                        href="/shop"
                        className="btn btn-dark btn-sm btn-rounded"
                      >
                        Shop now
                      </ALink>
                    </Reveal>
                  </div>
                </div>
                <div
                  className="intro-slide2 banner banner-fixed banner-radius"
                  style={{ backgroundColor: "#e4e8ec" }}
                >
                  <figure>
                    <img
                      src="./images/home/slides/2.jpg"
                      width="580"
                      height="508"
                      alt="banner"
                    />
                  </figure>
                  <div className="banner-content y-50">
                    <Reveal keyframes={fadeInLeftShorter} delay={200}>
                      <h4 className="banner-subtitle text-uppercase font-weight-normal ls-normal">
                        <span className="text-primary font-weight-bold">
                          02.&nbsp;
                        </span>
                        BEST SELLERS STORE
                      </h4>

                      <Reveal keyframes={fadeInLeftShorter} delay={200}>
                        <h3 className="banner-title font-weight-bold ls-md mb-2">
                          Big Sale <br />
                          for women
                        </h3>
                      </Reveal>

                      <p className="text-uppercase text-dark ml-1">
                        Up To
                        <strong className="text-primary ml-1 mr-1">
                          $24.00
                        </strong>
                        <strong>Off</strong>
                      </p>
                      <ALink
                        className="btn btn-white btn-sm btn-rounded btn-shadow"
                        href="/shop"
                      >
                        Shop now
                      </ALink>
                    </Reveal>
                  </div>
                </div>
                <div
                  className="intro-slide3 banner banner-fixed banner-radius"
                  style={{ backgroundColor: "#1d1b1a" }}
                >
                  <figure>
                    <img
                      src="./images/home/slides/3.jpg"
                      width="580"
                      height="508"
                      alt="Banner"
                    />
                  </figure>
                  <div className="banner-content y-50">
                    <Reveal keyframes={fadeInUpShorter} duration={1000}>
                      <h4 className="banner-subtitle text-uppercase text-white font-weight-normal ls-normal">
                        <span className="text-primary font-weight-bold">
                          03.&nbsp;
                        </span>
                        BEST SELLERS STORE
                      </h4>
                    </Reveal>

                    <Reveal
                      keyframes={fadeInUpShorter}
                      duration={1000}
                      delay={400}
                    >
                      <h3 className="banner-title font-weight-bold text-white ls-md">
                        Fashionable <br />
                        for men's
                      </h3>
                    </Reveal>

                    <Reveal
                      keyframes={fadeInUpShorter}
                      duration={1000}
                      delay={600}
                    >
                      <p className="font-weight-normal ls-normal lh-1 text-uppercase text-white mb-5">
                        Starting At{" "}
                        <strong className="text-primary">$24.00</strong>
                      </p>
                    </Reveal>

                    <Reveal
                      keyframes={fadeInUpShorter}
                      duration={1000}
                      delay={800}
                    >
                      <ALink
                        href="/shop"
                        className="btn btn-white btn-outline btn-sm btn-rounded"
                      >
                        Shop now
                      </ALink>
                    </Reveal>
                  </div>
                </div>
              </OwlCarousel>
            </Reveal>
          </div>

          <div className="grid-item height-x1">
            <Reveal keyframes={fadeInLeftShorter} delay={200} triggerOnce>
              <div
                className="intro-banner intro-banner1 banner banner-fixed banner-radius 
                                    overlay-dark"
                style={{ backgroundColor: "#eeeeee" }}
              >
                <ALink href="#">
                  <figure>
                    <img
                      src="./images/home/banners/1.jpg"
                      width="280"
                      height="241"
                      alt="banner"
                    />
                  </figure>
                </ALink>
                <div className="banner-content">
                  <h4 className="banner-subtitle text-uppercase font-weight-normal ls-s">
                    New Arrivals
                  </h4>
                  <h3 className="banner-title font-weight-normal text-capitalize ls-md">
                    Spring Essentials
                  </h3>
                  <ALink
                    href="/shop"
                    className="btn btn-dark btn-link btn-underline"
                  >
                    Shop Now<i className="d-icon-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid-item height-x1">
            <Reveal keyframes={fadeInLeftShorter} delay={200} triggerOnce>
              <div
                className="intro-banner intro-banner2 banner banner-fixed banner-radius 
                                    overlay-light"
                style={{ backgroundColor: "#e0dfde" }}
              >
                <ALink href="#">
                  <figure>
                    <img
                      src="./images/home/banners/2.jpg"
                      width="280"
                      height="241"
                      alt="banner"
                    />
                  </figure>
                </ALink>
                <div className="banner-content y-50">
                  <h3 className="banner-title ls-m font-weight-normal mb-5">
                    <strong className="text-uppercase">Cosmetics</strong>
                    <br />
                    Collection
                  </h3>
                  <ALink
                    href="/shop"
                    className="btn btn-link btn-underline mb-1"
                  >
                    Shop Now<i className="d-icon-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(IntroSection);
