import { red, blue } from './button-styles'
import './footer.css'
const getLodash = () => import(
  /* webpackPreload: true */
  /* webpackChunkName: "getLodash-preload" */
  "lodash-es"
)

// TODO: these is not preload image. Still research
const getImage = () => import(
  /* webpackPreload: true */
    /* webpackChunkName: "getImage" */
  './assets/movie-app.jpg'
)

getImage().then(src => {
  console.log({ src })
}).catch(console.error)

const top = document.createElement('div')
top.innerText = 'top of footer'
top.style = red
const bottom = document.createElement('div')
bottom.innerText = 'bottom of footer'
bottom.style = blue

const footer = document.createElement('footer')
footer.appendChild(top)
footer.appendChild(bottom)

export { bottom, top , footer }