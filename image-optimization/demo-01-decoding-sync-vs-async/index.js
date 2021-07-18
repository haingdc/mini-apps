var app = document.getElementById('app');
var button = document.querySelector('#submit');
button.addEventListener('click', function onClick() {
  console.log('click me');
});

var data = [
  { src: '01.jpg', width: 16344, height: 4491 },
  { src: '02.jpg', width:  7668, height: 2911 },
  { src: '03.jpg', width: 04000, height: 1444 },
  { src: '04.jpg', width: 11559, height: 3156 },
  { src: '05.jpg', width:  4321, height: 1746 },
  { src: '06.jpg', width: 11256, height: 3637 },
  { src: '07.jpg', width:  6000, height: 4000 },
];

var config = {
  async: false, // opt-out to see the difference
};
var startTime = performance.now();
var imagesPromise = data.map(renderImage);
imagesPromise.map(p => {
    p.then(img => {
       var { width, height } = img
       img.width = 300;
       img.height = 300 * height / width;
       return img;
     })
     .then(app.appendChild.bind(app))
  });
  // Promise
  //   .all(imagesPromise)
  //   .then(images => {
  //     console.log('all after' + (performance.now() - startTime) + 'ms');
  //     return images;
  //   })
  //   .then(images => {
  //     var log = images.map(mapItemToLog);
  //     console.log(log);
  //     return images;
  //   })
  //   .then(images => {
  //     images.forEach(app.appendChild.bind(app));
  //   });

function renderImage(item) {
  return new Promise((resolve, reject) => {
    var { src, width, height } = item;
    var img = new Image();

    img.src             = 'images/large/' + src;
    img.width           = width;
    img.height          = height;
    img.__isLoad        = undefined;
    img.__isDecoded     = undefined;
    img.__isFaildLoad   = undefined;
    img.__isFaildDecode = undefined;
    img.__timeToLoad    = undefined;
    img.__timeToDecode  = undefined;

    var time = performance.now();

    img.onload  = config.async ? onLoadAsync : onLoad;
    img.onerror = onErrorLoad;
    if (config.async) {
      img.decode()
          .then(onDecoded)
          .catch(onErrorDecode)
    }

    function onLoadAsync() {
      var now = performance.now();
      img.__timeToLoad = now - time;
      img.__isLoad = true;
    }
    function onLoad() {
      var now = performance.now();
      img.__timeToLoad = now - time;
      img.__isLoad = true;
      console.log(src, mapItemToLog(img));
      resolve(img);
    }
    function onErrorLoad() {
      img.__isFaildLoad = true;
      reject(img);
    }
    function onDecoded() {
      var now = performance.now();
      img.__timeToDecode = now - time;
      img.__isDecoded = true;
      console.log(src, mapItemToLog(img));
      resolve(img);
    }
    function onErrorDecode() {
      img.__isFaildDecode = true;
      reject(img);
    }
  });
}

function mapItemToLog(item) {
  return {
    src            : item.src,
    width          : item.width,
    height         : item.height,
    __isLoad       : item.__isLoad,
    __isDecoded    : item.__isDecoded,
    __isFaildLoad  : item.__isFaildLoad,
    __isFaildDecode: item.__isFaildDecode,
    __timeToLoad   : item.__timeToLoad,
    __timeToDecode : item.__timeToDecode
  };
}