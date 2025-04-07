import { sel } from './utils'

export default function Form2() {
  const email$ = sel('#email')
  const userEmail = localStorage.getItem('userEmail')
  if (userEmail) {
    email$.value = userEmail
  }

  const activeColor = '#ff8125'
  const inactiveColor = '#000000'

  const inputRange$a = document.querySelector('#inputRange')
  const updateRangeValue = (e) => {
    const el = e.target
    const ratio = ((el.value - el.min) / (el.max - el.min)) * 100
    el.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`
  }
  updateRangeValue({ target: inputRange$a })
  inputRange$a.addEventListener('input', updateRangeValue)
}
