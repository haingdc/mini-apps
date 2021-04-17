const { useState, useEffect, useRef } = React;

const clientID = "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d"

function simpleGet(options) {
  superagent
  .get(options.url)
  .then(function(res) {
    if (options.onSuccess) options.onSuccess(res)
  })
}

export function UnsplashSearcher()
{
  let [photos, setPhotos] = React.useState([])
  let [query, setQuery]   = React.useState("")
  let [status, setStatus] = React.useState('initial')
  const queryInput        = useRef(null)

  const numberOfPhotos = 10;
  const url = "https://api.unsplash.com/photos/random/?count=" +
              numberOfPhotos + "&client_id=" + clientID

  useEffect(() => {
    const photosUrl = query ? `${url}&query=${query}` : url;

    setStatus('loading')
    simpleGet({
      url: photosUrl,
      onSuccess: res => {
        const fetchingImages = res.body.map(img => {
          return new Promise(function (resolve) {
            const item = {
              id: img.id,
              image: img.urls.regular,
            }
            const image = new Image()
            image.src = item.image
            image.addEventListener('load', function() {
              item.image = image
              resolve(item)
            })
            image.addEventListener('error', function() {
              item.image = ''
              resolve(item)
            })
          })
        })
        Promise
        .all(fetchingImages)
        .then(setPhotos)
        .then(() => setStatus('done'))
        // setPhotos(res.body);
      }
    });
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
                'input',
                {
                  ref         : queryInput,
                  key         : 'unsplash-input',
                  type        : "search",
                  className   : "input",
                  defaultValue: "",
                  placeholder : "Try 'dogs' or 'coffee'!",
                  style       : { marginBottom: 20 },
                }
              )
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
