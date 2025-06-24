import { useNavigate } from 'react-router-dom';
import styles from './Member.module.css';

function Member({ setMember }) {

    const member = JSON.parse(localStorage.getItem('member'));
    const navigate = useNavigate();

    
    function handleLogout() {
      localStorage.removeItem('member');
      navigate('/login');
      setMember('');
    }

    function handleCart() {
      navigate('/cart');
    }

  return (
    <div className={`container ${styles.member}`}>
        <h1>會員專區</h1>
        <p>歡迎 {member?.full_name} 來到會員專區！</p>

        <button onClick={handleCart} className={`btn btn-outline-primary ${styles.cartBtn}`}>你的購物車</button><br /><br />
        <button onClick={handleLogout} className={`btn btn-outline-primary ${styles.cartBtn}`}>登出</button>
    </div>
  )
}

export default Member;
