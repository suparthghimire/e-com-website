import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import ALink from "~/components/features/custom-link";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import { useQuery } from "react-query";
// import { GET_BRAND_PRODUCTS } from "../../../api/queries";
import { GET_BRAND_PRODUCTS } from "~/api/queries";
import ProductListOne from "../../../components/partials/shop/product-list/product-list-one";
import { useRouter } from "next/router";
import CustomLoader from "~/components/common/custom-loader";
import { TITLE } from "~/config";

function BrandSlug() {
  const router = useRouter();
  const slug = router.query.brand_slug;
  const [pageNo, setPageNo] = useState("1");
  const { products, loading, errors, hasMore } = GET_BRAND_PRODUCTS({
    slug,
  });

  return (
    <main className="main shop">
      <Helmet>
        <title>{TITLE} - Brand Products</title>
      </Helmet>
      <nav className="breadcrumb-nav">
        <div className="container">
          <div className="d-flex justify-content-between">
            <ul className="breadcrumb breadcrumb-sm">
              <li>
                <ALink href="/">
                  <i className="d-icon-home"></i>
                </ALink>
              </li>
              <li>Brand Products</li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="page-content mb-10">
        <div className="container">
          <div className="row gutter-lg main-content-wrap">
            {/* <SidebarFilterOne type="banner" /> */}
            <div className="col-lg-12 main-content">
              {loading ? (
                <CustomLoader type="Grid" />
              ) : (
                <ProductListOne
                  itemsPerRow={4}
                  type="banner"
                  slug={slug}
                  products={products}
                  total_products={products.length}
                  loading={loading}
                  errors={errors}
                  hasMore={hasMore}
                  pageNo={pageNo}
                  setPageNo={setPageNo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default React.memo(BrandSlug);
