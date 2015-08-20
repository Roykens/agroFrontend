var translations = {
    "en": {
        "cat": "Cathegory",
        "pro": "Product",
        "pri": "See price",
        "mac": "Market",
        "vil": "Town"
    },
    "fr": {
        "cat": "Categorie",
        "pro": "Produit",
        "pri": "Voir prix",
        "mac": "Varche",
        "vil": "Ville"
    }
  }


angular.module('starter', ['ionic', 'ngResource','pascalprecht.translate', 'ngMap', 'starter.controllers', 'starter.services', 'ionic-datepicker','chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  for(lang in translations){
    $translateProvider.translations(lang, translations[lang]);
  }
  
  $translateProvider.preferredLanguage('en');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  .state('app.auto', {
      url: '/auto',
      views: {
        'menuContent': {
          templateUrl: 'templates/auto.html',
          controller: 'PlaylistCtrl'
        }
      }
    })
  .state('app.map', {
      url: '/playlists/:idmarche',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MarkerRemoveCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:idProduit/:idmarche',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistsCtrl'
      }
    }
  }).state('app.evolution', {
    url: '/evolution/:produitId',
    views: {
      'menuContent': {
        templateUrl: 'templates/evolution.html',
        controller: 'LineCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
