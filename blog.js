import { sel, onDomReady, addSplideClasses, connectSplideArrows } from './_service'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import { Intersection } from '@splidejs/splide-extension-intersection'
import gsap from 'gsap'
export default function blog() {
  console.log('blogg')

  function cardHover() {
    const cards = gsap.utils.toArray('.collection__item-blog')
    // console.log(cards)

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

  function sliderInit() {
    const classPrefix = 'blog-featured'
    addSplideClasses(classPrefix + '__slider')

    const slider = new Splide(sel(`.${classPrefix}__slider`), {
      arrows: false,
      pagination: false,
      gap: '8rem',
      type: 'loop',
      perPage: 2,
      perMove: 2,
      speed: 1500,
      interval: 5000,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      autoplay: 'true',
      intersection: {
        inView: {
          autoplay: true,
        },
        outView: {
          autoplay: false,
        },
      },
      breakpoints: {
        767: {
          autoplay: false,
          gap: '2rem',
        },
        478: {
          autoplay: false,
          perPage: 1,
          perMove: 1,
        },
      },
    })
    slider.mount()
    connectSplideArrows(slider, classPrefix)
  }

  onDomReady(() => {
    let mm = gsap.matchMedia()
    sliderInit()
    cardHover()
    mm.add(
      {
        isDesktop: '(min-width: 991px)',
      },
      (context) => {
        let { isDesktop } = context.conditions
        if (isDesktop) {
        }
        return () => {}
      }
    )
  })
}
