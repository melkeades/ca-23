import { addSwiperClasses, onDomReady, scrollTriggerInit, sel } from './utils'
import './our-work.styl'
import Swiper from 'swiper'
import { Autoplay, Controller, EffectFade, Navigation, Pagination } from 'swiper/modules'
import gsap from 'gsap'

// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import 'swiper/css/effect-fade'

export default function OurWork() {
  onDomReady(function () {
    scrollTriggerInit('10vh', 'our-work-hero__img', 'our-work-hero', 'to', 'top')
    scrollTriggerInit('-10vh', 'our-work-hero__info-slider-wrap', 'our-work-hero', 'to', 'top')
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
      speed: 10,
      // spaceBetween: 48,
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

    ourWorkInfoSwiper.on('realIndexChange', (e) => {
      const prevSlide = sel('.our-work-hero__info-slider .swiper-slide-active')
      const nextSlide = e.wrapperEl.children.item(e.activeIndex)
      const prevImgSlide = ourWorkImgSwiper.wrapperEl.children.item(e.previousIndex)
      const nextImgSlide = ourWorkImgSwiper.wrapperEl.children.item(e.activeIndex)
      const right = e.activeIndex > e.previousIndex
      const tlIn = gsap.timeline({ defaults: { duration: 2, ease: 'power4.out' } }),
        tlOut = gsap.timeline({ defaults: { duration: 2, ease: 'power4.out' } })

      const prevH = prevSlide.querySelector('.hero__title')
      const prevP = prevSlide.querySelector('.our-work-hero__p')
      const prevBtn = prevSlide.querySelector('.btn-wrap')
      const prevImg = prevImgSlide.querySelector('.our-work-hero__img')
      const prevBg = prevImgSlide.querySelector('.our-work-hero__bg')
      const nextH = nextSlide.querySelector('.hero__title')
      const nextP = nextSlide.querySelector('.our-work-hero__p')
      const nextBtn = nextSlide.querySelector('.btn-wrap')
      const nextImg = nextImgSlide.querySelector('.our-work-hero__img')
      const nextBg = nextImgSlide.querySelector('.our-work-hero__bg')

      const hx = 50,
        px = 50,
        bx = 50,
        is = 0.1,
        ib = 4
      const ht = 0.0,
        pt = 0.1,
        bt = 0.2,
        it = 0.0,
        bgt = 0.0

      tlOut
        .to(prevH, { x: right ? -hx : hx, opacity: 0 }, ht)
        .to(prevP, { x: right ? -px : px, opacity: 0 }, pt)
        .to(prevBtn, { x: right ? -bx : bx, opacity: 0 }, bt)
        .to(prevBg, { opacity: 0 }, bgt)
        .to(prevImg, { scale: right ? 1 + is * 2 : 1, filter: `blur(${ib}px)`, opacity: 0 }, it)
      tlIn
        .fromTo(nextH, { x: right ? hx : -hx, opacity: 0 }, { x: 0, opacity: 1 }, ht)
        .fromTo(nextP, { x: right ? px : -px, opacity: 0 }, { x: 0, opacity: 1 }, pt)
        .fromTo(nextBtn, { x: right ? bx : -bx, opacity: 0 }, { x: 0, opacity: 1 }, bt)
        .fromTo(nextBg, { opacity: 0 }, { opacity: 1 }, bgt)
        .fromTo(nextImg, { scale: right ? 1 : 1 + is * 2, filter: `blur(${ib}px)`, opacity: 0 }, { scale: 1 + is, filter: `blur(0px)`, opacity: 1 }, it)
    })
  })
}
