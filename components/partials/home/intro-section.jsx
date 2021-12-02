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
  if (props.category.length <= 0)
    return <div className="">No Categories Found!</div>;
  return (
    <section className="intro-section">
      <div className="container-fluid">
        <div className="row grid">
          <Reveal
            keyframes={fadeInRightShorter}
            delay={200}
            triggerOnce
            style={{ display: "contents" }}
          >
            <Menu
              promo={props.promo}
              category={props.category}
              nav={props.nav}
            />
          </Reveal>
          {props.category.map((item, index) => {
            if (index === 0)
              return (
                <div className="grid-item height-x2" key={index}>
                  <Reveal keyframes={fadeIn} delay={200} triggerOnce>
                    <div
                      className="intro-slide1 banner banner-fixed overlay-dark banner-radius"
                      style={{ backgroundColor: "#f6f5f7" }}
                    >
                      <ALink href={"/pages/category/" + item.slug}>
                        <figure>
                          <img
                            src={item.featured_image}
                            width="580"
                            height="508"
                            alt="banner"
                          />
                        </figure>
                      </ALink>
                      <div className="banner-content" style={{ top: "10%" }}>
                        <Reveal
                          keyframes={fadeInLeftShorter}
                          duration={1000}
                          delay={400}
                        >
                          <h4 className="banner-title font-weight-bold ls-md text-white mb-0">
                            {item.title}
                          </h4>
                        </Reveal>
                        <Reveal
                          keyframes={fadeInLeftShorter}
                          duration={1000}
                          delay={400}
                        >
                          <p
                            className="text-white mt-0 mb-5"
                            style={{ fontSize: "12px" }}
                          >
                            Burshes, Lashes, All cosmetics
                          </p>
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
                            href={"/pages/category/" + item.slug}
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
                <div className="grid-item height-x1" key={index}>
                  <Reveal keyframes={fadeInLeftShorter} delay={200} triggerOnce>
                    <div
                      className="intro-banner intro-banner1 banner banner-fixed banner-radius 
                                    overlay-dark"
                      style={{ backgroundColor: "#eeeeee" }}
                    >
                      <ALink href={"/pages/category/" + item.slug}>
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
                        <h3 className="banner-title text-capitalize ls-md mb-0">
                          {item.title}
                        </h3>
                        <p
                          className="text-dark mt-0"
                          style={{ fontSize: "12px" }}
                        >
                          Burshes, Lashes, All cosmetics
                        </p>
                        <ALink
                          href={"/pages/category/" + item.slug}
                          className="btn btn-dark btn-link btn-underline "
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
