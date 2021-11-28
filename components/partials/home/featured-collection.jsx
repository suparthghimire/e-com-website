import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import ProductThree from "~/components/features/product/product-three";
import ALink from "~/components/features/custom-link";

import { productSlider } from "~/utils/data/carousel";
import { fadeIn, fadeInRightShorter } from "~/utils/data/keyframes";

function FeaturedCollection(props) {
  const { products } = props;
  if (products.length <= 0)
    return (
      <div className="d-flex mt-5 mb-5 w-100 justify-content-center">
        <h5>No Featured Products Found</h5>
      </div>
    );
  return (
    <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
      <section className="product-wrapper mt-10 pt-3">
        <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="title title-simple">Featured</h2>
            <ALink href="/pages/category" className="text-primary">
              View More
            </ALink>
          </div>
        </Reveal>

        <OwlCarousel adClass="owl-theme owl-nav-full" options={productSlider}>
          {products &&
            products.map((item, index) => (
              <Reveal
                keyframes={fadeInRightShorter}
                delay={300 + 100 * index}
                duration={1200}
                triggerOnce
                key={`featured-product-${index}`}
              >
                <ProductThree product={item} isCat={false} />
              </Reveal>
            ))}
        </OwlCarousel>
      </section>
    </Reveal>
  );
}

export default React.memo(FeaturedCollection);
