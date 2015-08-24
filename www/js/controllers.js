angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
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
  $scope.nom = "pouemo";
  // Perform the login action when the user submits the login form
  $scope.doLogin = function(user, password) {
    //var login = $scope.login;
    console.log('le login  '+user+' le password  '+'le login  '+user);
    $state.go('app.update', {login:user,password:password});
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $stateParams, $http, Prix, Villes, $http, $translate) 
{
  $scope.idmarche = $stateParams.idmarche;

  //console.log($stateParams.idProduit+'je suis la'+$stateParams.idmarche);
 if(typeof($stateParams.idProduit)!=='undefined'){
    $http.get('api/produits/'+$stateParams.idProduit).then(function(resp){
        $scope.produitSelected = resp.data;
      },function(err){
        console.log('ERR', err);
    });

    $http.get('/api/prix/'+$stateParams.idProduit+'/'+$stateParams.idmarche).then(function(resp){
        $scope.prixProduit = resp.data;
      },function(err){
        console.log('ERR', err);
    });
}

  $scope.ChangeLanguage = function(lang){
    $translate.use(lang);
  }
/*
  Prix.getProduit($stateParams.idProduit).success(function(data){
          $scope.produitSelected = data.results;
          //onsole.log('Success', resp);
        });

  Prix.get($stateParams.idmarche, $stateParams.idProduit).success(function(data){
    $scope.prixProduit = data.results;
  });
*/
})
.controller('PlaylistCtrl', ['$scope', '$stateParams', '$log','$http', 'Villes','$translate',
    function($scope, $stateParams, $log, $http, Villes, $translate) {

      $scope.ChangeLanguage = function(lang){
          $translate.use(lang);
      }
      
      //recuperation des nom des Categories
      $http.get('/api/categories').then(function(resp) {
        $scope.categories = resp.data;
        //console.log('Success', resp);
      }, function(err) {
        console.log('ERR', err);
      });

      // la fonction qui permet de mettre a jour les produits
      $scope.produits = "";
      $scope.data = { "airlines" : [], "search" : '' };
      $scope.updateProduits = function (categorie){
        console.log('/api/categories/'+categorie.id+'/produits');
        $http.get('/api/categories/'+categorie.id+'/produits').then(function(resp){
          $scope.produits = resp.data;
          //console.log('Success', resp);
        },function(err){
          console.log('ERR', err);
        });
      }

      //recuperation des nom des villes

      $scope.updateVilles = function (produit) 
      {
        $scope.search = function() {
            Villes.searchVilles($scope.data.search, produit.id).then(
              function(matches) {
                $scope.data.airlines = matches;
              }
           )
        }
      }
      // si selection une ville
    $scope.selectName = function (ville, produit) {
        $scope.data.search = ville.nom;
        $scope.data.airlines = "";
        console.log('/api/marches/'+produit.id+'/'+ville.id+'/marches');

        //  mettre a jour les marches
        $http.get('/api/marches/'+produit.id+'/'+ville.id+'/marches').then(function(resp) 
        {
          $scope.marches = resp.data;
          console.log('Success', resp);
        },function(err){
          console.log('ERR', err);
        }); 
    }

      $scope.currentDate = new Date();
      $scope.debut = new Date();
      $scope.title = "Custom Title";

      $scope.datePickerCallback = function (val) {
        if(typeof(val)==='undefined'){      
            console.log('Date not selected');
        }else{
          console.log('Selected date is : ', val);
        }
    };

}]).controller('ModifierCtrl', ['$scope', '$stateParams', '$log','$http', 'Villes','$translate',
    function($scope, $stateParams, $log, $http, Villes, $translate) {
      
      $scope.login = $stateParams.login;
      $scope.login = $stateParams.password;

      //recuperation des nom des Categories
      $http.get('/api'+'/categories').then(function(resp) {
        $scope.categories = resp.data;
        console.log('pass'+$stateParams.idAgent);
      },function(err){
          console.log('ERR', err);
        });

      // la fonction qui permet de mettre a jour les produits
      $scope.produits = "";
      $scope.data = { "airlines" : [], "search" : '' };
      $scope.updateProduits = function (categorie){
        console.log('/api/categories/'+categorie.id+'/produits');
        $http.get('/api/categories/'+categorie.id+'/produits').then(function(resp){
          $scope.produits = resp.data;
          //console.log('Success', resp);
        },function(err){
          console.log('ERR', err);
        });
      }

      //recuperation des nom des villes

      $scope.updateVilles = function (produit) 
      {
        $scope.search = function() {
            Villes.searchVilles($scope.data.search, produit.id).then(
              function(matches) {
                $scope.data.airlines = matches;
              }
           )
        }
      }

      $scope.currentDate = new Date();
      $scope.debut = new Date();
      $scope.title = "Custom Title";

      $scope.datePickerCallback = function (val) {
        if(typeof(val)==='undefined'){      
            console.log('Date not selected');
        }else{
          console.log('Selected date is : ', val);
        }
    };

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

}]).controller('MarkerRemoveCtrl', function($scope, $ionicLoading, $http, $stateParams) {

  $http.get('api/marches/'+$stateParams.idmarche).then(function(resp){
      $scope.marche = resp.data;
    },function(err){
      console.log('ERR', err);
  });

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
