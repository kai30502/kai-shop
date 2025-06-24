import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import validator from 'validator';

function Register() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const passwordStrength = zxcvbn(password);
  const strengthLabel = passwordStrength.score === 0 ? '弱' : passwordStrength.score === 1 ? '中' : '強';
  
  const isEmailValid = validator.isEmail(email);


  function handleSubmit(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const full_name = e.target.full_name.value;

    if (password !== confirmPassword) {
      alert("密碼不一致，請重新輸入。");
      return;
    }

    if (passwordStrength.score < 2) {
      alert("密碼強度不足，請選擇更強的密碼。");
      return;
    }

    if (!isEmailValid) {
      alert("請輸入有效的電子郵件地址");
      return;
    }

    async function addMember() {

      try {
      const res = await fetch('https://kai-shop.onrender.com/api/members/add', {
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
    <div className='container'>
      <div className={styles.login + ' row'}>
        <div className={styles.logininput + ' order-2 order-md-1 col-12 col-md-6 d-flex flex-column justify-content-center'}>
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
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {password && (
              <div>
                <label>密碼強度: {strengthLabel}</label>
              </div>
            )}
            <div>
                <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className={styles.input}
                placeholder="確認密碼"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                type="text"
                id="email"
                name="email"
                required
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className={styles.register}>
                <p>已經有帳號？ <Link to="/Login">登入</Link></p>
            </div>
          </form>
        </div>

        <div className={styles.description + ' order-1 order-md-2 col-12 col-md-6'}>
          <h3 className={styles.title}>Log in to Kai Shop.</h3>
          <h5>Log in to access more features.</h5>
          <ul>
              <li><i className="bi bi-check-circle-fill"></i><span>Personalized Dashboard</span></li>
              <li><i className="bi bi-check-circle-fill"></i><span>Faster Checkout</span></li>
              <li><i className="bi bi-check-circle-fill"></i><span>Exclusive Offers</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Register;

