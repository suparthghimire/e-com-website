import { BASE_URL } from "../config";
export const GET_HOME_DATA_NEW = async ({ queryKey }) => {
  const response = await fetch(`${BASE_URL}/home/`);
  return response.json();
};
export const GET_SINGLE_PRODUCT = async ({ queryKey }) => {
  const [_key, { slug }] = queryKey;
  const response = await fetch(`${BASE_URL}/product/${slug}/`);
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
