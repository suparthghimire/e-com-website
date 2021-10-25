import { LazyLoadImage } from "react-lazy-load-image-component";
import ALink from "~/components/features/custom-link";

export default function Menu() {
  return (
    <div className="grid-item height-x2 category-list d-lg-block d-none w-1">
      <ul className="menu menu-options vertical-menu category-menu">
        <li>
          <ALink href="#" className="menu-title">
            Browse Our Categories
          </ALink>
        </li>
        <li className="submenu">
          <ALink
            href={{
              pathname: "/shop",
              query: { category: "travel-and-clothing" },
            }}
          >
            <i
              className="d-icon-t-shirt1"
              style={{
                fontSize: "23px",
                marginLeft: "-1px",
                marginRight: "1rem",
              }}
            ></i>
            Travel &amp; Clothing
          </ALink>
          <div className="megamenu">
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
          </div>
        </li>
        <li className="submenu">
          <ALink
            href={{
              pathname: "/shop",
              query: { category: "computer-and-electronics" },
            }}
          >
            <i className="d-icon-camera1"></i>Electronics
          </ALink>
          <div className="megamenu">
            <div className="row">
              <div className="col-lg-4">
                <h4 className="menu-title">Computers</h4>
                <ul>
                  <li>
                    <ALink href="#">Riode</ALink>
                  </li>
                  <li>
                    <ALink href="#">Acer</ALink>
                  </li>
                  <li>
                    <ALink href="#">American Dreams</ALink>
                  </li>
                  <li>
                    <ALink href="#">Apple</ALink>
                  </li>
                  <li>
                    <ALink href="#">Arcade1UP</ALink>
                  </li>
                  <li>
                    <ALink href="#">Samsung</ALink>
                  </li>
                  <li>
                    <ALink href="#">HP</ALink>
                  </li>
                  <li>
                    <ALink href="#">Sonny</ALink>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4">
                <h4 className="menu-title">Tablets</h4>
                <ul>
                  <li>
                    <ALink href="#">Ipad</ALink>
                  </li>
                  <li>
                    <ALink href="#">Dell</ALink>
                  </li>
                  <li>
                    <ALink href="#">Lenovo</ALink>
                  </li>
                  <li>
                    <ALink href="#">Peach</ALink>
                  </li>
                  <li>
                    <ALink href="#">Macintosh</ALink>
                  </li>
                  <li>
                    <ALink href="#">5G</ALink>
                  </li>
                  <li>
                    <ALink href="#">Samsung</ALink>
                  </li>
                  <li>
                    <ALink href="#">Sonny</ALink>
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
                      href="/shop"
                      className="btn btn-white btn-link btn-underline d-inline-block"
                    >
                      Shop Now<i className="d-icon-arrow-right"></i>
                    </ALink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <ALink
            href={{
              pathname: "/shop",
              query: { category: "backpacks-and-fashion-bags" },
            }}
          >
            <i className="d-icon-officebag"></i>Backpacks &amp; Fashion bags
          </ALink>
        </li>
        <li>
          <ALink
            href={{
              pathname: "/shop",
              query: { category: "gaming-and-accessories" },
            }}
          >
            <i className="d-icon-gamepad1"></i>Gaming &amp; Accessories
          </ALink>
        </li>
        <li>
          <ALink
            href={{
              pathname: "/shop",
              query: { category: "sporting-goods" },
            }}
          >
            <i className="d-icon-basketball1"></i>Sporting Goods
          </ALink>
        </li>
        <li>
          <ALink
            href={{
              pathname: "/shop",
              query: { category: "computer" },
            }}
          >
            <i className="d-icon-desktop"></i>Computer
          </ALink>
        </li>
        <li>
          <ALink
            href={{
              pathname: "/shop",
              query: { category: "home-and-kitchen" },
            }}
          >
            <i className="d-icon-cook"></i>Home &amp; Kitchen
          </ALink>
        </li>
        <li>
          <ALink href="#" className="menu-title">
            Today Coupon Deals
          </ALink>
        </li>
        <li>
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
        </li>
      </ul>
    </div>
  );
}
