import { connect } from "react-redux";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";
import SubCategory from "../../components/features/category/sub-category";
import CartMenu from "~/components/common/partials/cart-menu";
import SearchBox from "~/components/common/partials/search-box";
import LoginModal from "~/components/features/modals/login-modal";
import { useQuery } from "react-query";
import { GET_NAV_ITEMS, GET_HOME_DATA_NEW } from "~/api/queries";

function Header(props) {
  const router = useRouter();

  const { data, status } = useQuery(["nav-items", {}], GET_NAV_ITEMS);
  const { data: homeData, status: homeDataStatus } = useQuery(
    ["home-data", {}],
    GET_HOME_DATA_NEW
  );
  if (status === "loading" || homeDataStatus === "loading") return "";
  const showMobileMenu = () => {
    document.querySelector("body").classList.add("mmenu-active");
  };

  return (
    <header className="header header-border">
      <div className="header-middle sticky-header fix-top sticky-content flex-column">
        <div className="container container-large">
          <div
            className="header-left"
            style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
          >
            <ALink
              href="#"
              className="mobile-menu-toggle"
              onClick={showMobileMenu}
            >
              <i className="d-icon-bars2"></i>
            </ALink>

            <ALink href="/" className="logo">
              <img
                src="./images/home/vamalogo_edit.png"
                alt="logo"
                width="100"
              />
              {/* height="71.8" */}
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
                <p>{homeData?.results?.company?.contact_one}</p>
              </div>
            </ALink>
            <span className="divider"></span>
            <div style={{ position: "relative" }}>
              <ALink href="/pages/wishlist" className="wishlist">
                <i className="d-icon-heart">
                  <span className="cart-count" style={inlineWishlistStyles}>
                    {/* <sup style={{ fontSize: '1.1rem', color: '#c54b8c' }}>{0}</sup> */}
                    {props.wishlist.length}
                  </span>
                </i>
              </ALink>
            </div>
            <span className="divider"></span>
            <CartMenu auth={props.auth} />
            <div className="d-flex align-items-center">
              <span className="divider"></span>
              <LoginModal auth={props.auth} user={props.user} />
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* {router.pathname !== "/" ? ( */}
        <div className="header-bottom sticky-header fix-top sticky-content d-lg-show">
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
                          <div
                            className="d-flex align-items-center"
                            style={{ gap: "5px" }}
                          >
                            {nav.title}
                            {nav.sub_category &&
                              nav.sub_category.length > 0 && (
                                <i className="fas fa-angle-down"></i>
                              )}
                          </div>
                        </ALink>

                        {nav.sub_category && nav.sub_category.length > 0 ? (
                          <SubCategory
                            category={nav.sub_category}
                            title={nav.title}
                            level={0}
                          />
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        ""
      )} */}
    </header>
  );
}

const inlineWishlistStyles = {
  position: "absolute",
  top: -2,
  right: 2,
  backgroundColor: "#c54b8c",
  color: "white",
  fontSize: "1.1rem",
  width: "1.9rem",
  height: "1.9rem",
  borderRadius: "50%",
  textAlign: "center",
  lineHeight: "1.9rem",
};

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data,
  };
}

export default connect(mapStateToProps)(Header);
