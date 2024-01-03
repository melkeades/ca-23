import './style.styl'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

import Home from './home'
import About from './about'
import Blog from './blog'
import Study from './study'
import Test from './test'
import BlogPost from './blog-post'
import { onDomReady, scrollTriggerInit, sel, vh } from './utils'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

const navbarSticky$ = sel('.navbar-sticky .navbar')

const navbarTl = gsap.to(navbarSticky$, {
  keyframes: { '0%': { opacity: 0 }, '30%': { opacity: 1 }, '100%': { opacity: 1 } },
  yPercent: 100,
  ease: 'linear',
  paused: true,
})
ScrollTrigger.create({
  trigger: 'body',
  start: vh(100) + ' top',
  onToggle({ direction, getVelocity }) {
    // to reverse the easing
    gsap.to(navbarTl, { duration: 1.5, progress: direction === 1 ? 1 : 0, ease: 'expo.out' })
  },
})
onDomReady(() => {
  scrollTriggerInit(160, 'contact__ape-1', 'contact__bg-wrap')
  scrollTriggerInit(120, 'contact__ape-2', 'contact__bg-wrap')
  scrollTriggerInit(300, 'contact__mountain-2', 'contact__bg-wrap')
  scrollTriggerInit(200, 'contact__tree-1', 'contact__bg-wrap')
  scrollTriggerInit(140, 'contact__tree-2', 'contact__bg-wrap')
  scrollTriggerInit(100, 'contact__tree-3', 'contact__bg-wrap')
  scrollTriggerInit(-100, 'contact__cont', 'contact__bg-wrap')
})

switch (sel('.page-wrapper').getAttribute('data-page')) {
  case 'home':
    Home()
    break
  case 'our-work':
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
  case 'test':
    Test()
    break
  case 'error':
    error()
    break
  default:
    console.log('unknown data-page')
}
