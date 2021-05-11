import nav from './nav'
import { footer } from './footer'
import makeButton from './button'
import { makeButtonStyle } from './button-styles'
import imageUrl from './webpack-logo.jpg'
import makeImage from './image'

const button = makeButton('ya button')
button.style = makeButtonStyle('tomato')
const image = makeImage(imageUrl)
document.body.appendChild(button)
document.body.appendChild(footer)
document.body.appendChild(image)
