import { addSplideClasses, connectSplideArrows, connectSplideBullets, onDomReady, scrollTriggerInit, sel } from './utils'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css'
import { Intersection } from '@splidejs/splide-extension-intersection'
export default function Service() {
  function ourWorkSliderInit() {
    const name = 'our-work'
    const ourWorkInfoSlider_ = name + '__info-slider'
    const ourWorkInfoSlider$ = sel('.' + ourWorkInfoSlider_)
    const ourWorkImgSlider_ = name + '__img-slider'
    const ourWorkImgSlider$ = sel('.' + ourWorkImgSlider_)
    addSplideClasses(name + '__info-slider')
    addSplideClasses(name + '__img-slider')
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
  onDomReady(() => {
    ourWorkSliderInit()
    scrollTriggerInit('30vh', 'service-hero__img-fg', 'service-hero', 'from')
  })
}
