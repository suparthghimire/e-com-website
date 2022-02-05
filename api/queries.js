import { BASE_URL, KHALTI_CREDS } from "../config";
import Cookie from "js-cookie";
import { http_validation } from "~/utils/helpers";
import { useState, useEffect } from "react";
export const GET_HOME_DATA_NEW = async ({ queryKey }) => {
  const response = await fetch(`${BASE_URL}/home/`);
  return response.json();
};

export const GET_ALL_PRODUCTS_SHOP = (data) => {
  const { min_price, max_price, color, size, page, page_size, brand } = data;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const url_params = new URLSearchParams({
    min_price,
    max_price,
    color,
    size,
    page,
    page_size,
    brand,
  });
  const url = `${BASE_URL}/product/?${url_params.toString()}`;
  useEffect(() => {
    setProducts([]);
  }, []);
  useEffect(() => {
    setProducts([]);
  }, [slug, min_price, max_price, color, size, page, page_size, brand]);
  useEffect(() => {
    setLoading(true);
    setErrors(false);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts((prevProducts) => {
          if (
            data.detail ||
            data.results === undefined ||
            (data.results && data.results.length <= 0)
          )
            return [];
          return [...prevProducts, ...data.results];
        });
        setHasMore(data.next ? true : false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErrors(error);
      });
  }, [min_price, max_price, color, size, page, page_size, brand]);
  return { products, loading, errors, hasMore };
};

export const GET_ALL_PRODUCTS = async ({ queryKey }) => {
  const [_key, { page, page_size }] = queryKey;
  const url_params = new URLSearchParams({
    page,
    page_size,
  });
  // const url = `${BASE_URL}/product/?page=${page}&page_size=${page_size}`;
  const url = `${BASE_URL}/product/?${url_params.toString()}`;
  const response = await fetch(url);
  return response.json();
};
export const GET_SINGLE_PRODUCT = async ({ queryKey }) => {
  const [_key, { slug }] = queryKey;
  const response = await fetch(`${BASE_URL}/product/${slug}/`);
  return response.json();
};
export const GET_SEARCH_PRODUCTS = async ({ queryKey }) => {
  const [_key, { title }] = queryKey;
  const url_params = new URLSearchParams({ title });
  // const url = `${BASE_URL}/search?title=${title}`;
  const url = `${BASE_URL}/search?${url_params.toString()}`;
  const response = await fetch(url);
  return response.json();
};
export const GET_ALL_ORDERS = async ({ queryKey }) => {
  const [_key, { access, offset, limit }] = queryKey;
  const url_params = new URLSearchParams({ offset, limit });
  // const url = `${BASE_URL}/order/?limit=${limit}&offset=${offset}`,
  const url = `${BASE_URL}/order/?${url_params.toString()}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.json();
};

export const GET_SINGLE_ORDER = async ({ queryKey }) => {
  const [_key, { id, access }] = queryKey;
  const response = await fetch(`${BASE_URL}/order/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.json();
};
export const GET_PAGE_DETAILS = async ({ queryKey }) => {
  const [_key, { slug, access }] = queryKey;
  const response = await fetch(`${BASE_URL}/page/${slug}/`);
  return response.json();
};

export const GET_NAV_ITEMS = async ({ queryKey }) => {
  const response = await fetch(`${BASE_URL}/nav/`);
  return response.json();
};
export const GET_ALL_BRANDS = async ({ queryKey }) => {
  const response = await fetch(`${BASE_URL}​/brand​/`);
  return response.json();
};
export const GET_CATEGORY = (data) => {
  const {
    slug,
    min_price,
    max_price,
    color,
    size = 20,
    page = 1,
    page_size = 20,
    brand,
  } = data;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [errors, setErrors] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const url_params = new URLSearchParams({
    min_price,
    max_price,
    color,
    size,
    page,
    page_size,
    brand,
  });
  const url = `${BASE_URL}/category/${slug}/?${url_params.toString()}`;
  useEffect(() => {
    setProducts([]);
  }, []);
  useEffect(() => {
    setProducts([]);
  }, [slug, min_price, max_price, color, size, brand]);
  useEffect(() => {
    setLoading(true);
    setErrors(false);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw", data);
        setCategory((prevCategory) => {
          if (data.detail) return {};
          return data.category;
        });
        setProducts((prevProducts) => {
          if (data.detail || (data.results && data.results.length <= 0))
            return [];
          return [...prevProducts, ...data.results];
        });
        setHasMore(data.next ? true : false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErrors(error);
      });
  }, [min_price, max_price, color, size, page, page_size, brand, slug]);

  return { products, category, loading, errors, hasMore };
};

