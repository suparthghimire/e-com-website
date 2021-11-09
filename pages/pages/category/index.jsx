import BrandSection from "~/components/partials/home/brand-section";
import { useQuery } from "react-query";
import CustomLoader from "~/components/common/custom-loader";
import { GET_HOME_DATA_NEW } from "~/api/queries";
import SingleCategory from "~/components/features/category/single-category";
import OwlCarousel from "~/components/features/owl-carousel";
import ALink from "~/components/features/custom-link";

export default function Category() {
  const { data, status } = useQuery(["All Categories", {}], GET_HOME_DATA_NEW);
  if (status === "loading") return <CustomLoader type="Grid" />;
  const category = data?.results?.category;
  const banner = data?.results?.banner;
  return (
    <>
      {/* caurosel */}
      <OwlCarousel adClass="owl-theme owl-nav-full">
        {banner.map((item, index) => {
          return (
            <figure
              className="banner-image-wrapper"
              key={"banner-" + index}
              autoplay={true}
            >
              <img src={item.feature_image} alt={item.title} />
            </figure>
          );
        })}
      </OwlCarousel>
      <div className="container home">
        <div className="page-content">
          <h2 className="title title-simple">Categories</h2>
          <div className="category-list">
            {category.map((item, index) => {
              return (
                <ALink href={"/pages/category/" + item.slug}>
                  <div className="row" key={"category" + index}>
                    <SingleCategory key={"categiry-" + index} category={item} />
                  </div>
                </ALink>
              );
            })}
          </div>
          <BrandSection />
        </div>
      </div>
    </>
  );
}
