import styles from './Nav.module.css';
import { Link } from 'react-router-dom';

function Nav({member}) {

  return (
    <nav  className={styles.nav}>
        <div className="container d-flex justify-content-evenly">
          <Link to="/" className={styles.li}>首頁</Link>
          <Link to="/men" className={styles.li}>男裝</Link>
          <Link to="/women" className={styles.li}>女裝</Link> 
          <Link to="/child" className={styles.li}>童裝</Link>
          <Link to="/about" className={styles.li}>關於我們</Link>
          {member ? (
          <Link to="/member" className={styles.li}>會員：{member.full_name}</Link>
          ) : (
          <Link to="/login" className={styles.li}>會員登入</Link>
          )}
        </div>
    </nav>
  );
}

export default Nav;
