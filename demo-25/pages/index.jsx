import React from 'react';
import Helmet from 'react-helmet';

import { useQuery } from "@apollo/react-hooks";

// Import Apollo Server and Query
import withApollo from '../server/apollo';
import { GET_HOME_DATA } from '../server/queries';

// import Home Components
import NewsletterModal from '~/components/features/modals/newsletter-modal';
import IntroSection from '~/components/partials/home/intro-section';
import ProductCollection from '~/components/partials/home/product-collection';
import BannerSection from '~/components/partials/home/banner-section';
import BannerSectionTwo from '~/components/partials/home/banner-section-two';
import TopRatedCollection from '~/components/partials/home/top-rated-collection';
import FeaturedCollection from '~/components/partials/home/featured-collection';
import BrandSection from '~/components/partials/home/brand-section';

function HomePage() {
    const { data, loading, error } = useQuery( GET_HOME_DATA, { variables: { productsCount: 7 } } );
    const featured = data && data.specialProducts.featured;
    const topRated = data && data.specialProducts.topRated;

    return (
        <div className="main home mt-lg-4 homepage">
            <Helmet>
                <title>Riode React eCommerce Template - Home</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Home</h1>

            <div className="page-content">
                <div className="container">
                    <IntroSection />

                    <ProductCollection />

                    <BannerSection />

                    <FeaturedCollection products={ featured } loading={ loading } />

                    <BannerSectionTwo />

                    <TopRatedCollection products={ topRated } loading={ loading } />

                    <BrandSection />
                </div>
            </div>

            <NewsletterModal />
        </div>
    )
}

export default withApollo( { ssr: typeof window === 'undefined' } )( HomePage );