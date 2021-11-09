import { BASE_URL, KHALTI_CREDS } from "../config";
import Cookie from "js-cookie";

export const GET_HOME_DATA_NEW = async ({ queryKey }) => {
  const response = await fetch(`${BASE_URL}/home/`);
  return response.json();
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

export const GET_NAV_ITEMS = async ({ queryKey }) => {
  const response = await fetch(`${BASE_URL}/nav/`);
  return response.json();
};

export const GET_CATEGORY = async ({ queryKey }) => {
  const [_key, { slug, min_price, max_price, color, size, page, page_size }] =
    queryKey;
  const url_params = new URLSearchParams({
    min_price,
    max_price,
    color,
    size,
    page,
    page_size,
  });
  const url = `${BASE_URL}/category/${slug}/?${url_params.toString()}`;
  const response = await fetch(url);
  return response.json();
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
const get_access_token = async (refresh) => {
  try {
    const response = await fetch(`${BASE_URL}/refresh`, {
      body: JSON.stringify({ refresh }),
    });
    const access = await response.json();

    if (
      response.status == 401 ||
      (access && access.code && access.code == "token_not_valid")
    ) {
      const error = Error("Token Not Valid");
      error.status = response.status;
      error.data = access.detail;
      throw error;
    } else if (response.status !== 201) {
      const error = Error("Unexpected Error");
      error.status = response.status;
      error.data = "Unexpected Error Occured";
      throw error;
    }
    return [{ token: access.access }, null];
  } catch (error) {
    return [null, error];
  }
};
const fetch_user = async (access) => {
  try {
    const response = await fetch(`${BASE_URL}/me/`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const user = await response.json();
    if (response.code === 401) {
      const error = new Error("Token Not Valid");
      error.data = user.detail;
      error.status = response.status;
      throw error;
    } else if (response.code !== 201) {
      const error = new Error("Unexpected Error");
      error.data = "Unexpected Error Occured";
      error.status = response.status;
      throw error;
    }
    return [user, null];
  } catch (error) {
    return [null, error];
  }
};
export const AUTHENTICATE = async (access, refresh) => {
  try {
    let user = await fetch_user(access);
    if (user && user.code && user.code === "token_not_valid") {
      access = await get_access_token(refresh);
      if (access[1]) throw access[1];
      else {
        user = await fetch_user(access);
      }
    }
    if (user.code !== "token_not_valid") return [user, null];
  } catch (error) {
    return [null, error];
  }
};
