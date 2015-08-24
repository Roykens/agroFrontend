
angular.module('starter', ['ionic', 'ngResource','pascalprecht.translate', 'ngMap', 'starter.controllers', 'starter.services', 'ionic-datepicker','chart.js'])

.run(function($ionicPlatform, $translate) {
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
    //la geolocalisation

     if(typeof navigator.globalization !== "undefined") {
                navigator.globalization.getPreferredLanguage(function(language) {
                    $translate.use((language.value).split("-")[0]).then(function(data) {
                        console.log("SUCCESS -> " + data);
                    }, function(error) {
                        console.log("ERROR -> " + error);
                    });
                }, null);
            }

  });
}).config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  $translateProvider.translations('en', {
        cat: "Cathegory",
        pro: "Product",
        pri: "See price",
        mac: "Market",
        vil: "Town",
        carte:"Locate the market on a map",
        nprix:"New price",
        action:"Update"
  });
  $translateProvider.translations('fr', {
        cat: "Categorie",
        pro: "Produit",
        pri: "Voir prix",
        mac: "Marche",
        vil: "Ville",
        carte:"Voir le marche sur la carte",
        nprix:"Nouvel prix",
        action:"Modifier"
  });
        $translateProvider.preferredLanguage("fr");
        $translateProvider.fallbackLanguage("en");

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
  })
  .state('app.update', {
    url: '/modifer/:idAgent',
    views: {
      'menuContent': {
        templateUrl: 'templates/modifier.html',
        controller: 'ModifierCtrl'
      }
    }
  })
  .state('app.evolution', {
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
