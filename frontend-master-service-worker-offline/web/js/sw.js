"use strict";

const version    = 4.5
var   isOnline   = true
var   isLoggedIn = false
var   cacheName  = `ramblings-${version}`

var urlsToCache = {
  loggedOut: [
    '/',
    '/about',
    '/contact',
    '/404',
    '/login',
    '/offline',
    '/css/style.css',
    'images/logo.gif',
    'images/offline.png'
  ],

}

self.addEventListener( 'install', onInstall )
self.addEventListener('activate', onActivate)
self.addEventListener( 'message', onMessage )

main().catch(console.error)

async function main() {
  // console.log(`Service Worker (${version}) is starting...`)
  await sendMessage({ requestStatusUpdate: true })
  await cacheLoggedOutFiles() // if anything is not in the cache, go ahead and get it. If anything is already in the cache, just ignore it
}

async function onInstall() {
  console.log(`Service Worker (v${version}) installed.`)
  self.skipWaiting()
}
function onActivate(evt) {
  evt.waitUntil(handleActivation())
}

async function handleActivation() {
  await clearCaches()
  await clients.claim()
  await cacheLoggedOutFiles(/*forceReload=*/true) // hey I don't care whether it's in the cache or not, definitely go check the server. Make sure to load that information from server
  console.log(`Service Worker (v${version}) activated.`)
}

async function clearCaches() {
  var cacheNames = await caches.keys()
  var oldCacheNames = cacheNames.filter(function matchOldCache(cacheName) {
    if (/^ramblings-\d+$/.test(cacheName)) {
      let [, cacheVersion] = cacheName.match(/^ramblings-(\d+)$/)
      cacheVersion = (cacheVersion != null) ? Number(cacheVersion) : cacheVersion
      return (cacheVersion > 0 && cacheVersion != version)
    }
  })

  return Promise.all(
    oldCacheNames.map(function deleteCache(cacheName) {
      return caches.delete(cacheName)
    })
  )
}

async function sendMessage(msg) {
  var allClients = await clients.matchAll({ includeUncontrolled: true })
  return Promise.all(
    allClients.map(function clientMsg(client) {
      var chan = new MessageChannel()
      chan.port1.onmessage = onMessage
      return client.postMessage(msg, [chan.port2])
    })
  )
}

function onMessage({ data }) {
  if (data.statusUpdate) {
    ({ isOnline, isLoggedIn } = data.statusUpdate)
    console.log(`Service Worker (v${version}) status update, isOnline: ${isOnline}, isLoggedin: ${isLoggedIn}`)
  }
}

async function cacheLoggedOutFiles(forceReload = false) {
  var cache = await caches.open(cacheName)

  return Promise.all(
    urlsToCache.loggedOut.map(async function requestFile(url) {
      try {
        let res

        if(!forceReload) {
          res = await cache.match(url)
          if (res) {
            return res
          }
        }

        let fetchOptions = {
          method: "GET",
          cache: "no-cache", // tell the browser don't store this response in its immediate cache, we want fresh results. If you don't do this., it may just feeding your service worker from that imtermediary browser cache, which then sort of defeats whole purpose trying to have control over your caching
          credentials: "omit",
        }
        res = await fetch(url,fetchOptions)
        if (res.ok) {
          await cache.put(url, res)
        }
      } catch(err) {
        console.log(err)
      }
    }
  ))
}