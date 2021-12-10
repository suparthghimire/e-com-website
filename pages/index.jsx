import React from "react";
import Helmet from "react-helmet";

import { useQuery } from "react-query";
import { TITLE } from "~/config";

// import Home Components
import NewsletterModal from "~/components/features/modals/newsletter-modal";
import IntroSection from "~/components/partials/home/intro-section";
import CategorySection from "~/components/partials/home/category-section";
import Trending from "~/components/partials/home/trending-collection";
import FeaturedCollection from "~/components/partials/home/featured-collection";
import BrandSection from "~/components/partials/home/brand-section";
import CustomLoader from "~/components/common/custom-loader";

import { GET_HOME_DATA_NEW } from "~/api/queries";

function HomePage() {
  const { data, status } = useQuery(["home-data", {}], GET_HOME_DATA_NEW);
  if (status === "loading") return <CustomLoader type="Grid" />;
  return (
    <div className="main home mt-lg-4 homepage">
      <Helmet>
        <title>{TITLE} - Home</title>
      </Helmet>
      <div className="page-content">
        <IntroSection
          category={data.results.category_products}
          promo={data.results.promo}
          nav={data.results.nav}
        />
        <div className="container container-large">
          <CategorySection category={data.results.category_products} />
          <Trending featured={data.results.trending_products} />

          <FeaturedCollection products={data.results.featured_products} />

          <BrandSection brands={data.results.brand} />
        </div>
      </div>

      {/* <NewsletterModal /> */}
    </div>
  );
}
export default HomePage;
