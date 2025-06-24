import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

function Cart() {

    const getCartItems = async () => {
        const res = await fetch(`https://kai-shop.onrender.com/api/cart/items/${member.id}`);
        const data = await res.json();
        setCartItems(data);
    };

    const [cartItems, setCartItems] = useState([]);
    const member = JSON.parse(localStorage.getItem('member'));
    const navigate = useNavigate();

    if (!member) {
        alert("請先登入會員才能查看購物車");
        return;
    }

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 0) {
            alert("數量不能小於0");
            return;
        }

        const res = await fetch(`https://kai-shop.onrender.com/api/cart/update/${member.id}/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: quantity,
                member_id: member.id,
                product_id: productId
            }),
        });

        if (res.ok) {
            getCartItems();
        } else {
            alert("更新失敗，請稍後再試");
        }
    }
    
    useEffect(() => {
        getCartItems();
    }, [member, navigate]);
    
  return (
    <div className="container">
        <h1 style={{color: 'gray'}}>您的購物車</h1>

        <table className="table table-striped">
            <thead>
                <tr>
                <th>#</th>
                <th>產品名稱</th>
                <th>價格</th>
                <th>數量</th>
                </tr>
            </thead>
            <tbody style={{verticalAlign: 'middle'}}>
                {cartItems.map((item, index) => (
                <tr key={item.product_id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                        <div className={`d-flex align-items-center justify-content-center ${styles.quantity}`}>
                            <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)} type="button" className={styles.minus_button}>−</button>
                            <div className={styles.quantity_input}>
                                {item.quantity}
                            </div>
                            <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)} type="button" className={styles.add_button}>+</button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="3" className="text-end">總計</td>
                    <td>
                        ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
                    </td>
                </tr>
            </tfoot>
        </table>

    </div>
  )
}

export default Cart;
