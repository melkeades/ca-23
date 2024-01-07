import { addSwiperClasses, onDomReady, scrollTriggerInit, sel, selAll } from './utils'
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
      // speed: 1000,
    })

    const ourWorkInfoSwiper = new Swiper('.our-work-hero__info-slider', {
      modules: [Pagination, Controller, Autoplay, EffectFade, Navigation],
      loop: true, // either loop or snappy arrow click nav, not both
      // rewind: true,
      effect: 'fade',
      speed: 1,
      // spaceBetween: 48,
      autoplay: {
        delay: 4000,
      },
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
    // sel('.our-work-hero .arrow--left').addEventListener('click', (e) => {
    //   ourWorkInfoSwiper.slidePrev()
    // })
    // sel('.our-work-hero .arrow:not(.arrow--left)').addEventListener('click', (e) => {
    //   ourWorkInfoSwiper.slideNext()
    // })

    ourWorkInfoSwiper.controller.control = ourWorkImgSwiper
    ourWorkImgSwiper.controller.control = ourWorkInfoSwiper

    const h$a = selAll('.hero__title:not(.swiper-slide-active .hero__title)')
    const p$a = selAll('.our-work-hero__p:not(.swiper-slide-active .our-work-hero__p)')
    const btn$a = selAll('.btn-wrap:not(.swiper-slide-active .btn-wrap)')
    const bg$a = selAll('.our-work-hero__bg:not(.swiper-slide-active .our-work-hero__bg)')
    const img$a = selAll('.our-work-hero__img:not(.swiper-slide-active .our-work-hero__img)')
    ;[h$a, p$a, btn$a, bg$a, img$a].forEach((els) => {
      els.forEach((el) => {
        gsap.set(el, { opacity: 0 })
        console.log('f')
      })
    })
    let lastInTl = {}
    ourWorkInfoSwiper.on('realIndexChange', (e) => {
      const prevSlide = sel('.our-work-hero__info-slider .swiper-slide-active')
      const nextSlide = e.wrapperEl.children.item(e.activeIndex)
      const prevImgSlide = ourWorkImgSwiper.wrapperEl.children.item(e.previousIndex)
      const nextImgSlide = ourWorkImgSwiper.wrapperEl.children.item(e.activeIndex)
      const right = e.activeIndex > e.previousIndex
      // gsap's overwrite is set to false by default!
      const tlIn = gsap.timeline({ defaults: { duration: 2, ease: 'power4.out', overwrite: 'auto' } }),
        tlOut = gsap.timeline({ defaults: { duration: 0.6, ease: 'power4.out', overwrite: 'auto' } })

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
        bx = 0,
        is = 0.1,
        ib = 4
      const ht = 0.0,
        pt = 0.1,
        bt = 0.1,
        it = 0.0,
        bgt = 0.0
      tlOut
        .to(prevH, { opacity: 0 }, ht)
        .to(prevP, { opacity: 0 }, pt)
        .to(prevBtn, { opacity: 0 }, bt)
        .to(prevBg, { opacity: 0, duration: 2 }, bgt)
        .to(prevImg, { scale: right ? 1 + is * 2 : 1, filter: `blur(${ib}px)`, opacity: 0, duration: 2 }, it)
      // .fromTo(prevSlide, { opacity: 1 }, { opacity: 0, duration: 2 }, 0)
      lastInTl = tlIn
        .fromTo(nextH, { x: right ? hx : -hx, opacity: 0 }, { x: 0, opacity: 1 }, ht)
        .fromTo(nextP, { x: right ? px : -px, opacity: 0 }, { x: 0, opacity: 1 }, pt)
        .fromTo(nextBtn, { x: right ? bx : -bx, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, bt)
        .fromTo(nextBg, { opacity: 0 }, { opacity: 1 }, bgt)
        .fromTo(nextImg, { scale: right ? 1 : 1 + is * 2, filter: `blur(${ib}px)`, opacity: 0 }, { scale: 1 + is, filter: `blur(0px)`, opacity: 1 }, it)
    })
  })
}
