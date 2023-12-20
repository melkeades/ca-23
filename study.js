import gsap from 'gsap'

export const xqwe = () => {
  console.log('xxxx')
}
export const qwe = () => {
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

  function sliderWithImage() {
    const sliderContainer = document.querySelector('.slider__container.is--portfolio')
    const sliderWrapper = document.querySelector('.slider__with-image-wrapper')
    const slides = gsap.utils.toArray('.slider__with-image-item')
    const nextBtn = document.querySelector('#nextBtnImageSlider')
    const previousBtn = document.querySelector('#previousBtnImageSlider')
    const sliderImage = document.querySelector('.slider__image-wrapper')
    const slideWidth = slides[0].offsetWidth

    const computedStyle = window.getComputedStyle(slides[0])
    const marginRight = parseInt(computedStyle.marginRight, 10)
    const totalWidthOfSlides = slideWidth + marginRight
    sliderWrapper.style.flexDirection = 'row'
    const sliderWrapperWidth = totalWidthOfSlides * slides.length
    sliderWrapper.style.width = sliderWrapperWidth + 'px'
    const numSlides = slides.length
    const lastSlide = numSlides - 1
    let slideIndex = 0

    updateButtonStates()
    addImages()
    updateImage()
    function addImages() {
      // Clear the existing content in sliderImage
      sliderImage.innerHTML = ''

      // Loop through each slide and add its images to sliderImage
      slides.forEach((slide, index) => {
        // Clone the images to avoid moving them from their original position
        const images = Array.from(slide.querySelectorAll('img')).map((img) => {
          const clonedImg = img.cloneNode(true)
          return clonedImg
        })

        // Append each image to sliderImage
        images.forEach((image) => {
          image.classList.add('slider__image')
          image.classList.remove('slider__image-hidden')
          sliderImage.appendChild(image)
        })
      })
    }

    function updateImage() {
      // Get all images within sliderImage
      const allImages = sliderImage.querySelectorAll('img')

      // Loop through all images and set opacity
      allImages.forEach((image, index) => {
        if (index === slideIndex) {
          // If it's the current image, set opacity to 1
          gsap.to(image, { opacity: 1 })
        } else {
          // If it's not the current image, set opacity to 0
          gsap.to(image, { opacity: 0 })
        }
      })
    }
    function goToSlide(index) {
      slideIndex = index
      gsap.to(sliderWrapper, { x: -slideIndex * totalWidthOfSlides })

      // Update button states based on current slide index
      updateButtonStates()
      // Update images based on current slide index
      updateImage()
    }

    function updateButtonStates() {
      // Disable/enable buttons based on current slide index
      if (slideIndex === 0) {
        previousBtn.classList.add('is--disabled')
        nextBtn.classList.remove('is--disabled')
      } else if (slideIndex === lastSlide) {
        previousBtn.classList.remove('is--disabled')
        nextBtn.classList.add('is--disabled')
      } else {
        previousBtn.classList.remove('is--disabled')
        nextBtn.classList.remove('is--disabled')
      }
    }

    nextBtn.addEventListener('pointerdown', function () {
      if (slideIndex < lastSlide) {
        slideIndex++
        gsap.to(sliderWrapper, { x: -slideIndex * totalWidthOfSlides })
        updateImage()
      }
      updateButtonStates()
    })

    previousBtn.addEventListener('pointerdown', function () {
      if (slideIndex > 0) {
        slideIndex--
        gsap.to(sliderWrapper, { x: -slideIndex * totalWidthOfSlides })
        updateImage()
      }
      updateButtonStates()
    })
  }

  if (document.readyState !== 'loading') {
    initCode()
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      initCode()
    })
  }
  function initCode() {
    console.log('loaded')

    let mm = gsap.matchMedia()
    deliverablesSlider()
    sliderWithImage()
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
  }
}
