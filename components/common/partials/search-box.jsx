import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/react-hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import ALink from "~/components/features/custom-link";
// import { GET_PRODUCTS } from "~/server/queries";
// import withApollo from '~/server/apollo';

import { toDecimal } from "~/utils";
import { GET_ALL_PRODUCTS } from "~/api/queries";

function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState(null);
  const page = "1" || router.query.page;
  const page_size = "" || router.query.page;
  const { data, status } = useQuery(
    ["all_products", { page, page_size }],
    GET_ALL_PRODUCTS
  );
  const products = data?.results;
  const [filterProducts, setFilterProducts] = useState([]);
  // useEffect(() => {
  //   document.querySelector("body").addEventListener("click", onBodyClick);

  //   return () => {
  //     document.querySelector("body").removeEventListener("click", onBodyClick);
  //   };
  // }, []);

  // useEffect(() => {
  //   setSearch("");
  // }, [router.query.slug]);

  // useEffect(() => {
  //   if (search.length > 2) {
  //     if (timer) clearTimeout(timer);
  //     let timerId = setTimeout(() => {
  //       searchProducts({ variables: { search: search } });
  //       setTimer(null);
  //     }, 500);

  //     setTimer(timerId);
  //   }
  // }, [search]);

  // useEffect(() => {
  //   document.querySelector(".header-search.show-results") &&
  //     document
  //       .querySelector(".header-search.show-results")
  //       .classList.remove("show-results");
  // }, [router.pathname]);

  // function removeXSSAttacks(html) {
  //   const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  //   // Removing the <script> tags
  //   while (SCRIPT_REGEX.test(html)) {
  //     html = html.replace(SCRIPT_REGEX, "");
  //   }

  //   // Removing all events from tags...
  //   html = html.replace(/ on\w+="[^"]*"/g, "");

  //   return {
  //     __html: html,
  //   };
  // }

  // function matchEmphasize(name) {
  //   let regExp = new RegExp(search, "i");
  //   return name.replace(regExp, (match) => "<strong>" + match + "</strong>");
  // }

  function showSearchBox(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.closest(".header-search").classList.toggle("show");
  }

  // function onBodyClick(e) {
  //   if (e.target.closest(".header-search"))
  //     return (
  //       e.target.closest(".header-search").classList.contains("show-results") ||
  //       e.target.closest(".header-search").classList.add("show-results")
  //     );

  //   document.querySelector(".header-search.show") &&
  //     document.querySelector(".header-search.show").classList.remove("show");
  //   document.querySelector(".header-search.show-results") &&
  //     document
  //       .querySelector(".header-search.show-results")
  //       .classList.remove("show-results");
  // }

  function onSearchChange(e) {
    if (search === "") setFilterProducts([]);
    // document.querySelector(".live-search-list").style.display = "block";
    setSearch(e.target.value);
    const filteredProducts = products.filter((product) => {
      let title = product.title.split("");
      const contains = search
        .split("")
        .some((letter) => title.includes(letter));
      return contains;
    });
    setFilterProducts(filteredProducts);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    // setSearch("");
    router.push(`/pages/search/?title=${search}`);
    // router.push({
    //   pathname: `/category/search/?title=${search}`,
    //   query: {
    //     search: search,
    //   },
    // });
  }

  return (
    <div className="header-search hs-simple">
      <form
        action="#"
        method="get"
        onSubmit={onSubmitSearchForm}
        className="input-wrapper"
      >
        <input
          type="text"
          className="form-control"
          name="search"
          autoComplete="off"
          value={search}
          onChange={onSearchChange}
          placeholder="Search..."
          required
          onClick={showSearchBox}
        />

        <button className="btn btn-search" type="submit">
          <i className="d-icon-search"></i>
        </button>

        {/* TODO: ADD BASE URL TO IMAGES */}
        {/* <div className="live-search-list scrollable bg-white">
          {filterProducts.length > 0
            ? filterProducts.map((product, index) => (
                <ALink
                  href={`/product/default/${product.slug}`}
                  className="autocomplete-suggestion"
                  key={`search-result-${index}`}
                >
                  <LazyLoadImage
                    src={product.product_image[0].url}
                    width={40}
                    height={40}
                    alt="product"
                  />
                  <div className="search-name">{product.title}</div>
                  <span className="search-price">
                    <span className="new-price mr-1">
                      Npr. {toDecimal(product.display_price)} /-
                    </span>
                  </span>
                </ALink>
              ))
            : ""}
        </div> */}
      </form>
    </div>
  );
}

// export default withApollo({ ssr: typeof window === "undefined" })(SearchForm);
export default SearchForm;
