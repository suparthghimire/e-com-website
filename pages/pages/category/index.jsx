import BrandSection from "~/components/partials/home/brand-section";
import { useQuery } from "react-query";
import CustomLoader from "~/components/common/custom-loader";
import { GET_HOME_DATA_NEW, GET_NAV_ITEMS } from "~/api/queries";
import SingleCategory from "~/components/features/category/single-category";
import OwlCarousel from "~/components/features/owl-carousel";
import ALink from "~/components/features/custom-link";

export default function Category() {
  const categories = useQuery(["All Categories", {}], GET_HOME_DATA_NEW);
  const nav = useQuery(["Nav Items", {}], GET_NAV_ITEMS);
  if (categories.status === "loading" || nav.status === "loading")
    return <CustomLoader type="Grid" />;
  const category = categories.data?.results?.category_products;
  const brands = categories.data?.results.brand;
  // console.log(categories, '-----------------------------')
  return (
    <div className="container home mt-5">
      <div className="page-content">
        <h2 className="title title-simple">Categories</h2>
        <div className="category-list">
          {category.map((item, index) => {
            return (
              <ALink href={"/pages/category/" + item.slug}>
                <div className="row" key={"category" + index}>
                  <SingleCategory key={"category-" + index} category={item} />
                </div>
              </ALink>
            );
          })}
        </div>
        <BrandSection brands={brands} />
      </div>
    </div>
  );
}
