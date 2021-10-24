import React from 'react';
import Reveal from 'react-awesome-reveal';

import ProductTwo from '~/components/features/product/product-two';

import { fadeIn } from '~/utils/data/keyframes';

function FeaturedCollection( props ) {
    const { products, loading } = props;

    return (
        <section className="mt-10 pt-7 mb-8">
            <div className="container">
                <h2 className="title title-simple title-center">Featured Products</h2>

                <Reveal keyframes={ fadeIn } triggerOnce>
                    {
                        loading ?
                            <div className="row cols-lg-4 cols-md-3 cols-2">
                                {
                                    [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( ( item ) =>
                                        <div
                                            className="product-loading-overlay col-lg-3 col-md-4 col-6 mb-0"
                                            key={ 'featured-skel-' + item }>
                                        </div>
                                    )
                                }
                            </div>
                            :
                            <div className="row cols-lg-4 cols-md-3 cols-2">
                                {
                                    products && products.map( item =>
                                        <ProductTwo product={ item } key={ 'featured-' + item.name } />
                                    )
                                }
                            </div>
                    }
                </Reveal>
            </div>
        </section>
    )
}

export default React.memo( FeaturedCollection );
