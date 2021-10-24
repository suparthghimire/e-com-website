import OwlCarousel from '~/components/features/owl-carousel';

import ProductThree from '~/components/features/product/product-three';

import { mainSlider17 } from '~/utils/data/carousel';

export default function RelatedProducts ( props ) {
    const { products, adClass = "pt-3 pb-lg-10" } = props;

    return (
        products.length > 0 ?
            <section className={ `related-products ${ adClass }` }>
                <h2 className="title d-block text-center">Related Products</h2>

                <OwlCarousel adClass="owl-carousel owl-theme owl-nav-full" options={ mainSlider17 }>
                    {
                        products && products.slice( 0, 5 ).map( ( item, index ) =>
                            <ProductThree product={ item } key={ 'product-two-' + index } adClass='' />
                        )
                    }
                </OwlCarousel>
            </section> : ''
    )
}