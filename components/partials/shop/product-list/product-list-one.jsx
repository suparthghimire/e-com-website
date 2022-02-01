import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import CustomLoader from "~/components/common/custom-loader";

import ToolBox from "~/components/partials/shop/toolbox";
import ProductThree from "~/components/features/product/product-three";

function ProductListOne(props) {
  const {
    itemsPerRow = 3,
    type = "left",
    isToolbox = true,
    products,
    total_products,
    setPageNo,
    pageNo,
    loading,
    errors,
    hasMore,
  } = props;
  const router = useRouter();
  const query = router.query;
  const gridClasses = {
    3: "cols-2 cols-sm-3",
    4: "cols-2 cols-sm-3 cols-md-4",
    5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
    6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
    7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
    8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8",
  };
  const perPage = query.per_page ? parseInt(query.per_page) : 12;
  const gridType = query.type ? query.type : "grid";
  const observer = useRef();
  const lastProductRef = useCallback(
    (el) => {
      if (loading) return "";
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNo((prevPageNo) => parseInt(prevPageNo) + 1);
        }
      });
      if (el) observer.current.observe(el);
    },
    [loading, hasMore]
  );
  return (
    <>
      {/* {<ToolBox type={type} />} */}
      {/* {gridType === "grid" ? (
        <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <div
              className="product-loading-overlay"
              key={"popup-skel-" + item}
            ></div>
          ))}
        </div>
      ) : (
        <div className="row product-wrapper skeleton-body cols-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <div
              className="skel-pro skel-pro-list mb-4"
              key={"list-skel-" + item}
            ></div>
          ))}
        </div>
      )} */}
      {products && products.length > 0 ? (
        <>
          <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
            {products &&
              products.map((item, index) => {
                if (index + 1 === total_products) {
                  return (
                    <div
                      className="product-wrap"
                      id="last-one"
                      ref={lastProductRef}
                      key={"shop-" + item.slug + index}
                    >
                      <ProductThree product={item} isCat={false} />
                    </div>
                  );
                }
                return (
                  <div className="product-wrap" key={"shop-" + item.slug}>
                    <ProductThree product={item} isCat={false} />
                  </div>
                );
              })}
          </div>
          {/* <div className="toolbox toolbox-pagination">
            <p className="show-info">
              Showing
              <span>
                {perPage * (page - 1) + 1} -{" "}
                {Math.min(perPage * pageNo, products.length)} of{" "}
                {total_products}
              </span>
              Products
            </p>

            <Pagination totalPage={total_products} />
          </div> */}
        </>
      ) : (
        <p className="ml-1">No products were found matching your selection.</p>
      )}
    </>
  );
}

// export default withApollo({ ssr: typeof window === "undefined" })(
//   ProductListOne
// );
export default ProductListOne;
