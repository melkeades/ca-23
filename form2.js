import { sel } from './utils'
export default function Form2() {
  console.log('tt')
  const activeColor = '#ff8125'
  const inactiveColor = '#000000'

  const inputRange$a = document.querySelector('#inputRange')
  inputRange$a.addEventListener('input', function () {
    const ratio = ((this.value - this.min) / (this.max - this.min)) * 100
    this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`
  })
}
