import React from "react";
import Reveal from "react-awesome-reveal";
import ALink from "~/components/features/custom-link";
// import OwlCarousel from "~/components/features/owl-carousel";
import Menu from "~/components/partials/home/menu-section";
// import { introSlider } from "~/utils/data/carousel";
import {
  fadeInUpShorter,
  fadeInRightShorter,
  fadeIn,
  fadeInLeftShorter,
} from "~/utils/data/keyframes";

function IntroSection(props) {
  if (props.category.length <= 0) return <div>No Categories Found!</div>;
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
            <Menu promo={props.promo} category={props.category} />
          </Reveal>
          {props.category.map((item, index) => {
            if (index === 0)
              return (
                <div className="grid-item height-x2">
                  <Reveal keyframes={fadeIn} delay={200} triggerOnce>
                    <div
                      className="intro-slide1 banner banner-fixed overlay-dark banner-radius"
                      style={{ backgroundColor: "#f6f5f7" }}
                    >
                      <figure>
                        <img
                          src={item.featured_image}
                          width="580"
                          height="508"
                          alt="banner"
                        />
                      </figure>
                      <div className="banner-content y-50">
                        <Reveal
                          keyframes={fadeInLeftShorter}
                          duration={1000}
                          delay={400}
                        >
                          <h4 className="banner-title font-weight-bold ls-md text-white">
                            {item.title}
                          </h4>
                        </Reveal>

                        <Reveal
                          keyframes={fadeInUpShorter}
                          duration={1000}
                          delay={700}
                        ></Reveal>

                        <Reveal
                          keyframes={fadeInUpShorter}
                          duration={1000}
                          delay={900}
                        >
                          <ALink
                            href="/shop"
                            className="btn btn-dark btn-link btn-underline text-white"
                          >
                            Shop Now<i className="d-icon-arrow-right"></i>
                          </ALink>
                        </Reveal>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            else if (index < 3)
              return (
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
                            src={item.featured_image}
                            width="280"
                            height="241"
                            alt="banner"
                          />
                        </figure>
                      </ALink>
                      <div className="banner-content">
                        <h3 className="banner-title text-capitalize ls-md text-white">
                          {item.title}
                        </h3>
                        <ALink
                          href="/shop"
                          className="btn btn-dark btn-link btn-underline text-white"
                        >
                          Shop Now<i className="d-icon-arrow-right"></i>
                        </ALink>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
          })}
        </div>
      </div>
    </section>
  );
}

export default React.memo(IntroSection);
