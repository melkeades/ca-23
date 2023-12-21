import gsap from 'gsap'
import { onDomReady } from './_service'

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

  function changeDeliverablesText(slides) {
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

  onDomReady(() => {
    console.log('loaded')

    let mm = gsap.matchMedia()
    deliverablesSlider()
    // sliderWithImage()
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
