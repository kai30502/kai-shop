import styles from './Product.module.css';
import ProductCard from './ProductCard';
import { fetchProducts } from '../data/product_data.js'; 
import { useState , useEffect } from 'react';

function Child() {
  const [ products , setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchProducts('kids');
      setProducts(data);
    }
    load();
  },[]);

  return (
    <div>
      <h1 className={styles.title}>童裝</h1>
      <div className={styles.product_area}>
          {products.map(product => (
            <ProductCard key={product.product_id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Child;
