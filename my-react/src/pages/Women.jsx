import styles from './Product.module.css';
import ProductCard from './ProductCard.jsx';
import { fetchProducts } from '../data/product_data.js';
import { useState , useEffect } from 'react';

function Women() {
  const [ products , setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchProducts('women');
      setProducts(data);
    }
    load();
  },[]);

  return (
    <div className='container'>
      <h1 className={styles.title}>女裝</h1>
      <div className={styles.product_area}>
          {products.map(product => (
            <ProductCard key={product.product_id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Women;
