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
  let   [photos, setPhotos] = React.useState([])
  let   [query, setQuery]   = React.useState("")
  const queryInput          = useRef(null)

  const numberOfPhotos = 10;
  const url = "https://api.unsplash.com/photos/random/?count=" +
              numberOfPhotos + "&client_id=" + clientID

  useEffect(() => {
    const photosUrl = query ? `${url}&query=${query}` : url;

    simpleGet({
      url: photosUrl,
      onSuccess: res => {
        setPhotos(res.body);
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
      onSubmit: searchPhotos,
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
                key: 'unsplash-input',
                ref: queryInput,
                placeholder: "Try 'dogs' or 'coffee'!",
                type: "search",
                className: "input",
                defaultValue: "",
                style: { marginBottom: 20 },
              }
            )
          ]
        )
      ),
      React.createElement
      (
        'ul', { key: 'unsplash-result', className: 'photo-grid' },
        photos.map(photo => {
          return React.createElement
          (
            'li', { key: photo.id },
            React.createElement( 'img', { src: photo.urls.regular } )
          )
        })
      )
    ]
  )
}
