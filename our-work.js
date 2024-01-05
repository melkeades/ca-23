import { onDomReady, scrollTriggerInit } from './utils'

export default function OurWork() {
  onDomReady(function () {
    scrollTriggerInit('20vh', 'our-work-hero__img', 'our-work-hero', 'to', 'top', true)
    scrollTriggerInit('-50vh', 'our-work-hero__info', 'our-work-hero', 'to', 'top', true)
  })
}
