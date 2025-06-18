import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const email = e.target.email.value;
    const full_name = e.target.full_name.value;

    if (password !== confirmPassword) {
      alert("密碼不一致，請重新輸入。");
      return;
    }

    async function addMember() {

      try {
      const res = await fetch('http://localhost:3000/api/members/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, full_name })
      });
      if (res.ok) {
        alert("註冊成功，請登入。");
        navigate('/login');
      }
      } catch (err) {
        console.error("註冊失敗:", err);
        alert("註冊失敗，請稍後再試。");
      }
    }
    addMember();
  }
  return (
    
    <div className={styles.login}>
    <div className={styles.logininput}>
        <h2>註冊</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className={styles.input}
                  placeholder="使用者名稱"  
                  />
              </div>
              <div>
                  <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className={styles.input}
                  placeholder="密碼"
                  />
              </div>
              <div>
                  <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className={styles.input}
                  placeholder="確認密碼"
                  />
              </div>
              <div>
                  <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  className={styles.input}
                  placeholder="電子信箱"  
                  />
              </div>
              <div>
                  <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  className={styles.input}
                  placeholder="全名"  
                  />
              </div>
              <div>
                  <button type="submit" className={styles.submit}>註冊</button>
              </div>
          </form>
    </div>
    <div className={styles.description}>
        <h3 className={styles.title}>Log in to Kai Shop.</h3>
        <h5>Log in to access more features.</h5>
        <ul>
            <li><i className="bi bi-check-circle-fill"></i><span>Personalized Dashboard</span></li>
            <li><i className="bi bi-check-circle-fill"></i><span>Faster Checkout</span></li>
            <li><i className="bi bi-check-circle-fill"></i><span>Exclusive Offers</span></li>
        </ul>
    </div>
</div>
  )
}

export default Register;

