import React, { useState, useEffect, useRef } from 'react'
import superagent from 'superagent'
// https://unsplash.com/oauth/applications/224017

// const clientID = "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d"
const clientID = "7fCBA2w-hqHKrTOmWd8yL7chs2rXEaT893lUoU7fk3k"
// const clientID = ''

export function UnsplashSearcher()
{
  const controller          = React.useRef(null)
  let   [photos, setPhotos] = React.useState([])
  let   [query , setQuery ] = React.useState("")
  let   [status, setStatus] = React.useState('initial')
  const queryInput          = useRef(null)

  const numberOfPhotos = 10;
  const url = "https://api.unsplash.com/photos/random/?count=" +
              numberOfPhotos + "&client_id=" + clientID

  async function search(query) {
    // create random Id to identity requests
    const id = createId()
    // Abort any previous instance of this
    if (controller.current) controller.current.abort()

    const { signal } = (controller.current = new AbortController())

    const unsplashUrl = query ? `${url}&query=${query}` : url;

    console.log(`%c get image list with id: ${id}`, 'color: #fdf7e3; border: 2px dashed lightblue;')
    try {
      setStatus('loading')
      const response = await abortable(signal, superagent.get(unsplashUrl))

      console.log(`%c done get image list with id: ${id}`, 'background-color: #f6f6f6; color: #5eba7d;')
      await fetchingImages(response.body, id, signal)

      console.log(`status done with id: ${id}`)
      setStatus('done')
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log(`%c abort with id: ${id}`, 'background-color: #f6f6f6; color: tomato;')
        return;
      }
      throw err
    }
  }

  function fetchingImages(imgList, id, signal) {
    const fetchingImages = imgList.map(img => {
      const { width, height, urls: { regular } } = img
      const urlParams = new URLSearchParams(regular)
      const regularImg = { width: undefined, height: undefined, src: regular }
      if (urlParams.get('w')) {
        regularImg.width = Number.parseInt(urlParams.get('w'), 10)
        regularImg.height = regularImg.width * height / width
      }
      
      const item = {
        id: img.id,
        image: regularImg,
      }
      const itemP = new Promise(function (resolve) {
        const image = new Image()
        image.src = item.image.src
        image.addEventListener('load', function() {
          item.image = image
          resolve(item)
        })
        image.addEventListener('error', function() {
          item.image = ''
          resolve(item)
        })
      })
      return [item, itemP]
    })
    const imageTombstones = fetchingImages.map(x => x[0]).map(x => ({ id: x.id, image: { src: '', width: 0, heiht: 0 } }))
    const imagePromises   = fetchingImages.map(x => x[1])
    setPhotos(imageTombstones)
    imagePromises.forEach(async (ip, i) => {
      try {
        const image = await abortable(signal, ip)
        console.log(`image is load for id: ${id}`)
        setPhotos( prevPhotos => {
          const  newPhotos    = [...prevPhotos];
                 newPhotos[i] = image
          return newPhotos
        })
      } catch(err) {
        if (err.name === 'AbortError') {
          console.log(`%c image is aborted load for id: ${id}`, 'background-color: #f6f6f6; color: tomato;')
          return;
        }
        throw err
      }
    })
    return Promise.all(imagePromises)
  }

  useEffect(() => {
    search(query)
  }, [query, url])

  function searchPhotos(e) {
    e.preventDefault()
    setQuery(queryInput.current.value)
  }

  return React.createElement
  (
    'div',
    {
      className: 'box',
      onSubmit : searchPhotos,
    },
    [
      React.createElement
        (
          'form', { key: 'unsplash-form' },
          React.createElement
          (
            'label', null,
            [
              'Search Photos on Unsplash',
              React.createElement
              (
                'div', { className: 'search-bar', key: 'search-bar' },
                [
                  React.createElement
                  (
                    'input',
                    {
                      ref         : queryInput,
                      key         : 'unsplash-input',
                      type        : "search",
                      className   : "input input--unsplash",
                      defaultValue: "",
                      placeholder : "Try 'dogs' or 'coffee'!",
                    }
                  ),
                  React.createElement
                  (
                    'button',
                    {
                      className: 'search-btn',
                      key: 'unsplash-search-btn',
                      type: 'button',
                      onClick: function onClickSearchBtn() {
                        search(query)
                      },
                    },
                    'Search'
                  )
                ]
              ),
            ]
          )
        ),
      status == 'loading' ? 'Loading...' : undefined,
      React.createElement
        (
          'ul', { key: 'unsplash-result', className: 'photo-grid' },
          photos.map(photo => {
            if (photo.height / 5 === NaN) {
              debugger
            }
            return React.createElement
            (
              'li', { key: photo.id },
              React.createElement( 'img', { src: photo.image.src, width: photo.image.width / 5, height: photo.image.height / 5 } )
            )
          })
        )
    ]
  )
}

function createId() {
  return Array.from({ length: 10 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      ).join("")
}