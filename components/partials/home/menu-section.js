import { LazyLoadImage } from "react-lazy-load-image-component";
import ALink from "~/components/features/custom-link";
import SubCategory from "~/components/features/category/sub-category";
export default function Menu(props) {
  console.log(props);
  return (
    <div className="grid-item height-x2 category-list d-lg-block d-none w-1">
      <ul className="menu menu-options vertical-menu category-menu home-page-menu">
        <li>
          <ALink href="#" className="menu-title menu-li">
            Browse Our Categories
          </ALink>
        </li>
        {props.nav.map((item, index) => {
          if (index < 8)
            return (
              <li key={index}>
                {/* If there are sub menu, add submenu class to li above */}
                <ALink
                  href={"/pages/category/" + item.slug}
                  className="menu-li"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-black">{item.title}</span>

                    {item.sub_category && item.sub_category.length > 0 && (
                      <i
                        class="fas fa-angle-right font-weight-bold"
                        style={{ fontSize: "1.25rem" }}
                      ></i>
                    )}
                  </div>
                </ALink>
                {item.sub_category && item.sub_category.length > 0 ? (
                  <div className="megamenu">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="menu-title">{item.title}</h4>
                        <ul
                          className="d-flex flex-row flex-wrap"
                          style={{ gap: "5rem" }}
                        >
                          {item.sub_category.map((sub_cat, index) => {
                            return (
                              <li key={index}>
                                <ALink href={"/pages/category/" + sub_cat.slug}>
                                  <div className="d-flex align-items-center">
                                    {sub_cat.title}
                                    <i
                                      className="fas fa-angle-right"
                                      style={{
                                        fontSize: "1.5rem",
                                        gap: "20px",
                                      }}
                                    ></i>
                                  </div>
                                </ALink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </li>
            );
        })}
        <li>
          <ALink href="#" className="menu-title">
            Promos Codes
          </ALink>
        </li>
        {props.promo.map((item) => {
          return (
            <li key={item.code} className="submenu">
              <ALink
                href={{
                  pathname: "/shop",
                  query: { category: "backpacks-and-fashion-bags" },
                }}
              >
                <i className="d-icon-card"></i>
                {item.offer}
              </ALink>
              <div className="megamenu">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="menu-banner menu-banner3 banner banner-fixed">
                      <figure>
                        <LazyLoadImage
                          effect="opacity"
                          src={item.feature_image}
                          alt="Banner"
                          width="280"
                          height="374"
                        />
                      </figure>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <h5>
                      {item.code} ({item.is_percent ? "" : "Nrs. "}
                      {item.amount}
                      {item.is_percent ? "%" : " /-"}&nbsp;off)
                    </h5>
                    <hr />
                    <p>
                      <span className="font-weight-bold">{item.offer}</span>
                      <br />
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        {/* <li>
          <ALink
            href={{
              pathname: "/shop",
              query: { category: "backpacks-and-fashion-bags" },
            }}
          >
            <i className="d-icon-card"></i>Backpacks &amp; Fashion bags
          </ALink>
        </li>
        <li>
          <ALink href="#">
            <i className="d-icon-card"></i>Daily Deals
          </ALink>
        </li> */}
      </ul>
    </div>
  );
}
