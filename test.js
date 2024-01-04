import { addSplideClasses, connectSplideArrows, onDomReady, sel, selAll, scrollTriggerInit, debounce } from './utils'

import './blog-post.styl'
import Swiper from 'swiper'
import { Navigation, Pagination, Controller, EffectFade, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import gsap from 'gsap'

export default function Test() {
  scrollTriggerInit(160, 'contact__ape-1', 'contact__bg-wrap')
  scrollTriggerInit(120, 'contact__ape-2', 'contact__bg-wrap')
  scrollTriggerInit(300, 'contact__mountain-2', 'contact__bg-wrap')
  scrollTriggerInit(200, 'contact__tree-1', 'contact__bg-wrap')
  scrollTriggerInit(140, 'contact__tree-2', 'contact__bg-wrap')
  scrollTriggerInit(100, 'contact__tree-3', 'contact__bg-wrap')
  scrollTriggerInit(-100, 'contact__cont', 'contact__bg-wrap')
  const figureWithImg$ = selAll(
    '.w-richtext-figure-type-image:not(.w-richtext-align-floatleft):not(.w-richtext-align-floatright):not(.w-richtext-align-center):has(img)'
  )
  figureWithImg$.forEach((el) => {
    const img = el.querySelector('img')
    if (img.clientWidth > img.clientHeight) {
      el.style.maxWidth = 'none'
    }
  })

  function addSwiperClasses(slider) {
    const swiper = document.querySelector('.' + slider)
    const list = swiper.children[0]
    const slide = list.childNodes
    swiper.classList.add('swiper')
    list.classList.add('swiper-wrapper')
    slide.forEach((slide) => slide.classList.add('swiper-slide'))
  }
  addSwiperClasses('our-work__img-slider')
  addSwiperClasses('our-work__info-slider')
  const ar = sel('.our-work__info-col .arrow:not(.arrow--left)')
  // ar?.style.opacity = '0.5'
  // console.log(ar)
  const ourWorkSec$ = sel('.our-work-sec')
  const ourWorkImgSwiper = new Swiper('.our-work__img-slider', {
    modules: [Controller, EffectFade],
    effect: 'fade',
    loop: true,
  })
  const ourWorkInfoWrapper = sel('.our-work__info-slider>.swiper-wrapper')
  ourWorkInfoWrapper.style.setProperty('--swiper-wrapper-transition-timing-function', 'cubic-bezier(0.16, 1, 0.3, 1)')
  const ourWorkInfoSwiper = new Swiper('.our-work__info-slider', {
    modules: [Pagination, Controller, Autoplay],
    loop: true,
    // rewind: true,
    speed: 1500,
    spaceBetween: 48,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      clickable: true,
      bulletClass: 'bullet',
      bulletActiveClass: 'bullet--active',
      el: '.our-work__pagination',
    },
    // navigation: {
    //   prevEl: '.our-work__info-col .arrow--left',
    //   nextEl: '.our-work__info-col .arrow:not(.arrow--left)',
    // },
  })
  // ourWorkInfoSwiper.autoplay.pause()
  sel('.our-work__info-col .arrow--left').addEventListener('click', (e) => {
    // ourWorkInfoSwiper.setProgress(1, 0)
    // if (ourWorkInfoSwiper.animating) {
    //   console.log('press')
    //   // ourWorkInfoSwiper.slideReset(10)
    //   // ourWorkInfoSwiper.slideTo(ourWorkInfoSwiper.activeIndex - 1)
    //   // ourWorkInfoSwiper.slideToClosest(10)
    //   ourWorkInfoSwiper.slidePrev(10)
    //   // ourWorkInfoSwiper.setProgress(0)
    //   // ourWorkInfoSwiper.updateProgress()
    // } else {
    //   ourWorkInfoSwiper.slidePrev()
    // }
    // ourWorkInfoSwiper.updateProgress()
    ourWorkInfoSwiper.slidePrev()
  })
  sel('.our-work__info-col .arrow:not(.arrow--left)').addEventListener('click', (e) => {
    ourWorkInfoSwiper.slideNext()
  })
  ;[sel('.our-work__info-col'), sel('.our-work__img-col')].forEach((e) => {
    e.addEventListener('mouseenter', () => {
      ourWorkInfoSwiper.autoplay.stop()
    })
    e.addEventListener('mouseleave', () => {
      ourWorkInfoSwiper.autoplay.start()
    })
  })
  ourWorkInfoSwiper.controller.control = ourWorkImgSwiper
  ourWorkImgSwiper.controller.control = ourWorkInfoSwiper
  // ourWorkInfoSwiper.start()
  // ourWorkInfoSwiper.on('slideNextTransitionStart', (event) => {
  // ourWorkInfoSwiper.on('slideChange', (event) => {
  const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power4.out' } })
  // only realIndexChange works reliably with controlled/synced sliders

  // selAll('.our-work__info-slider .swiper-slide:not(.swiper-slide-active)').forEach((slide) => {
  //   const ss = slide.querySelectorAll('.subtitle')
  //   const sh = slide.querySelectorAll('.title')
  //   const sp = slide.querySelectorAll('.mainparagraph')
  //   // const sb1 = slide.querySelectorAll('.button-primary-filled')
  //   // const sb2 = slide.querySelectorAll('.button-primary-outline')
  //   const sb = slide.querySelectorAll('.our-work__btn-wrap')
  //   ;[ss, sh, sp, sb].forEach((els) => {
  //     els.forEach((el) => {
  //       gsap.set(el, { opacity: 0 })
  //     })
  //   })
  // })
  ourWorkInfoSwiper.on('realIndexChange', (e) => {
    const prev = sel('.our-work__info-col .swiper-slide-active')
    const next = e.wrapperEl.children.item(e.activeIndex)
    const right = e.activeIndex > e.previousIndex
    // console.log(right)
    const tlIn = gsap.timeline({ defaults: { duration: 1.5, ease: 'power4.out' } }),
      tlOut = gsap.timeline({ defaults: { duration: 1.5, ease: 'power4.out' } })
    const prevH = prev.querySelector('.title')

    const prevS = prev.querySelector('.subtitle')
    const prevP = prev.querySelector('.mainparagraph')
    const prevBtn1 = prev.querySelector('.button-primary-filled')
    const prevBtn2 = prev.querySelector('.button-primary-outline')
    const prevBtn = prev.querySelector('.our-work__btn-wrap')
    const nextH = next.querySelector('.title')
    const nextS = next.querySelector('.subtitle')
    const nextP = next.querySelector('.mainparagraph')
    const nextBtn1 = next.querySelector('.button-primary-filled')
    const nextBtn2 = next.querySelector('.button-primary-outline')
    const nextBtn = next.querySelector('.our-work__btn-wrap')
    const hx = 100,
      sx = 50,
      px = 100,
      bx = 100
    const ht = 0.1,
      st = 0.0,
      pt = 0.2,
      b1t = 0.0,
      b2t = 0.1,
      bt = 0.3
    // console.log(prevBtn1)

    tlOut
      .to(prevH, { x: right ? -hx : hx, opacity: 0 }, ht)
      .to(prevS, { x: right ? -sx : sx, opacity: 0 }, st)
      .to(prevP, { x: right ? -px : px, opacity: 0 }, pt)
      .to(prevBtn, { opacity: 0 }, 0)
    // .to(prevBtn1, { opacity: 0, duration: 0 }, 0)
    // .to(prevBtn2, { opacity: 0, duration: 0 }, 0)
    // .set([prevH, prevS, prevP], { x: 0 })

    // .to(
    //   {},
    //   {
    //     onComplete() {
    //       gsap.set(prevH, prevS, prevP, { x: 0 })
    //       // console.log(this)
    //     },
    //   }
    // )
    tlIn
      .fromTo(nextH, { x: right ? hx : -hx, opacity: 0 }, { x: 0, opacity: 1 }, ht)
      .fromTo(nextS, { x: right ? sx : -sx, opacity: 0 }, { x: 0, opacity: 1 }, st)
      .fromTo(nextP, { x: right ? px : -px, opacity: 0 }, { x: 0, opacity: 1 }, pt)
      .fromTo(nextBtn, { x: right ? bx : -bx, opacity: 0 }, { x: 0, opacity: 1 }, bt)

    // .fromTo(nextBtn1, { opacity: 0 }, { opacity: 1, duration: bd, ease: 'none' }, b1t)
    // .fromTo(nextBtn2, { opacity: 0 }, { opacity: 1, duration: bd, ease: 'none' }, b2t)
    // .set([nextH, nextS, nextP, nextBtn1, nextBtn2], { opacity: 0, x: 0 })
  })
}
// function onClassesReady(element, classList, callback) {
//   const observer = new MutationObserver(function (mutations) {
//     for (const mutation of mutations) {
//       if (mutation.attributeName === 'class') {
//         if (allClassesFoundAmongChildren(mutation.target, classList)) {
//           // if (element.matches(classNames.join('.')) || element.querySelector(classNames.join('.'))) {
//           observer.disconnect()
//           callback()
//         }
//       }
//     }
//   })
//   function allClassesFoundAmongChildren(element, classList) {
//     return classList.every((className) => element.querySelector(`.${className}`))
//   }

//   observer.observe(element, { attributes: true, subtree: true })
// }

// const div = document.getElementById('myDiv')
// const classes = ['myClass1', 'myClass2']
// const callback = function () {
//   console.log('The element or its child has the classes!')
// }
console.log('test')
