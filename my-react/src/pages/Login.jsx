import styles from './Login.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login({ setMember }) {
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/members/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('member', JSON.stringify(data));
                setMember(data);
                navigate('/member');
            }  else {
                alert("登入失敗，請檢查您的電子信箱和密碼。");
            }
        } catch (err) {
            alert("伺服器錯誤，請稍後再試。");
            console.error("Login error:", err);
        }
    }

    

  return (
    <div className={styles.login}>
        <div className={styles.logininput}>
            <h2>登入</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    className={styles.input}
                    placeholder="電子信箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className={styles.submit}>登入</button>
                </div>
                <div className={styles.register}>
                    <p>還沒有帳號？ <Link to="/register">註冊</Link></p>
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

export default Login;
