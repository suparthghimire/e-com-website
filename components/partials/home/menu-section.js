import { LazyLoadImage } from "react-lazy-load-image-component";
import ALink from "~/components/features/custom-link";

export default function Menu(props) {
  console.log(props);
  return (
    <div className="grid-item height-x2 category-list d-lg-block d-none w-1">
      <ul className="menu menu-options vertical-menu category-menu home-page-menu">
        <li>
          <ALink href="#" className="menu-title">
            Browse Our Categories
          </ALink>
        </li>
        {props.category.map((item, index) => {
          if (index < 8)
            return (
              <li key={index}>
                {/* If there are sub menu, add submenu class to li above */}
                <ALink href={"/pages/category/" + item.slug}>
                  {/* <i
                    className="d-icon-t-shirt1"
                    style={{
                      fontSize: "23px",
                      marginLeft: "-1px",
                      marginRight: "1rem",
                    }}
                  ></i> */}
                  {item.title}
                </ALink>
                {/* <div className="megamenu">
                  <div className="row">
                    <div className="col-lg-4">
                      <h4 className="menu-title">Women’s Clothing</h4>
                      <ul>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "bottoms" },
                            }}
                          >
                            Bottoms
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "dresses" },
                            }}
                          >
                            Dresses
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "outwear" },
                            }}
                          >
                            Outwear
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "sleepwear" },
                            }}
                          >
                            Sleepwear
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "swimwear" },
                            }}
                          >
                            Swimwear
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "tops" },
                            }}
                          >
                            Tops
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "two-piece-set" },
                            }}
                          >
                            Two-Piece Set
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "women-s-accessories" },
                            }}
                          >
                            Women's Accessories
                          </ALink>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <h4 className="menu-title">Men’s Clothing</h4>
                      <ul>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "bottoms" },
                            }}
                          >
                            Bottoms
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "men-s-accessories" },
                            }}
                          >
                            Men's Accessories
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "outdoors" },
                            }}
                          >
                            Outdoors
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "outwear" },
                            }}
                          >
                            Outwear
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "sleepwear" },
                            }}
                          >
                            Sleepwear
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "swimwear" },
                            }}
                          >
                            Swimwear
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "tops" },
                            }}
                          >
                            Tops
                          </ALink>
                        </li>
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "underwear" },
                            }}
                          >
                            Underwear
                          </ALink>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <div className="menu-banner menu-banner3 banner banner-fixed">
                        <figure>
                          <LazyLoadImage
                            effect="opacity"
                            src="./images/menu/banner-3.jpg"
                            alt="Banner"
                            width="280"
                            height="374"
                          />
                        </figure>
                        <div className="banner-content banner-date">
                          <h6 className=" text-white text-right font-weight-bold text-uppercase lh-1 mb-0">
                            20-22<sup>tm</sup>April
                          </h6>
                        </div>
                        <div className="banner-content x-50 w-100 text-center">
                          <h4 className="banner-subtitle bg-primary d-inline-block mb-1 text-white lh-1 ls-normal text-uppercase font-weight-semi-bold">
                            Ultimate Sale
                          </h4>
                          <h3 className="banner-title text-white text-uppercase font-weight-bold lh-1 ls-l mb-0">
                            Up To 70%
                          </h3>
                          <p className="text-white font-weight-normal ls-normal mb-2">
                            Discount Selected Items
                          </p>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: "" },
                            }}
                            className="btn btn-white btn-link btn-underline d-inline-block"
                          >
                            Shop Now<i className="d-icon-arrow-right"></i>
                          </ALink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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
