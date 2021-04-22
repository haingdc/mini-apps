const { useState, useEffect, useRef } = React;

// const clientID = "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d"
const clientID = "7fCBA2w-hqHKrTOmWd8yL7chs2rXEaT893lUoU7fk3k"
// const clientID = ''

export function UnsplashSearcher()
{
  const controller          = React.useRef(null)
  let   [photos, setPhotos] = React.useState([])
  let   [query, setQuery]   = React.useState("")
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

    const photosUrl = query ? `${url}&query=${query}` : url;

    console.log(`%c fetch with id: ${id}`, 'color: #fdf7e3; border: 2px dashed lightblue;')
    try {
      setStatus('loading')
      const images = await abortable(signal, superagent.get(photosUrl).then(function onSuccess(res)
      {
        const fetchingImages = res.body.map(img => {
          const item = {
            id: img.id,
            image: { src: img.urls.regular },
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
        const tombstones = fetchingImages.map((n, index) => {
          n[1].then(image => {
            setPhotos( prevPhotos => {
              const newPhotos = [...prevPhotos]
              newPhotos[index] = image
              return newPhotos
              } )
          })
          const tombstone = {
            id: n[0].id,
            image: { src: '' },
          }

          return tombstone
        })
        const imagesP = fetchingImages.map(n => {
          return n[1]
        })
        setPhotos(tombstones)
        return Promise.all(imagesP)
    }))
    setStatus('done')
    console.log(`%c fulfilled with id: ${id}`, 'background-color: #f6f6f6; color: #5eba7d;')
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log(`%c abort with id: ${id}`, 'background-color: #f6f6f6; color: tomato;')
        return;
      }
      throw err
    }

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
                      onClick: function() {
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
            return React.createElement
            (
              'li', { key: photo.id },
              React.createElement( 'img', { src: photo.image.src } )
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