import './style.styl'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

import Home from './home'
import Blog from './blog'
import Study from './study'
// import * as Services from './_services'

gsap.registerPlugin(ScrollTrigger)
const mq = gsap.matchMedia()
const mqd = 1440
const mqt = 991
const mql = 767
const mqm = 478

const sel = (e) => document.querySelector(e)
const selAll = (e) => document.querySelectorAll(e)
const vh = (percent) => window.innerHeight * (percent / 100)
const vw = (percent) => window.innerWidth * (percent / 100)

const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

switch (sel('.page-wrapper').getAttribute('data-page')) {
  case 'home':
    Home()
    break
  case 'study':
    Study()
    break
  case 'blog':
    Blog()
    break
  case 'error':
    error()
    break
  default:
    console.log('unknown data-page')
}

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

function home() {
  Home()
}
function study() {
  Study()
}
function blog() {
  Blog()
}
function contact() {}
