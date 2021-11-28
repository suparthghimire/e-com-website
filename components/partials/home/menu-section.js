import { LazyLoadImage } from "react-lazy-load-image-component";
import ALink from "~/components/features/custom-link";
import SubCategoryHome from "~/components/features/category/sub-category-home";
export default function Menu(props) {
  console.log(props);
  return (
    <div className="grid-item height-x2 category-list d-lg-block d-none w-1">
      <ul className="menu menu-options vertical-menu bg-light home-page-menu">
        <li>
          <ALink href="#" className="menu-title menu-li">
            Browse Our Categories
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
                  className="menu-li"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-black" style={{ fontWeight: "600" }}>
                      {item.title}
                    </span>
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
        <li>
          <ALink href="#" className="menu-title menu-li">
            Browse Products by
          </ALink>
        </li>
        <li className="submenu">
          <ALink
            href="#"
            className="menu-li text-black"
            style={{ fontWeight: "600" }}
          >
            Brands
          </ALink>
        </li>
        <li className="submenu">
          <ALink
            href="#"
            className="menu-li text-black"
            style={{ fontWeight: "600" }}
          >
            New Arrivals
          </ALink>
        </li>
        <li className="submenu">
          <ALink href="#" className=" text-black" style={{ fontWeight: "600" }}>
            Featured Products
          </ALink>
        </li>
      </ul>
    </div>
  );
}
