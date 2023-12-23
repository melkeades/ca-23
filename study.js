import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css'
import { Intersection } from '@splidejs/splide-extension-intersection'
import { addSplideClasses, connectSplideArrows, connectSplideBullets, onDomReady, sel } from './utils'

export default function study() {
  console.log('study')

  function deliverablesSlider() {
    const sliderWrapper = document.querySelector('.deliverables__slider-wrapper')
    const sliderContainer = document.querySelector('.deliverables__slider-container')

    const slides = gsap.utils.toArray('.deliverables__slider-item')
    const nextBtn = document.querySelector('#nextBtn')
    const previousBtn = document.querySelector('#previousBtn')
    const slideWidth = slides[0].offsetWidth

    changeDeliverablesText(slides)
    // Get the left and right margin values
    const computedStyle = window.getComputedStyle(slides[0])
    const marginRight = parseInt(computedStyle.marginRight, 10)
    const totalWidthOfSlides = slideWidth + marginRight
    sliderContainer.style.flexDirection = 'row'
    const sliderContainerWidth = totalWidthOfSlides * slides.lenght
    sliderWrapper.style.width = sliderContainerWidth + 'px'
    const numSlides = slides.length
    let currentSlide = 0

    nextBtn.addEventListener('click', function () {
      if (currentSlide < numSlides - 1) {
        currentSlide++
        gsap.to(sliderContainer, { x: -currentSlide * totalWidthOfSlides })
      }

      // Disable the "next" button when reaching the last slide
      if (currentSlide === numSlides - 1) {
        nextBtn.classList.add('is--disabled')
      }

      // Enable the "previous" button
      previousBtn.classList.remove('is--disabled')
    })

    previousBtn.addEventListener('pointerdown', function () {
      if (currentSlide > 0) {
        currentSlide--
        gsap.to(sliderContainer, { x: -currentSlide * totalWidthOfSlides })
      }

      // Disable the "previous" button when reaching the first slide
      if (currentSlide === 0) {
        previousBtn.classList.add('is--disabled')
      }

      // Enable the "next" button
      nextBtn.classList.remove('is--disabled')
    })
  }

  function changeDeliverablesText() {
    const slides = gsap.utils.toArray('.deliverables__slider-item')

    slides.forEach((slide) => {
      const altText = slide.querySelector('img').alt
      let parts = altText.split(' - ')
      let galleryTitle = slide.querySelector('.deliverables__img_title')
      let galleryService = slide.querySelector('.deliverales__img_service')
      if (parts[0] && parts[0].trim() !== '') {
        galleryTitle.textContent = parts[0].trim()
      }
      if (parts[1] && parts[1].trim() !== '') {
        galleryService.textContent = parts[1].trim()
      }
    })
  }

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
  function heroStInit() {
    const bgSt$ = sel('.cs-hero__bg-st')
    const info$ = sel('.cs-hero__info')
    const bgStTl = gsap.timeline({ paused: true })
    bgStTl.to(bgSt$, { y: '60%' }, 0).to(info$, { y: -500, opacity: 0 }, 0)
    ScrollTrigger.create({
      animation: bgStTl,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    })
  }
  onDomReady(() => {
    heroStInit()
    ourWorkSliderInit()

    deliverablesSlider()
    changeDeliverablesText()
    // sliderWithImage()
    let mm = gsap.matchMedia()
    mm.add(
      {
        isDesktop: '(min-width: 991px)',
        isTablet: '(max-width: 990px) and (min-width: 478px)',
        isMobile: '(max-width: 477px)',
      },
      (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions

        if (isDesktop) {
        }
        if (isTablet) {
        }
        if (isMobile) {
        }

        return () => {}
      }
    )
  })
}
