import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import ALink from "~/components/features/custom-link";
import Card from "~/components/features/accordion/card";
import { GET_NAV_ITEMS } from "~/api/queries";
import { mainMenu } from "~/utils/data/menu";
import CustomLoader from "~/components/common/custom-loader";
import SubCategoryMobile from "~/components/features/category/sub-category-mobile";

function MobileMenu(props) {
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState(null);
  const router = useRouter();
  const { data, status } = useQuery(["nav-items", {}], GET_NAV_ITEMS);
  useEffect(() => {
    window.addEventListener("resize", hideMobileMenuHandler);
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      window.removeEventListener("resize", hideMobileMenuHandler);
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch("");
  }, [router.query.slug]);

  const hideMobileMenuHandler = () => {
    if (window.innerWidth > 991) {
      document.querySelector("body").classList.remove("mmenu-active");
    }
  };

  const hideMobileMenu = () => {
    document.querySelector("body").classList.remove("mmenu-active");
  };

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    setSearch("");
    router.push(`/pages/search/?title=${search}`);
  }

  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-overlay" onClick={hideMobileMenu}></div>

      <ALink className="mobile-menu-close" href="#" onClick={hideMobileMenu}>
        <i className="d-icon-times"></i>
      </ALink>

      <div className="mobile-menu-container scrollable">
        <form
          action="#"
          className="input-wrapper"
          onSubmit={onSubmitSearchForm}
        >
          <input
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            value={search}
            onChange={onSearchChange}
            placeholder="Search your keyword..."
            required
          />
          <button className="btn btn-search" type="submit">
            <i className="d-icon-search"></i>
          </button>
        </form>

        <ul className="mobile-menu menu flex-column">
          <li>
            <ALink href="/">Home</ALink>
          </li>
          {status === "loading" ? (
            <CustomLoader type="Grid" />
          ) : (
            data.results.map((item, index) => {
              return (
                <li key={index}>
                  <ALink href={"/pages/category/" + item.slug}>
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ gap: "5px" }}
                    >
                      {item.title}
                      {item.sub_category && item.sub_category.length > 0 && (
                        <i className="fas fa-angle-down"></i>
                      )}
                    </div>
                  </ALink>
                  {item.sub_category && item.sub_category.length > 0 ? (
                    <SubCategoryMobile
                      category={item.sub_category}
                      title={item.title}
                    />
                  ) : (
                    ""
                  )}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(MobileMenu);
