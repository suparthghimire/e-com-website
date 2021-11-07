import { BASE_URL, KHALTI_CREDS } from "../config";
import Cookie from "js-cookie";

export const GET_HOME_DATA_NEW = async ({ queryKey }) => {
  const response = await fetch(`${BASE_URL}/home/`);
  return response.json();
};
export const GET_ALL_PRODUCTS = async ({ queryKey }) => {
  const response = await fetch(`${BASE_URL}/product/`);
  return response.json();
};
export const GET_SINGLE_PRODUCT = async ({ queryKey }) => {
  const [_key, { slug }] = queryKey;
  const response = await fetch(`${BASE_URL}/product/${slug}/`);
  return response.json();
};
export const GET_SEARCH_PRODUCTS = async ({ queryKey }) => {
  const [_key, { title }] = queryKey;
  const response = await fetch(`${BASE_URL}/search?title=${title}`);
  return response.json();
};
export const GET_ALL_ORDERS = async ({ queryKey }) => {
  const [_key, { access }] = queryKey;
  const response = await fetch(`${BASE_URL}/order/?limit=100&offset=0`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.json();
};

export const GET_SINGLE_ORDER = async ({ queryKey }) => {
  const [_key, { id, access }] = queryKey;
  console.log(id, access);
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
  const [_key, { slug, min_price, max_price, color, size }] = queryKey;
  const url = `${BASE_URL}/category/${slug}/?min_price=${min_price}&max_price=${max_price}&color=${color}&size=${size}`;
  console.log(url);
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
    console.error(error);
    return [null, error];
  }
};
