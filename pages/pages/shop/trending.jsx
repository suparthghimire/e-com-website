import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import ALink from "~/components/features/custom-link";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import { useQuery } from "react-query";
import { GET_ALL_TRENDING_SHOP } from "../../../api/queries";
import ProductListOne from "../../../components/partials/shop/product-list/product-list-one";
import { useRouter } from "next/router";
import CustomLoader from "~/components/common/custom-loader";
import { TITLE } from "~/config";
import InfiniteScroll from "react-infinite-scroll-component";
function Shop() {
  const router = useRouter();
  const min_price = router.query.min_price || "";
  const max_price = router.query.max_price || "";
  const color = router.query.colors || "";
  const size = router.query.sizes || "";
  const page_size = router.query.page_size || "7";
  const brand = router.query.brand || "";
  const [pageNo, setPageNo] = useState("1");
  const { products, loading, errors, hasMore } = GET_ALL_TRENDING_SHOP({
    min_price,
    max_price,
    size,
    color,
    page: pageNo,
    page_size,
    brand,
  });
  // if (loading) return <CustomLoader type="Grid" />;
  return (
    <main className="main shop">
      <Helmet>
        <title>{TITLE} - Shop Page</title>
      </Helmet>

      <h1 className="d-none">Riode React eCommerce Template - Shop Page</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <div className="d-flex justify-content-between">
            <ul className="breadcrumb breadcrumb-sm">
              <li>
                <ALink href="/">
                  <i className="d-icon-home"></i>
                </ALink>
              </li>
              <li>Shop</li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="page-content mb-10">
        <div className="container">
          <div className="row gutter-lg main-content-wrap">
            {/* <SidebarFilterOne type="banner" /> */}
            <div className="col-lg-12 main-content">
              <ProductListOne
                type="banner"
                products={products}
                total_products={products.length}
                loading={loading}
                errors={errors}
                hasMore={hasMore}
                pageNo={pageNo}
                setPageNo={setPageNo}
              />
              {loading && <CustomLoader />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default React.memo(Shop);
