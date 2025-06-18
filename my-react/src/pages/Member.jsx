import { useNavigate } from 'react-router-dom';

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
    <div>
        <h1>會員專區</h1>
        <p>歡迎來 {member?.full_name} 到會員專區！</p>

        <button onClick={handleCart}>你的購物車</button><br /><br />
        <button onClick={handleLogout}>登出</button>
    </div>
  )
}

export default Member;
