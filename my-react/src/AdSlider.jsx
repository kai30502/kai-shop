import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function AdSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };

  return (
    <Slider {...settings}>
      <div><img src="/ad_1.jpg" alt="ad1" style={{margin : '0 auto'}}/></div>
      <div><img src="/ad_2.jpg" alt="ad2" style={{margin : '0 auto'}}/></div>
      <div><img src="/ad_3.jpg" alt="ad3" style={{margin : '0 auto'}}/></div>
    </Slider>
  );
}

export default AdSlider;