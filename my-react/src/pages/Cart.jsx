import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const member = JSON.parse(localStorage.getItem('member'));
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!member) {
        alert("請先登入會員才能查看購物車");
        return;
        }
        
        async function getCartItems() {
        const res = await fetch(`http://localhost:3000/api/cart/items/${member.id}`);
        const data = await res.json();
        setCartItems(data);
        }
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
            <tbody>
                {cartItems.map((item, index) => (
                <tr key={item.product_id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    
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
