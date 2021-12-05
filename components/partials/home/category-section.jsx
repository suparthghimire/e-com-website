import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import CategorySingle from "~/components/features/category/category-single";
import ALink from "~/components/features/custom-link";

import { categorySlider } from "~/utils/data/carousel";
import { fadeIn, fadeInRightShorter } from "~/utils/data/keyframes";

function CategorySection(props) {
  if (props.category.length <= 0) return <div>No Categories Found</div>;
  return (
    <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
      <section className="product-wrapper mt-10 pt-3">
        <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ padding: "0 -1.5rem" }}
          >
            <h2 className="title title-simple">Category</h2>
            <ALink href="/pages/category" className="text-primary">
              View More
            </ALink>
          </div>
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
