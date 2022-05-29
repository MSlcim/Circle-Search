import React from 'react'
import Slider from 'react-slick';
import imgA from './bannerImg/60545.png'
import imgB from './bannerImg/89772.png'
import imgC from './bannerImg/92407.png'
import imgD from './bannerImg/92411.png'
import imgE from './bannerImg/92537.png'

function MainBanner() {
    const settings = {
        autoplay: true,
        autoplaySpeed : 7000,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <div>
        <Slider {...settings}>
          <div>
            <img src={imgA} alt="imgA" width='100%'/>
          </div>
          <div>
            <img src={imgB} alt="imgB" width='100%'/>
          </div>
          <div>
            <img src={imgC} alt="imgC" width='100%'/>
          </div>
          <div>
            <img src={imgD} alt="imgD" width='100%'/>
          </div>
          <div>
            <img src={imgE} alt="imgE" width='100%'/>
          </div>
        
        </Slider>
      </div>
  )
}

export default MainBanner