import React from "react";
import Helmet from "react-helmet";

// import { useQuery } from "@apollo/react-hooks";
import { useQuery } from "react-query";

// Import Apollo Server and Query
// import withApollo from "../server/apollo";
// import { GET_HOME_DATA } from "../server/queries";

// import Home Components
import NewsletterModal from "~/components/features/modals/newsletter-modal";
import IntroSection from "~/components/partials/home/intro-section";
import CategorySection from "~/components/partials/home/category-section";
// import ProductCollection from "~/components/partials/home/product-collection";
// import BannerSection from "~/components/partials/home/banner-section";
// import BannerSectionTwo from "~/components/partials/home/banner-section-two";
import Trending from "~/components/partials/home/trending-collection";
import FeaturedCollection from "~/components/partials/home/featured-collection";
import BrandSection from "~/components/partials/home/brand-section";
import CustomLoader from "~/components/common/custom-loader";

import { GET_HOME_DATA_NEW } from "~/api/queries";

function HomePage() {
  // const { data, loading, error } = useQuery(GET_HOME_DATA, {
  //   variables: { productsCount: 7 },
  // });

  const { data, status } = useQuery(["home-data", {}], GET_HOME_DATA_NEW);
  console.log(data, status);

  // const featured = data && data.specialProducts.featured;
  // const topRated = data && data.specialProducts.topRated;
  if (status === "loading") return <CustomLoader type="Grid" />;
  return (
    <div className="main home mt-lg-4 homepage">
      <Helmet>
        <title>Riode React eCommerce Template - Home</title>
      </Helmet>

      <h1 className="d-none">Riode React eCommerce Template - Home</h1>

      <div className="page-content">
        <IntroSection
          category={data.results.category}
          promo={data.results.promo}
        />
        <div className="container">
          <CategorySection category={data.results.category} />
          <Trending featured={data.results.featured} />

          <FeaturedCollection products={data.results.featured} />

          <BrandSection brands={data.results.brands} />
        </div>
      </div>

      {/* <NewsletterModal /> */}
    </div>
  );
}

// export default withApollo({ ssr: typeof window === "undefined" })(HomePage);
export default HomePage;
