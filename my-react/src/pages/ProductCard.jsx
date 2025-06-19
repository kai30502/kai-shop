import styles from './Product.module.css';

function ProductCard({ product }) {

  const member = JSON.parse(localStorage.getItem('member'));

  async function addToCart(productId, quantity = 1) {
  if (!member){
    alert("請先登入會員才能加入購物車");
    return null;
  }

  await fetch('http://localhost:3000/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      member_id: member.id,
      product_id: productId,
      quantity: quantity
      })
    }
  );
  alert("商品已加入購物車")
  
}


  return (
    <div className={styles.product_card + ' col-6 col-md-3'}>
      <img src={product.image_url} alt={product.description} />
      <p>{product.name}</p>
      <p>NT：${product.price}</p>
      <button className={styles.addToCartButton} onClick={() => addToCart(product.product_id, 1)}>加入購物車</button>
    </div>
  );
}

export default ProductCard;