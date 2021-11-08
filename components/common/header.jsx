import { useEffect } from "react";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";
import CustomLoader from "../../components/common/custom-loader";

import CartMenu from "~/components/common/partials/cart-menu";
import SearchBox from "~/components/common/partials/search-box";
import LoginModal from "~/components/features/modals/login-modal";
import { useQuery } from "react-query";
import { GET_NAV_ITEMS } from "~/api/queries";
import { headerBorderRemoveList, headerCategories } from "~/utils/data/menu";

export default function Header(props) {
  const router = useRouter();

  const { data, status } = useQuery(["nav-items", {}], GET_NAV_ITEMS);
  if (status === "loading") return <CustomLoader type="Grid" />;

  const showMobileMenu = () => {
    document.querySelector("body").classList.add("mmenu-active");
  };

  return (
    <header className="header header-border">
      <div className="header-top">
        <div className="container">
          <div className="header-right">
            <span className="divider"></span>
            <LoginModal auth={props.auth} user={props.user} />
          </div>
        </div>
      </div>

      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left">
            <ALink
              href="#"
              className="mobile-menu-toggle"
              onClick={showMobileMenu}
            >
              <i className="d-icon-bars2"></i>
            </ALink>

            <ALink href="/" className="logo">
              <img
                src="./images/home/vamalogo.png"
                alt="logo"
                width="250"
                height="71.8"
              />
            </ALink>
            <SearchBox />
          </div>

          <div className="header-right">
            <ALink href="tel:#" className="icon-box icon-box-side">
              <div className="icon-box-icon mr-0 mr-lg-2">
                <i className="d-icon-phone"></i>
              </div>
              <div className="icon-box-content d-lg-show">
                <h4 className="icon-box-title">Call Us Now:</h4>
                <p>0(800) 123-456</p>
              </div>
            </ALink>
            <span className="divider"></span>
            <ALink href="/pages/wishlist" className="wishlist">
              <i className="d-icon-heart"></i>
            </ALink>
            <span className="divider"></span>
            <CartMenu auth={props.auth} />
          </div>
        </div>
      </div>

      {router.pathname !== "/" ? (
        <div className="header-bottom d-lg-show">
          <div className="container">
            <div className="inner-wrap">
              <div className="header-left">
                <nav className="category-list">
                  <ul className="menu">
                    {data.results.map((nav) => (
                      <li
                        className={
                          (router.query.category_slug === nav.slug
                            ? "header-nav-active"
                            : "") + " header-nav"
                        }
                        key={`header-nav-${nav.slug}`}
                        style={{ width: "max-content" }}
                      >
                        <ALink href={"/pages/category/" + nav.slug}>
                          {nav.title}
                        </ALink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* <div className="header-right mr-0">
                <nav className="other-links">
                  <ul className="menu">
                    <li className="d-xl-show">
                      <ALink href="#">Daily deals</ALink>
                    </li>
                    <li>
                      <a
                        href="https://d-themes.com/buynow/riodereact"
                        target="_blank"
                        rel="noopener"
                      >
                        Buy Riode!
                      </a>
                    </li>
                  </ul>
                </nav>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
