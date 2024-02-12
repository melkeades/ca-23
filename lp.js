import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Splide from '@splidejs/splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

import '@splidejs/splide/css'
import { Intersection } from '@splidejs/splide-extension-intersection'
import { addSplideClasses, connectSplideArrows, connectSplideBullets, onDomReady, scrollTriggerInit, sel, selAll, splideAutoWidth } from './utils'
export default function lp() {
  console.log('lp')
  function heroSliderInit() {
    const classPrefix = 'daas-header'
    addSplideClasses(classPrefix + '__slider')
    const slider = new Splide(sel(`.${classPrefix}__slider`), {
      arrows: false,
      pagination: false,
      gap: '1.25rem',
      type: 'loop',
      autoWidth: true,
      autoScroll: { speed: 0.6, autoStart: false, pauseOnHover: false },
      breakpoints: {
        767: {
          gap: '1.25rem',
        },
      },
    })

    //
    splideAutoWidth(slider)
    slider.mount({ AutoScroll })
  }
  heroSliderInit()

  function testSliderInit() {
    const classPrefix = 'daas-testimonials'
    addSplideClasses(classPrefix + '__slider')
    const slider = new Splide(sel(`.${classPrefix}__slider`), {
      arrows: false,
      pagination: false,
      gap: '4rem',
      type: 'loop',
      //   autoWidth: true,
      perPage: 2,
      //   fixedWidth: '48rem',
      autoScroll: { speed: 0.6, autoStart: false },
      speed: 1500,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',

      breakpoints: {
        767: {
          gap: '1.25rem',
        },
      },
    })

    splideAutoWidth(slider)
    slider.mount({ AutoScroll })
    connectSplideArrows(slider, classPrefix)
  }
  testSliderInit()

  const timeLineItem$a = selAll('.timeline__tag:not(.is--tile')
  gsap.fromTo(
    [...timeLineItem$a],
    { clipPath: 'inset(0px 100% 0px 0px round 0 0.5rem 0.5rem 0)' },
    {
      clipPath: 'inset(0px 0% 0px 0px round 0 0.5rem 0.5rem 0)',
      duration: 2,
      ease: 'expo.out',
      stagger: { each: 0.2 },
      scrollTrigger: { trigger: '.timeline__list', start: 'top 75%' },
    }
  )

  const benefitItem$a = selAll('.benefits__item')
  gsap.from([...benefitItem$a], {
    y: 50,
    opacity: 0,
    duration: 2,
    ease: 'expo.out',
    stagger: { each: 0.1 },
    scrollTrigger: { trigger: '.benefits__list', start: 'top 60%' },
  })

  const serviceItem$a = selAll('.what-we-do__item')
  gsap.from([...serviceItem$a], {
    x: 20,
    opacity: 0,
    duration: 2,
    ease: 'expo.out',
    stagger: { each: 0.04 },
    scrollTrigger: { trigger: '.what-we-do__list', start: 'top 70%' },
  })

  let documentHeight = document.body.clientHeight
  new ResizeObserver((entries) => {
    const newHeight = entries[0].contentRect.height // only one item [0] - body
    if (newHeight !== documentHeight) {
      documentHeight = newHeight
      ScrollTrigger.refresh()
    }
  }).observe(document.body)
}
