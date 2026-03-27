const BASE_URL = "http://localhost:3000"; 

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  return res.json();
};