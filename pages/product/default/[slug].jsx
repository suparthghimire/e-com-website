import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';
import {GET_SINGLE_PRODUCT} from "~/api/queries";
import OwlCarousel from '~/components/features/owl-carousel';

import MediaThree from '~/components/partials/product/media/media-three';
import DetailOne from '~/components/partials/product/detail/detail-one';
import DescOne from '~/components/partials/product/desc/desc-one';
import RelatedProducts from '~/components/partials/product/related-products';
import { mainSlider17 } from '~/utils/data/carousel';
import Error404 from '../../404'

function ProductDefault ({api_product}) {
    const slug = useRouter().query.slug;
    if(api_product?.error) return <Error404/>
    if ( !slug ) return '';

    const { data, loading, error } = useQuery( GET_PRODUCT, { variables: { slug } } );
    const [ loaded, setLoadingState ] = useState( false );
    const product = data && data.product.data;
    const related = data && data.product.related;
    useEffect( () => {
        if ( !loading && api_product )
            imagesLoaded( 'main' ).on( 'done', function () {
                setLoadingState( true );
            } ).on( 'progress', function () {
                setLoadingState( false );
            } );
        if ( loading )
            setLoadingState( false )
    }, [ loading ] )
    console.log(product)
    return (
        <main className="main mt-6 single-product">
            <Helmet>
                <title>Riode React eCommerce Template | Product Masonry</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Product Masonry</h1>

            {
                api_product !== undefined ?
                    <div className={ `page-content mb-10 pb-6 ${ loaded ? '' : 'd-none' }` }>
                        <div className="container skeleton-body">
                            <div className="product product-single row mb-2">
                                <div className="col-md-6">
                                    <MediaThree product={ api_product.product } />
                                </div>

                                <div className="col-md-6">
                                    <DetailOne product={ api_product.product } isSticky={ true } isDesc={ true } />
                                </div>
                            </div>

                            {/* <DescOne product={ product } isGuide={ false } isShipping={ true } /> */}

                            {/* <RelatedProducts products={ related } /> */}
                        </div>
                    </div> : ''
            }
            {
                loaded && !loading ? ''
                    : <div className="skeleton-body container mb-10">
                        <div className="row mb-2">
                            <div className="col-md-6 product-masonry-type">
                                <div className="skel-pro-gallery"></div>
                            </div>

                            <div className="col-md-6">
                                <div className="skel-pro-summary mt-4 mt-md-0"></div>
                                <div className="skel-pro-tabs"></div>
                            </div>
                        </div>

                        <section className="pt-3 mt-4">
                            <h2 className="title justify-content-center">Related Products</h2>

                            <OwlCarousel adClass="owl-carousel owl-theme owl-nav-full" options={ mainSlider17 }>
                                {
                                    [ 1, 2, 3, 4, 5, 6 ].map( ( item ) =>
                                        <div className="product-loading-overlay" key={ 'popup-skel-' + item }></div>
                                    )
                                }
                            </OwlCarousel>
                        </section>
                    </div>
            } 
        </main>
    )
}

export default withApollo( { ssr: typeof window === 'undefined' } )( ProductDefault );


ProductDefault.getInitialProps = async (ctx)=>{
    const slug = ctx.query.slug;
    try {
        const product = await GET_SINGLE_PRODUCT(slug);
        const api_product={
            product: product[0],
            error: product[1],
        }
        return {api_product} 
    } catch (error) {
        console.error(error);
    }
    
}