export const GET_BRAND_PRODUCTS = (data) => {
  const { slug } = data;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState(null);
  const [errors, setErrors] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const url = `${BASE_URL}/brand/${slug}/product/`;
  useEffect(() => {
    setProducts([]);
    setLoading(true);
    setErrors(false);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBrand(data.brand);
        setProducts((prevProducts) => {
          if (data.detail || (data.results && data.results.length <= 0)) {
            return [];
          }
          return [...prevProducts, ...data.results];
        });
        setHasMore(data.next ? true : false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErrors(error);
      });
  }, [slug]);
  return { products, brand, loading, errors, hasMore };
};

export const POST_PROMO = async (promoCodeValue) => {
  try {
    const response = await fetch(`${BASE_URL}/promo/${promoCodeValue}/`);
    const data = await response.json();
    if (response.status === 404) {
      const error = new Error("Promo Code Not Found");
      error.status = response.status;
      throw error;
    } else if (response.status !== 200) {
      const error = new Error("Unexpected Error Occured");
      error.status = response.status;
      throw error;
    }
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const POST_ORDER = async (order_data) => {
  try {
    const response = await fetch(`${BASE_URL}/order/`, {
      headers: {
        Authorization: `Bearer ${Cookie.get("rameti_ec_access")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(order_data),
      method: "POST",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return [null, error];
  }
};

export const GET_ACCESS_TOKEN = async (refresh) => {
  try {
    const response = await fetch(`${BASE_URL}/token/refresh/`, {
      body: JSON.stringify({ refresh }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const tokens = await response.json();
    const validate_response = http_validation(response.status, tokens);
    if (validate_response.message === "error") throw validate_response.detail;
    Cookie.set("rameti_ec_access", tokens.access);
    Cookie.set("rameti_ec_refresh", tokens.refresh);
    return [tokens, null];
  } catch (error) {
    return [null, error];
  }
};

export const GET_USER = async (access, refresh) => {
  try {
    const response = await fetch(`${BASE_URL}/me/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    const user = await response.json();
    const validation_response = http_validation(response.status, user);
    if (validation_response.message === "error")
      throw validation_response.detail;
    return [user, null];
  } catch (error) {
    return [null, error];
  }
};

export const LOGIN = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/token`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const tokens = await response.json();
    const validate_response = http_validation(response.status, tokens);
    if (validate_response.message === "error") throw validate_response.detail;
    const time_in_seconds = 10;
    const expire_date = new Date(new Date().getTime() + 10 * 60 * 60 * 1000);
    Cookie.set("rameti_ec_access", tokens.access, { expires: expire_date });
    Cookie.set("rameti_ec_refresh", tokens.refresh);
    return [tokens, null];
  } catch (error) {
    return [null, error];
  }
};

export const REGISTER = async (user) => {
  try {
    user.wholesaler = false;
    const response = await fetch(`${BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const response_user = await response.json();
    const validation_response = http_validation(response.status, response_user);
    if (validation_response.message === "error")
      throw validation_response.detail;
    return [response_user, null];
  } catch (error) {
    return [null, error];
  }
};

export const GET_ALL_FEATURED_SHOP = (data) => {
  const { min_price, max_price, color, size, page, page_size, brand } = data;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const url_params = new URLSearchParams({
    min_price,
    max_price,
    color,
    size,
    page,
    page_size,
    brand,
  });
  const url = `${BASE_URL}/product/featured/?${url_params.toString()}`;
  useEffect(() => {
    setProducts([]);
  }, []);
  useEffect(() => {
    setProducts([]);
  }, [slug, min_price, max_price, color, size, brand]);
  useEffect(() => {
    setLoading(true);
    setErrors(false);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts((prevProducts) => {
          if (data.detail || (data.results && data.results.length <= 0))
            return [];
          return [...prevProducts, ...data.results];
        });
        setHasMore(data.next ? true : false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErrors(error);
      });
  }, [min_price, max_price, color, size, page, page_size, brand]);
  return { products, loading, errors, hasMore };
};

export const GET_ALL_TRENDING_SHOP = (data) => {
  const { min_price, max_price, color, size, page, page_size, brand } = data;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const url_params = new URLSearchParams({
    min_price,
    max_price,
    color,
    size,
    page,
    page_size,
    brand,
  });
  const url = `${BASE_URL}/product/trending/?${url_params.toString()}`;
  useEffect(() => {
    setProducts([]);
  }, []);
  useEffect(() => {
    setProducts([]);
  }, [slug, min_price, max_price, color, size, brand]);
  useEffect(() => {
    setLoading(true);
    setErrors(false);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts((prevProducts) => {
          if (data.detail || (data.results && data.results.length <= 0))
            return [];
          return [...prevProducts, ...data.results];
        });
        setHasMore(data.next ? true : false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErrors(error);
      });
  }, [min_price, max_price, color, size, page, page_size, brand]);
  return { products, loading, errors, hasMore };
};

export const GET_FILTER_SETTINGS = async ({ queryKey }) => {
  const response = await fetch(`${BASE_URL}/settings/`);
  return response.json();
};
