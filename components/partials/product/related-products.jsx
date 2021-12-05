import OwlCarousel from "~/components/features/owl-carousel";
import Reveal from "react-awesome-reveal";
import { fadeInRightShorter } from "~/utils/data/keyframes";

import ProductThree from "~/components/features/product/product-three";

import { mainSlider17, productSlider } from "~/utils/data/carousel";

export default function RelatedProducts(props) {
  const { products, adClass = "pt-3 pb-lg-10" } = props;
  return products.length > 0 ? (
    <section className={`related-products ${adClass}`}>
      <h2 className="title d-block text-center">Related Products</h2>
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
  ) : (
    ""
  );
}
