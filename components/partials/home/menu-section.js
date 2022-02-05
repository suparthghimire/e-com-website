import { LazyLoadImage } from "react-lazy-load-image-component";
import ALink from "~/components/features/custom-link";
import SubCategoryHome from "~/components/features/category/sub-category-home";
import BrandHome from "~/components/features/brands/brands-home";

export default function Menu(props) {
  return (
    <div className="grid-item height-x2 category-list d-lg-block d-none w-1">
      <ul className="menu menu-options vertical-menu bg-light home-page-menu">
        <li>
          <ALink href="#" className="menu-title menu-li fw-600">
            Browse Products by
          </ALink>
        </li>

        <li className="submenu">
          <ALink href="#" className="menu-li text-black fw-normal">
            Brands
          </ALink>
          <BrandHome brand={props.brand} level={0} />
        </li>
        <li className="">
          <ALink href="pages/shop/" className="menu-li text-black fw-normal">
            New Arrivals
          </ALink>
        </li>
        <li className="">
          <ALink
            href="pages/shop/featured"
            className="menu-li text-black fw-normal"
          >
            Featured Products
          </ALink>
        </li>
        <li className="">
          <ALink
            href="pages/shop/trending"
            className="menu-li text-black fw-normal"
          >
            Trending Products
          </ALink>
        </li>
        {props.nav.map((item, index) => {
          if (index < 8)
            return (
              <li
                key={index}
                className={
                  item.sub_category && item.sub_category.length > 0 && "submenu"
                }
              >
                <ALink
                  href={"/pages/category/" + item.slug}
                  className="menu-li fw-normal"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-black">{item.title}</span>
                  </div>
                </ALink>
                {item.sub_category && item.sub_category.length > 0 ? (
                  <SubCategoryHome category={item.sub_category} level={0} />
                ) : (
                  ""
                )}
              </li>
            );
        })}
      </ul>
    </div>
  );
}
