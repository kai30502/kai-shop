export async function fetchProducts(category) {
  try {
    const res = await fetch(`http://localhost:3000/api/products?category=${category}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("載入商品失敗", err);
    return [];
  }
}
