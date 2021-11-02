import { BASE_URL } from "../config";
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
