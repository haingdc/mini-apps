var app = document.getElementById('app');
var count = document.getElementById('count');
var clickNum = 0;
var button = document.querySelector('#submit');
button.addEventListener('click', function onClick() {
  clickNum++;
  count.innerText = clickNum;
});

var data = [
  { src: '01.jpg', width: 16344, height: 4491 },
  { src: '02.jpg', width:  7668, height: 2911 },
  { src: '03.jpg', width: 04000, height: 1444 },
  { src: '04.jpg', width: 11559, height: 3156 },
  { src: '05.jpg', width:  4321, height: 1746 },
  { src: '06.jpg', width: 11256, height: 3637 },
  { src: '07.jpg', width:  6000, height: 4000 },
  { src: '08.jpg', width: 12160, height: 3913 },
  { src: '09.jpg', width:  5959, height: 3032 },
  { src: '10.jpg', width:  4740, height: 1830 },
  { src: '11.jpg', width: 15247, height: 4077 },
  { src: '12.jpg', width: 11824, height: 3800 },
  { src: '13.jpg', width: 10145, height: 4871 },
  { src: '14.jpg', width: 11060, height: 3693 },
  { src: '15.jpg', width:  8142, height: 2922 },
  { src: '16.jpg', width:  8175, height: 2898 },
  { src: '17.jpg', width: 11626, height: 3834 },
  { src: '18.jpg', width: 30000, height: 2822 },
  { src: '19.jpg', width: 16382, height: 3628 },
  { src: '20.jpg', width: 14154, height: 3634 },
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
     .catch(err => {
       console.error(mapItemToLog(err));
       var { width, height } = err
       err.width = 300;
       err.height = 300 * height / width;
       app.appendChild(err)
     });
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
      resolve(img);
      console.log(src, mapItemToLog(img));
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