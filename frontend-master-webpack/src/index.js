import nav from './nav'
import { footer } from './footer'
import makeButton from './button'
import { makeButtonStyle } from './button-styles'

const button = makeButton('ya button')
button.style = makeButtonStyle('tomato')
document.body.appendChild(button)
document.body.appendChild(footer)

console.log(nav, bottom, top, makeButton('submit'), makeButtonStyle('cyan'))