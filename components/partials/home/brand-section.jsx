import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import { brandSlider } from "~/utils/data/carousel";
import { fadeIn } from "~/utils/data/keyframes";
import ALink from "~/components/features/custom-link";

function BrandSection(props) {
  let { brands } = props;
  if (!brands || brands === null || brands.length <= 0)
    return (
      <div className="d-flex mt-5 mb-5 w-100 justify-content-center">
        <h5>No Brands Found</h5>
      </div>
    );
  return (
    <Reveal keyframes={fadeIn} duration={1200} delay={300} triggerOnce>
      <section className="brands mt-10 pt-3 mb-7">
        <h2 className="title title-simple">Our Brands</h2>

        <OwlCarousel adClass="owl-theme brand-carousel" options={brandSlider}>
          {brands.map((brand) => {
            return (
              <ALink href={"/pages/brand/" + brand.slug}>
                <figure>
                  <img
                    src={brand.image_url}
                    alt="Brand"
                    width="180"
                    height="100"
                  />
                </figure>
              </ALink>
            );
          })}
        </OwlCarousel>
      </section>
    </Reveal>
  );
}

export default React.memo(BrandSection);
