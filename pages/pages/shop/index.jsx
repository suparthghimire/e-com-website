import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import ALink from "~/components/features/custom-link";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import { useQuery } from "react-query";
// import { GET_CATEGORY, GET_CATEGORY_INFINITE } from "../../api/queries";
import { GET_ALL_PRODUCTS_SHOP } from "../../../api/queries";
import ProductListOne from "../../../components/partials/shop/product-list/product-list-one";
import { useRouter } from "next/router";
import CustomLoader from "~/components/common/custom-loader";
import { TITLE } from "~/config";

function Shop() {
  const router = useRouter();
  const min_price = router.query.min_price || "";
  const max_price = router.query.max_price || "";
  const color = router.query.colors || "";
  const size = router.query.sizes || "";
  const page_size = router.query.page_size || "7";
  const brand = router.query.brand || "";
  const page = router.query.page || "1";
  const [pageNo, setPageNo] = useState(page);

  useEffect(() => {
    setPageNo(router.query.page || "1");
  }, [router.query.page, router.query]);

  const { products, loading, errors, hasMore } = GET_ALL_PRODUCTS_SHOP({
    min_price,
    max_price,
    size,
    color,
    page: pageNo,
    page_size,
    brand,
  });

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [price, setPrice] = useState(null);
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
        ...new Map(
          products.map((product) => [product.brand?.title, product])
        ).values(),
      ];
      setColors(all_colors);
      setSizes(all_sizes);
      setBrands(all_brands);
      setPrice({
        min_price: products.reduce(function (prev, curr) {
          return parseInt(prev.display_price) < parseInt(curr.display_price)
            ? prev
            : curr;
        }),
        max_price: products.reduce(function (prev, curr) {
          return parseInt(prev.display_price) > parseInt(curr.display_price)
            ? prev
            : curr;
        }),
      });
    }
  }, [products, pageNo]);

  // if (loading) return <CustomLoader type="Grid" />;
  return (
    <main className="main shop">
      <Helmet>
        <title>{TITLE} - Shop Page</title>
      </Helmet>

      <h1 className="d-none">Rameti - Shop</h1>

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
            <SidebarFilterOne
              type="banner"
              sizes={sizes}
              colors={colors}
              brands={brands}
              min_price={
                parseInt(price?.min_price?.display_price) -
                parseInt(price?.min_price?.display_price)
              }
              max_price={parseInt(price?.max_price?.display_price) + 200}
            />
            <div className="col-lg-9 main-content">
              {loading ? (
                <CustomLoader type="Oval" />
              ) : (
                <ProductListOne
                  type="banner"
                  slug=""
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

export default React.memo(Shop);
