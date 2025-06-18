import styles from './Home.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdSlider from '../AdSlider';

function Home() {

  return (
    <div className='container text-center'>
      <div className={styles.ad}>
        <AdSlider />
      </div>
      <div>
        <div className="col-md-12">
          <a href="#"><img src="/home_1.jpg" alt="home_1" className="img-fluid" /></a>
        </div>
        <div className="col-md-12">
          <a href="#"><img src="/home_2.jpg" alt="home_2" className="img-fluid" /></a>
        </div>
        <div className="col-md-12">
          <a href="#"><img src="/home_3.jpg" alt="home_3" className="img-fluid" /></a>
        </div>
        <div className="col-md-12">
          <a href="#"><img src="/home_4.jpg" alt="home_4" className="img-fluid" /></a>
        </div>
        <div className={styles.followus}>
          <a href="#" className={styles.followus_icon}><i className='bi bi-facebook'></i></a>
          <a href="#" className={styles.followus_icon}><i className='bi bi-instagram'></i></a>
          <a href="#" className={styles.followus_icon}><i className='bi bi-line'></i></a>
        </div>
      </div>
    </div>
  )
}

export default Home;
