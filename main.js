import './style.styl'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

import Home from './home'
import OurWork from './our-work'
import About from './about'
import Blog from './blog'
import Study from './study'
// import Test from './test'
import Service from './service'
import BlogPost from './blog-post'
import LP from './lp'
import { debounce, mm, onDomReady, scrollTriggerInit, sel, vh } from './utils'

document.body.style.opacity = 0.4
gsap.registerPlugin(ScrollTrigger)
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// const navbarSticky$ = sel('.navbar-sticky .navbar')
// if (navbarSticky$) {
//   const navbarTl = gsap.to(navbarSticky$, {
//     keyframes: { '0%': { opacity: 0 }, '30%': { opacity: 1 }, '100%': { opacity: 1 } },
//     yPercent: 100,
//     ease: 'linear',
//     paused: true,
//   })
//   ScrollTrigger.create({
//     trigger: 'body',
//     start: vh(160) + ' top',
//     onToggle({ direction, getVelocity }) {
//       // to reverse the easing
//       gsap.to(navbarTl, { duration: 1.5, progress: direction === 1 ? 1 : 0, ease: 'expo.out' })
//     },
//   })
// }
// contact form parallax
if (sel('.contact-sec')) {
  // console.log('cont')

  // const scrollParams = [
  //   [160, 'contact__ape-1'],
  //   [120, 'contact__ape-2'],
  //   [300, 'contact__mountain-2'],
  //   [200, 'contact__tree-1'],
  //   [140, 'contact__tree-2'],
  //   [100, 'contact__tree-3'],
  //   [-100, 'contact__cont'],
  // ]
  const scrollParams = [
    ['5vh', 'contact__ape-1'],
    ['20vh', 'contact__ape-2'],
    ['60vh', 'contact__mountain-2'],
    ['40vh', 'contact__tree-1'],
    ['30vh', 'contact__tree-2'],
    ['30vh', 'contact__tree-3'],
    ['-20vh', 'contact__cont', '', ''],
  ]

  let scrollItems = []
  // window.addEventListener('load', () => {
  scrollParams.forEach((itemParam) => {
    const type = itemParam[3] || 'to'
    scrollItems.push(scrollTriggerInit(itemParam[0], itemParam[1], 'contact__bg-wrap', itemParam[3]))
  })
  // even after the load event body's height is being updated (lazy load?)
  let documentHeight = document.body.clientHeight
  new ResizeObserver((entries) => {
    // console.log('observer')

    const newHeight = entries[0].contentRect.height // only one item [0] - body
    if (newHeight !== documentHeight) {
      documentHeight = newHeight
      scrollItems.forEach((scrollItem) => {
        scrollItem.refresh()
        // console.log('upd')
      })
    }
  }).observe(document.body)
  // })
}
const dataPage = sel('.page-wrapper')?.getAttribute('data-page')
switch (dataPage) {
  case 'home':
    Home()
    break
  case 'our-work':
    OurWork()
    break
  case 'study':
    Study()
    break
  case 'blog':
    Blog()
    break
  case 'blog-post':
    BlogPost()
    break
  case 'about':
    About()
    break
  case 'services':
    // Services()
    break
  case 'service':
    Service()
    break
  case 'test':
    Test()
    break
  case 'lp':
    LP()
    break
  case 'error':
    error()
    break
  default:
    console.log('unknown data-page:', dataPage)
}
