import styles from './Footer.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Footer() {
  return (
    <footer className={styles.footer + ' container-fluid'}>
      <div className="row align-items-center">
        <div className={styles.footer_left + ' col-12 col-md-6'}>
          <ul>
            <li className={styles.title}>關於KAI</li>
            <li><a href="#">品牌故事</a></li>
            <li><a href="#">門市據點</a></li>
          </ul>
          <ul>
            <li className={styles.title}>購物須知</li>
            <li><a href="#">訂購流程</a></li>
            <li><a href="#">十天鑑賞期</a></li>
          </ul>
          <ul>
            <li className={styles.title}>聲明條款</li>
            <li><a href="#">隱私權保護</a></li>
            <li><a href="#">工作條款</a></li>
          </ul>
        </div>

        <div className="col-12 col-md-6 text-center">
          <p>follow us on</p>
          <a href="#" className={styles.icon}><i className='bi bi-facebook'></i></a>
          <a href="#" className={styles.icon}><i className='bi bi-instagram'></i></a>
          <a href="#" className={styles.icon}><i className='bi bi-line'></i></a>
        </div>
      </div>

      <div className={styles.buttom}>
        <p>Copyright &copy; 2025 KAI. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;
