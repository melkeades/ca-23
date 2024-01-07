import { addSwiperClasses, onDomReady, scrollTriggerInit } from './utils'
import './our-work.styl'
import Swiper from 'swiper'
import { Autoplay, Controller, EffectFade, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export default function OurWork() {
  onDomReady(function () {
    scrollTriggerInit('10vh', 'our-work-hero__img', 'our-work-hero', 'to', 'top')
    scrollTriggerInit('-20vh', 'our-work-hero__info-slider-wrap', 'our-work-hero', 'to', 'top')
    addSwiperClasses('our-work-hero__img-slider')
    addSwiperClasses('our-work-hero__info-slider')

    const ourWorkImgSwiper = new Swiper('.our-work-hero__img-slider', {
      modules: [Controller, EffectFade],
      // slidesPerView: 1,

      effect: 'fade',
      loop: true,
      fadeEffect: {
        // crossFade: true,
      },
    })

    const ourWorkInfoSwiper = new Swiper('.our-work-hero__info-slider', {
      modules: [Pagination, Controller, Autoplay, EffectFade, Navigation],
      loop: true, // either loop or snappy arrow click nav, not both
      // rewind: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      speed: 500,
      spaceBetween: 48,
      // autoplay: {
      //   delay: 4000,
      // },
      pagination: {
        clickable: true,
        bulletClass: 'bullet',
        bulletActiveClass: 'bullet--active-white',
        el: '.our-work-hero__dot-wrap',
      },
      navigation: {
        prevEl: '.our-work-hero__arrows .arrow--left',
        nextEl: '.our-work-hero__arrows .arrow:not(.arrow--left)',
      },
    })
    ourWorkInfoSwiper.controller.control = ourWorkImgSwiper
    ourWorkImgSwiper.controller.control = ourWorkInfoSwiper
  })
}
