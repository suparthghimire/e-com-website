import { BASE_URL } from "../config";
export const GET_SINGLE_PRODUCT = async ({ queryKey }) => {
  const [_key, { slug }] = queryKey;
  console.log("slug", slug);
  const response = await fetch(`${BASE_URL}/product/${slug}/`);
  return response.json();
};
