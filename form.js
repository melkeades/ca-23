import { sel } from './utils'

export default function Form() {
  console.log('form')
  const email$ = sel('#email')

  email$.addEventListener('input', (event) => {
    localStorage.setItem('userEmail', event.target.value)
  })
}
