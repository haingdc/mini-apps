import nav from './nav'
// import * as GSAP from 'gsap'
const getGSAP = () => import('gsap')
import makeButton from './button'
import { makeButtonStyle } from './button-styles'
import imageUrl from './webpack-logo.jpg'
import makeImage from './image'
// import { footer } from './footer'
const loadFooter = () => import(/* webpackChunkName: "footer" */ './footer')

if (process.env.NODE_ENV === 'development') {
  const setButtonStyle = (color) => import(/* webpackMode: "lazy-once" */ `./button-styles/${color}`)
} else {
  const setButtonStyle = (color) => import(`./button-styles/${color}`)
}
// const setButtonStyle = (color) => import(`./button-styles/${color}.js`)


const button = makeButton('ya button')
button.style = makeButtonStyle('tomato')
const image = makeImage(imageUrl)
document.body.appendChild(button)
document.body.appendChild(image)

button.addEventListener('click', function() {
  loadFooter().then(m => {
    document.body.appendChild(m.footer)
  })

  getGSAP().then(gsap => {
    console.log({ gsap })
  })

  setButtonStyle('pink').then(styleStr => {
    debugger
    button.style = styleStr.default
  })
})
