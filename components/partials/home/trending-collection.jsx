import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import ProductThree from "~/components/features/product/product-three";
import ALink from "~/components/features/custom-link";

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
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="title title-simple">Trending</h2>
          <ALink href="/pages/shop" className="text-primary">
            View More
          </ALink>
        </div>
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
      </section>
    </Reveal>
  );
}

export default React.memo(Trending);
