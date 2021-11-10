import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import ProductThree from "~/components/features/product/product-three";

import { productSlider } from "~/utils/data/carousel";
import { fadeIn, fadeInLeftShorter } from "~/utils/data/keyframes";

function Trending(props) {
  const { featured } = props;
  if (featured.length <= 0)
    return (
      <div className="d-flex mt-5 mb-5 w-100 justify-content-center">
        <h5>No Trending Products Found</h5>
      </div>
    );
  return (
    <Reveal keyframes={fadeIn} delay={200} duration={1200} triggerOnce>
      <section className="product-wrapper mt-9">
        <h2 className="title title-simple">Trending</h2>
        <OwlCarousel adClass="owl-theme owl-nav-full" options={productSlider}>
          {featured &&
            featured.map((item, index) => (
              <Reveal
                keyframes={fadeInLeftShorter}
                delay={Math.max(700 - index * 100, 200)}
                duration={1200}
                triggerOnce
                key={`top-rated-product ${index}`}
              >
                <ProductThree product={item} isCat={false} />
              </Reveal>
            ))}
        </OwlCarousel>
        {/* {loading ? (
          <OwlCarousel adClass="owl-theme owl-nav-full" options={productSlider}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                className="product-loading-overlay"
                key={"top-rated-skel-" + item}
              ></div>
            ))}
          </OwlCarousel>
        ) : (
          <OwlCarousel adClass="owl-theme owl-nav-full" options={productSlider}>
            {products &&
              products.map((item, index) => (
                <Reveal
                  keyframes={fadeInLeftShorter}
                  delay={Math.max(700 - index * 100, 200)}
                  duration={1200}
                  triggerOnce
                  key={`top-rated-product ${index}`}
                >
                  <ProductThree product={item} isCat={false} />
                </Reveal>
              ))}
          </OwlCarousel>
        )} */}
      </section>
    </Reveal>
  );
}

export default React.memo(Trending);
