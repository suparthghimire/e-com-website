import React from "react";
import Helmet from "react-helmet";
import ALink from "~/components/features/custom-link";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import { useQuery } from "react-query";
import { GET_CATEGORY } from "~/api/queries";
import ProductListOne from "../../../components/partials/shop/product-list/product-list-one";
import { useRouter } from "next/router";
import CustomLoader from "~/components/common/custom-loader";

function Shop() {
  const router = useRouter();
  const slug = router.query.category_slug;
  const min_price = router.query.min_price || "";
  const max_price = router.query.max_price || "";
  const color = router.query.colors || "";
  const size = router.query.sizes || "";
  const { data, status } = useQuery(
    ["single-category", { slug, min_price, max_price, size, color }],
    GET_CATEGORY
  );
  console.log(data, status);
  if (status === "loading") return <CustomLoader type="Grid" />;
  return (
    <main className="main shop">
      <Helmet>
        <title>Riode React eCommerce Template - Shop Page</title>
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

      <div className="page-content mb-10">
        <div className="container">
          <div className="row gutter-lg main-content-wrap">
            <SidebarFilterOne type="banner" />
            <div className="col-lg-9 main-content">
              <ProductListOne
                type="banner"
                slug={slug}
                products={data.results}
                total_products={data.count}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default React.memo(Shop);
