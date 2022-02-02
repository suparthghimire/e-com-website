import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { GET_ALL_PRODUCTS } from "~/api/queries";

import ALink from "~/components/features/custom-link";

function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const page = "1" || router.query.page;
  const page_size = "100000" || router.query.page;
  const [searchProducts, setSearchProducts] = useState([]);
  const { data, status } = useQuery(
    ["all_products", { page, page_size }],
    GET_ALL_PRODUCTS
  );
  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch("");
  }, [router.query.slug]);

  useEffect(() => {
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }, [router.pathname]);

  function removeXSSAttacks(html) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while (SCRIPT_REGEX.test(html)) {
      html = html.replace(SCRIPT_REGEX, "");
    }

    // Removing all events from tags...
    html = html.replace(/ on\w+="[^"]*"/g, "");

    return {
      __html: html,
    };
  }

  function matchEmphasize(name) {
    let regExp = new RegExp(search, "i");
    return name.replace(regExp, (match) => "<strong>" + match + "</strong>");
  }

  function onSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle("show");
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

  function onSearchChange(e) {
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      setSearchProducts([]);
      let products = data.results.filter((prdt) => {
        if (prdt.title.toLowerCase().includes(search.toLocaleLowerCase())) {
          return prdt;
        }
      });
      setSearchProducts(products);
    }
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/shop",
      query: {
        search: search,
      },
    });
  }

  return (
    <div className="header-search hs-simple">
      <a
        href="#"
        className="search-toggle"
        role="button"
        onClick={onSearchClick}
      >
        <i className="icon-search-3"></i>
      </a>
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
        />

        <button className="btn btn-search" type="submit">
          <i className="d-icon-search"></i>
        </button>

        <div className="live-search-list bg-white scrollable">
          {search.length > 2 &&
            data &&
            searchProducts.map((product, index) => (
              <ALink
                href={`/product/default/${product.slug}`}
                className="autocomplete-suggestion"
                key={`search-result-${index}`}
              >
                <LazyLoadImage
                  src={
                    product.product_image.length > 0
                      ? product.product_image[0].url
                      : "./images/placeholder/product_placeholder"
                  }
                  width={40}
                  height={40}
                  alt="product"
                />
                <div
                  className="search-name"
                  dangerouslySetInnerHTML={removeXSSAttacks(
                    matchEmphasize(product.title)
                  )}
                ></div>
                <span className="search-price">{product.display_price}</span>
              </ALink>
            ))}
        </div>
      </form>
    </div>
  );
}

// export default withApollo({ ssr: typeof window === "undefined" })(SearchForm);
export default SearchForm;
