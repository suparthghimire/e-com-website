import React from "react";
import Helmet from "react-helmet";
import ALink from "~/components/features/custom-link";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import { useQuery } from "react-query";
import { GET_SEARCH_PRODUCTS } from "../../api/queries";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { useRouter } from "next/router";
import CustomLoader from "~/components/common/custom-loader";
import { TITLE } from "~/config";

function Shop() {
  const router = useRouter();
  const title = router.query.title;
  const { data, status } = useQuery(
    ["search-products", { title }],
    GET_SEARCH_PRODUCTS
  );
  return (
    <main className="main shop">
      <Helmet>
        <title>{TITLE} - Shop Page</title>
      </Helmet>

      <h1 className="d-none">Riode React eCommerce Template - Shop Page</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb breadcrumb-sm">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>Shop</li>
          </ul>
        </div>
      </nav>
      {status === "loading" ? (
        <CustomLoader type="Grid" />
      ) : (
        <div className="page-content mb-10">
          <div className="container">
            <div className="row gutter-lg main-content-wrap">
              <SidebarFilterOne type="banner" />
              <div className="col-lg-9 main-content">
                {/* slug={slug} */}
                <ProductListOne
                  type="banner"
                  products={data.results}
                  total_products={data.count}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default React.memo(Shop);
