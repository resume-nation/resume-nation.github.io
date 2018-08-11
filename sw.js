importScripts('js/cache-polyfill.js');

var CACHE_VERSION = 'resumenation-v15';
var CACHE_FILES = [
    '/',
    'index.html',
    'controllers/downloadCtrl.js',
    'controllers/educationCtrl.js',
    'controllers/experienceCtrl.js',
    'controllers/projectsCtrl.js',
    'controllers/skillsCtrl.js',
    'controllers/tabCtrl.js',

    'js/angular.js',
    'js/angular-sanitize.js',
    'js/angular-animate.min.js',
    'js/angular-route.min.js',
    'js/angular-aria.min.js',
    'js/angular-messages.min.js',
    'js/svg-assets-cache.js',
    'js/angular-ui-router.min.js',
    'js/angular-material.js',
    'js/printThis.js',
    'app.js',

    'js/jquery.min.js',

    'css/app.css',
    'css/resume-one.css',
    'css/angular-material.min.css',

    'partials/basicinfo.html',
    'partials/download.html',
    'partials/education.html',
    'partials/experiences.html',
    'partials/home.html',
    'partials/projects.html',
    'partials/skills.html',
    'partials/summary.html',
    'partials/toast-template.html',

    'services/toastService.js',
    'services/utilService.js',

    'fonts/LazenbyCompSmooth.ttf',
    'fonts/MaterialIcons-Regular.eot',
    'fonts/MaterialIcons-Regular.ijmap',
    'fonts/MaterialIcons-Regular.svg',
    'fonts/MaterialIcons-Regular.ttf',
    'fonts/MaterialIcons-Regular.woff',
    'fonts/MaterialIcons-Regular.woff2',
    'fonts/MysteryQuest-Regular.ttf',
    'fonts/propaganda.ttf',

    'favicon.ico',
    'manifest.json',
    'images/icon-48.png',
    'images/icon-96.png',
    'images/icon-144.png',
    'images/icon-192.png',
    'images/spiffygif_36x36.gif',
    'images/flat-demo.PNG',
    'images/fancy-demo.PNG',
    'images/stock-demo.PNG'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('fetch', function (event) {
    let online = navigator.onLine;
    if(!online){
        event.respondWith(
            caches.match(event.request).then(function(res){
                if(res){
                    return res;
                }
                requestBackend(event);
            })
        )
    }
});

function requestBackend(event){
    var url = event.request.clone();
    return fetch(url).then(function(res){
        //if not a valid response send the error
        if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
        }

        var response = res.clone();

        caches.open(CACHE_VERSION).then(function(cache){
            cache.put(event.request, response);
        });

        return res;
    })
}

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
});
