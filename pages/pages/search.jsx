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
import { useState, useEffect } from "react";
function Shop() {
  const router = useRouter();
  const title = router.query.title;
  const { data, status } = useQuery(
    ["search-products", { title }],
    GET_SEARCH_PRODUCTS
  );
  const products = data && data.results;
  // // filters
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      const all_sizes = [
        ...new Set(
          [].concat.apply(
            [],
            products.map((product) => product.available_sizes)
          )
        ),
      ];
      const all_colors = [
        ...new Set(
          [].concat.apply(
            [],
            products.map((item) => {
              if (item.product_image.length <= 0) return [];
              return item.product_image.map((image) => {
                let color = image.color;
                let upperCase =
                  color[0].toUpperCase() + color.slice(1, color.length);
                return upperCase;
              });
            })
          )
        ),
      ];
      const all_brands = [
        ...new Set(products.map((product) => product.brand.title)),
      ];
      setColors(all_colors);
      setSizes(all_sizes);
      setBrands(all_brands);
      console.log(all_brands);
    }
  }, [products]);
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
              <SidebarFilterOne
                type="banner"
                colors={colors}
                sizes={sizes}
                brands={brands}
              />
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
