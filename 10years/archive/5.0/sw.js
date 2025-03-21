var updatedSW = 13; //TO BE REPLACED WITH NEW NUMBER ON EACH NEW VERSION

//load app-data object
self.importScripts('src/jonathan_herrmann_engel/js/appdata.js?src=sw');

//generate cache-name from version and branch
var locationstr = location.pathname;
locationstr = locationstr.substr(0,locationstr.length-(locationstr.length-locationstr.lastIndexOf("/")));
locationstr = locationstr.substr(locationstr.lastIndexOf("/")-locationstr.length+1);
var CACHE_NAME = "moroway-app-version-" + APP_DATA.version.major + "." + APP_DATA.version.minor + "." + APP_DATA.version.patch + "-" + 	locationstr + "-sw-" + updatedSW;

//list of all files related to moroway app
var urlsToCache = [
  '.',
  'error/',
  'help/',
  'settings/',
  'whatsnew/',
  'manifest.webmanifest',
  'platform.js',
  'src/jonathan_herrmann_engel/js/LICENSE',
  'src/jonathan_herrmann_engel/js/appdata.js',
  'src/jonathan_herrmann_engel/js/error.js',
  'src/jonathan_herrmann_engel/js/general.js',
  'src/jonathan_herrmann_engel/js/help.js',
  'src/jonathan_herrmann_engel/js/scripting.js',
  'src/jonathan_herrmann_engel/js/settings.js',
  'src/jonathan_herrmann_engel/js/whatsnew.js',
  'src/others/open_source/open_code/google/mdl/ABOUT',
  'src/others/open_source/open_code/google/mdl/COPYRIGHT',
  'src/others/open_source/open_code/google/mdl/LICENSE',
  'src/others/open_source/open_code/google/mdl/material.min.css',
  'src/others/open_source/open_code/google/mdl/material.min.js',
  'src/others/open_source/open_code/hubspot/pace.js/ABOUT',
  'src/others/open_source/open_code/hubspot/pace.js/COPYRIGHT',
  'src/others/open_source/open_code/hubspot/pace.js/LICENSE',
  'src/others/open_source/open_code/hubspot/pace.js/pace.min.js',
  'src/others/open_source/open_code/hubspot/pace.js/pace-theme-center-simple.tmpl.css',
  'src/others/open_source/open_fonts/google/MaterialIcons/ABOUT',
  'src/others/open_source/open_fonts/google/MaterialIcons/LICENSE',
  'src/others/open_source/open_fonts/google/MaterialIcons/font.css',
  'src/others/open_source/open_fonts/google/MaterialIcons/MaterialIcons-Regular.ttf',
  'src/others/open_source/open_fonts/google/Roboto/ABOUT',
  'src/others/open_source/open_fonts/google/Roboto/COPYRIGHT',
  'src/others/open_source/open_fonts/google/Roboto/LICENSE',
  'src/others/open_source/open_fonts/google/Roboto/font.css',
  'src/others/open_source/open_fonts/google/Roboto/Roboto-Regular.ttf',
  'assets/COPYRIGHT',
  'assets/LICENSE',
  'assets/asset_background_body.png',
  'assets/asset_background_train.png',
  'assets/asset1.png',
  'assets/asset2.png',
  'assets/asset3.png',
  'assets/asset4.png',
  'assets/asset5.png',
  'assets/asset6.png',
  'assets/asset7.png',
  'assets/asset8.png',
  'assets/asset9.png',
  'assets/asset10.png',
  'assets/asset11.png',
  'assets/asset12.png',
  'assets/asset13.png',
  'assets/asset14.png',
  'assets/asset15.png',
  'assets/asset16.png',
  'assets/asset17.png',
  'assets/helpasset1_bug_report.png'
];

//service worker code to let them do their service work

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response !== undefined) {
		  return response;
        }
		
		var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
	  }
	)
    );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key, i) {
        if (key !== CACHE_NAME) {
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})

