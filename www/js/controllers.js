angular.module('agroprice.controllers', [])

    .controller('HomepageController', function ($scope, $ionicSideMenuDelegate) {
        $scope.message ='je suis au niveau du homepage';
        $scope.toggleLeftSideMenu = function() {
    		$ionicSideMenuDelegate.toggleLeft();
  		};
        
    })

    .controller('LoginController', function ($scope) {
        $scope.message ='je suis au niveau du login';
    })

    .controller('PricechoiceController', function ($scope) {
        $scope.message ='je suis au niveau de choiceprice';
    }
);
