import { sel, addSplideClasses, splideAutoWidth, onDomReady } from './_service'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import { Intersection } from '@splidejs/splide-extension-intersection'

export default function About() {
  function logosSliderInit() {
    const classPrefix = 'logos'
    addSplideClasses(classPrefix + '__slider')
    const slider = new Splide(sel(`.${classPrefix}__slider`), {
      arrows: false,
      pagination: false,
      gap: '4rem',
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
    sel('.collection__list_team_grid').classList.add('is--on')
  })

  //   document.addEventListener('DOMContentLoaded', function () {
  //     runningLogos()
  //   })
  //   function runningLogos() {
  //     const logoWrappers = gsap.utils.toArray('.partner__logo-w')
  //     const sliderSpeedInSec = 5
  //     const speeds = [0.4, 0.5, 1]
  //     logoWrappers.forEach((logoWrapper, i) => {
  //       logoItems = gsap.utils.toArray(logoWrappers[i].children)
  //       console.log(logoItems)
  //       const speed = speeds[i]
  //       const isEvenRow = i % 2 === 0
  //       horizontalLoop(logoItems, {
  //         paused: false,
  //         repeat: -1,
  //         speed: speed,
  //         paddingRight: 40,
  //         reversed: !isEvenRow,
  //       })
  //     })
  //   }
  //   function horizontalLoop(items, config) {
  //     items = gsap.utils.toArray(items)
  //     config = config || {}
  //     let tl = gsap.timeline({
  //         repeat: config.repeat,
  //         paused: config.paused,
  //         defaults: { ease: 'none' },
  //         onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  //       }),
  //       length = items.length,
  //       startX = items[0].offsetLeft,
  //       times = [],
  //       widths = [],
  //       xPercents = [],
  //       curIndex = 0,
  //       pixelsPerSecond = (config.speed || 1) * 100,
  //       snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
  //       totalWidth,
  //       curX,
  //       distanceToStart,
  //       distanceToLoop,
  //       item,
  //       i
  //     gsap.set(items, {
  //       // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
  //       xPercent: (i, el) => {
  //         let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')))
  //         xPercents[i] = snap((parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 + gsap.getProperty(el, 'xPercent'))
  //         return xPercents[i]
  //       },
  //     })
  //     gsap.set(items, { x: 0 })
  //     totalWidth =
  //       items[length - 1].offsetLeft +
  //       (xPercents[length - 1] / 100) * widths[length - 1] -
  //       startX +
  //       items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') +
  //       (parseFloat(config.paddingRight) || 0)
  //     for (i = 0; i < length; i++) {
  //       item = items[i]
  //       curX = (xPercents[i] / 100) * widths[i]
  //       distanceToStart = item.offsetLeft + curX - startX
  //       distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX')
  //       tl.to(
  //         item,
  //         {
  //           xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
  //           duration: distanceToLoop / pixelsPerSecond,
  //         },
  //         0
  //       )
  //         .fromTo(
  //           item,
  //           {
  //             xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
  //           },
  //           {
  //             xPercent: xPercents[i],
  //             duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
  //             immediateRender: false,
  //           },
  //           distanceToLoop / pixelsPerSecond
  //         )
  //         .add('label' + i, distanceToStart / pixelsPerSecond)
  //       times[i] = distanceToStart / pixelsPerSecond
  //     }
  //     function toIndex(index, vars) {
  //       vars = vars || {}
  //       Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length) // always go in the shortest direction
  //       let newIndex = gsap.utils.wrap(0, length, index),
  //         time = times[newIndex]
  //       if (time > tl.time() !== index > curIndex) {
  //         // if we're wrapping the timeline's playhead, make the proper adjustments
  //         vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
  //         time += tl.duration() * (index > curIndex ? 1 : -1)
  //       }
  //       curIndex = newIndex
  //       vars.overwrite = true
  //       return tl.tweenTo(time, vars)
  //     }
  //     tl.next = (vars) => toIndex(curIndex + 1, vars)
  //     tl.previous = (vars) => toIndex(curIndex - 1, vars)
  //     tl.current = () => curIndex
  //     tl.toIndex = (index, vars) => toIndex(index, vars)
  //     tl.times = times
  //     tl.progress(1, true).progress(0, true) // pre-render for performance
  //     if (config.reversed) {
  //       tl.vars.onReverseComplete()
  //       tl.reverse()
  //     }
  //     return tl
  //   }
}
