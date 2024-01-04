import gsap from 'gsap'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import { Intersection } from '@splidejs/splide-extension-intersection'
import { sel, addSplideClasses, onDomReady, connectSplideArrows, connectSplideBullets, splideAutoWidth, scrollTriggerInit } from './utils'

// import ScrollTrigger from 'gsap/ScrollTrigger'
export default function home() {
  console.log('home')
  function ourWorkSliderInit() {
    const name = 'our-work'
    const ourWorkInfoSlider_ = name + '__info-slider'
    const ourWorkInfoSlider$ = sel('.' + ourWorkInfoSlider_)
    const ourWorkImgSlider_ = name + '__img-slider'
    const ourWorkImgSlider$ = sel('.' + ourWorkImgSlider_)
    onDomReady(() => {
      addSplideClasses(name + '__info-slider')
      addSplideClasses(name + '__img-slider')
    })
    // console.log(ourWorkInfoSlider_, ourWorkInfoSlider$)

    const ourWorkInfoSlider = new Splide(ourWorkInfoSlider$, {
      arrows: false,
      pagination: false,
      gap: '2rem',
      type: 'loop',
      perPage: 1,
      speed: 1500,
      interval: 5000,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      autoplay: 'pause',
      intersection: {
        inView: {
          autoplay: true,
        },
        outView: {
          autoplay: false,
        },
      },
      breakpoints: {
        747: {
          autoplay: false,
        },
      },
    })
    const ourWorkImgSlider = new Splide(ourWorkImgSlider$, {
      type: 'fade',
      rewind: true, // to make it "loop" with the type fade
      arrows: false,
      pagination: false,
      perPage: 1,
      speed: 1000,
    })
    ourWorkImgSlider.sync(ourWorkInfoSlider)
    ourWorkInfoSlider.mount({ Intersection })
    ourWorkImgSlider.mount()

    connectSplideArrows(ourWorkInfoSlider, name)
    connectSplideBullets(ourWorkInfoSlider, name)
  }

  function animateDots() {
    gsap.set('.dot', { opacity: 0 })
    const scrollDonwIndicator = document.querySelector('.dot__wrapper')
    const dots = gsap.utils.toArray('.dot__wrapper .dot')
    const dotTl = gsap.timeline({ repeat: -1 }) // Infinite repeat
    dotTl.to(dots, {
      opacity: 1,
      stagger: 0.05,
      duration: 0.2,
      ease: 'power2.inOut',
    })
    dotTl.to(dots, { opacity: 0, stagger: -0.05, duration: 0.2, ease: 'power2.inOut' }, '+=0.2')
  }

  function cardHover() {
    const cards = gsap.utils.toArray('.collection__item-blog')

    cards.forEach((card) => {
      let overlay = card.querySelector('.black__white-overlay')
      let badge = card.querySelector('.blog__tag-w')
      let title = card.querySelector('.blog__title')
      let badgeText = card.querySelector('.blog__tag-text')

      let cardTl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.5,
          ease: 'Power2.inOut', // Using Power2 easing for smoother transitions
        },
      })

      cardTl
        .fromTo(overlay, { opacity: 1 }, { opacity: 0.2 }, '<')
        .fromTo(badge, { backgroundColor: 'white' }, { backgroundColor: '#121216', duration: 0.5 }, '<')
        .fromTo(badgeText, { color: '#121216' }, { color: 'white', duration: 0.5 }, '<')
        .to(
          title,
          {
            textDecorationColor: '#0f9',
            ease: 'Power2.inOut',
          },
          '<'
        )

      card.addEventListener('mouseover', () => {
        cardTl.timeScale(1).play()
      })

      card.addEventListener('mouseout', () => {
        cardTl.timeScale(1).reverse()
      })
    })
  }

  function laptopImagePosition() {
    const laptopImg = document.querySelector('.whatwedo__image-w')
    const windowWidth = document.documentElement.clientWidth
    const greenCardWidth = document.querySelector('#greenCard').offsetWidth
    const imageWidth = windowWidth / 2 - greenCardWidth
    laptopImg.style.width = imageWidth + 'px'
  }

  function logosSliderInit() {
    const classPrefix = 'featured-logos'
    addSplideClasses(classPrefix + '__slider')
    const slider = new Splide(sel(`.${classPrefix}__slider`), {
      arrows: false,
      pagination: false,
      gap: '6rem',
      type: 'loop',
      autoWidth: true,
      autoScroll: { speed: 0.6, autoStart: false },
      breakpoints: {
        767: {
          gap: '2rem',
        },
      },
    })

    //
    splideAutoWidth(slider)
    slider.mount({ AutoScroll })
  }
  onDomReady(() => {
    logosSliderInit()
    ourWorkSliderInit()
    animateDots()
    laptopImagePosition()

    scrollTriggerInit(500, 'hero__img', 'home-hero')
    // cardHover()
  })
}
