angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $stateParams, Villes, Categories) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('PlaylistCtrl', ['$scope', '$stateParams', 'Villes', 'Categories', '$log','$http',
    function($scope, $stateParams, Villes, Categories, $log, $http) {

      //recuperation des nom des Categories
      $http.get('/api/categories').then(function(resp) {
        $scope.categories = resp.data;
        console.log('Success', resp);
      }, function(err) {
        console.log('ERR', err);
      });

      // la fonction qui permet de mettre a jour les produits
      $scope.produits = "";
      $scope.categorie = "";
      $scope.updateProduits = function () 
      {
        console.log($scope.categorie.id);
        $http.get('/api/categories/'+'6/'+'produits').then(function(resp) 
        {
          $scope.produits = resp.data;
          console.log('Success', resp);
        },function(err) 
        {
          console.log('ERR', err);
        });
      }

      //recuperation des nom des villes
     $http.get('/api/villes').then(function(resp) {
        $scope.villes = resp.data;
        //console.log('Success', resp);
      }, function(err) {
        console.log('ERR', err);
      });

     // la fonction qui permet de mettre a jour les marches
      //$scope.marches = "";
      $scope.updateMarches = function () 
      {
        //console.log($scope.cat.id);
        $http.get('/api/categories/'+'2/'+'marches').then(function(resp) 
        {
          $scope.marches = resp.data;
          console.log('Success', resp);
        },function(err) 
        {
          console.log('ERR', err);
        });
      }

      $scope.currentDate = new Date();
      $scope.title = "Custom Title";

      $scope.datePickerCallback = function (val) {
        if(typeof(val)==='undefined'){      
            console.log('Date not selected');
        }else{
          console.log('Selected date is : ', val);
        }
    };

}]).controller('MyCtrl', ['$scope', 'FlightDataService','$log','$http', function($scope, FlightDataService, $log, $http) {

    $scope.data = { "airlines" : [], "search" : '' };

    $scope.search = function() {
      if($scope.data.search.length != 0){
          FlightDataService.searchAirlines($scope.data.search).then(
            function(matches) {
              $scope.data.airlines = matches;
            }
        )
      }else{
        $scope.data.airlines = "";
      }
    }

    $scope.selectName = function (ville) {
        $scope.data.search = ville.nom;
        $scope.data.airlines = "";
        console.log(ville.id);
        console.log('/api/villes/'+ville.id+'/marches');
        $http.get('/api/villes/'+ville.id+'/marches').then(function(resp) 
        {
          $scope.marches = resp.data;
          console.log(resp.data);
        },function(err) 
        {
          console.log('ERR', err);
        });
   }
    
    }]).controller("LineCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

  $scope.labels = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
  $scope.series = ['Cette Semaine ', 'Semaine Prec'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  $timeout(function () {
    $scope.data = [
      [28, 48, 40, 19, 86, 27, 90],
      [65, 59, 80, 81, 56, 55, 40]
    ];
  }, 3000);

  // pour le sceau de mais

  $scope.labelsceau = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
  $scope.seriesceau = ['Cette Semaine ', 'Semaine Prec'];
  $scope.datasceau = [
    [1500, 1250, 1000, 2000, 2250, 2000, 1750],
    [1000, 1750, 1500, 1700, 1250, 1900, 2150]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  $timeout(function () {
    $scope.datasceau = [
      [1000, 1750, 1500, 1700, 1250, 1900, 2150],
      [1500, 1250, 1000, 2000, 2250, 2000, 1750]
    ];
  }, 3000);

}]).controller('MarkerRemoveCtrl', function($scope, $ionicLoading) {

  $scope.positions = [{
    lat: 4.0473831,
    lng: 9.6951812
  }];

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  $scope.centerOnMe= function(){
  $scope.positions = [];
    $ionicLoading.show({
      template: 'Loading...'
    });
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.positions.push({lat: pos.k,lng: pos.B});
      console.log(pos);
      $scope.map.setCenter(pos);
      $ionicLoading.hide();
    });

  };

});
