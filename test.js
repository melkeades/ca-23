import { addSplideClasses, connectSplideArrows, onDomReady, sel, selAll } from './utils'
import './blog-post.styl'
export default function Test() {
  const figureWithImg$ = selAll(
    '.w-richtext-figure-type-image:not(.w-richtext-align-floatleft):not(.w-richtext-align-floatright):not(.w-richtext-align-center):has(img)'
  )
  figureWithImg$.forEach((el) => {
    const img = el.querySelector('img')
    if (img.clientWidth > img.clientHeight) {
      el.style.maxWidth = 'none'
    }
  })
}
// function onClassesReady(element, classList, callback) {
//   const observer = new MutationObserver(function (mutations) {
//     for (const mutation of mutations) {
//       if (mutation.attributeName === 'class') {
//         if (allClassesFoundAmongChildren(mutation.target, classList)) {
//           // if (element.matches(classNames.join('.')) || element.querySelector(classNames.join('.'))) {
//           observer.disconnect()
//           callback()
//         }
//       }
//     }
//   })
//   function allClassesFoundAmongChildren(element, classList) {
//     return classList.every((className) => element.querySelector(`.${className}`))
//   }

//   observer.observe(element, { attributes: true, subtree: true })
// }

// const div = document.getElementById('myDiv')
// const classes = ['myClass1', 'myClass2']
// const callback = function () {
//   console.log('The element or its child has the classes!')
// }
