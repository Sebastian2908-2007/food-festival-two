/*beloq we define files we would like our service worker to CACHE*/ 
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];

/*Service worker Constraints*/
const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

/* self is used here instead of window because service workers run
before the window  object has been created the context of self here refers to the service worker object*/
self.addEventListener('install',function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE)
        })
    )

});

/*this will activate the service worker and manage our caches*/
self.addEventListener('activate', function(e) {
    e.waitUntil(
        /*caches refers to the CacheStorageObject and keys is a method that will return an array of all cache names we call 
        it "keyList in our anonomous function in the promise" */
        caches.keys().then(function (keyList) {
            /*map through the returned object from keys() method
            and find our cache and return an array containing just 
            our cache */
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })
            /*push our cache name to the cacheKeeplist array */
            cacheKeepList.push(CACHE_NAME);

           /* remove caches that dont match our current version, wee start by mapping the keyList */
            return Promise.all(keyList.map(function (key, i) {
                /*here we check if cacheKeeplist has the current Cache in it*/ 
                if(cacheKeepList.indexOf(key) === -1) {
                    /*if it doesnt we delete it */
                    console.log('deleteing cache : ' + keyList[i] );
                    return caches.delete(keyList[i]);
                }
              })
            );
        })
    );
});

/*fetch resources from the cache*/
self.addEventListener('fetch',function (e) {
   console.log('fetch request : ' + e.request.url)

   /*use the respondWith Method to match the request with whats in our cache between requests*/
   e.respondWith(
       /*here we match request and cache*/
       caches.match(e.request).then(function (request) {
           /** if we hace a match return response */
        if(request) {    
        console.log('responding with cache : ' + e.request.url);
           return request
           /*if no match fetch the resource as per usual*/
        }else {
            console.log('file is not cached, fetching : ' + e.request.url);
            return fetch(e.request)
        }
       })
   )
});