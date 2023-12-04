import './style.styl'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
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
    home()
    break
  case 'study':
    study()
    break
  case 'error':
    error()
    break
  default:
    console.log('unknown data-page')
}

const navbarTl = gsap.to(navbar$, {
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

devMode(0)
function home() {
  mq.add('(max-width: 991px)', () => {})
  mq.add('(max-width: 767px)', () => {})
}
function study() {
  console.log('study')
}

function contact() {}
