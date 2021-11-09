import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import CategorySingle from "~/components/features/category/category-single";

import { categorySlider } from "~/utils/data/carousel";
import { fadeIn, fadeInRightShorter } from "~/utils/data/keyframes";

function CategorySection(props) {
  return (
    <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
      <section className="product-wrapper mt-10 pt-3">
        <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
          <h2 className="title title-simple">Category</h2>
        </Reveal>
        <OwlCarousel
          adClass="carousel owl-theme owl-nav-full"
          options={categorySlider}
        >
          {props.category &&
            props.category.map((item, index) => (
              <Reveal
                keyframes={fadeInRightShorter}
                delay={Math.max(700 - index * 100, 200)}
                duration={1200}
                triggerOnce
                key={`top-rated-product ${index}`}
              >
                <CategorySingle category={item} />
              </Reveal>
            ))}
        </OwlCarousel>
      </section>
    </Reveal>
  );
}

export default React.memo(CategorySection);
