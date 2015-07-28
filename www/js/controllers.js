angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope) {

})

.controller('ChatDetailCtrl', function($scope, $stateParams) {
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, Regions) {
  $scope.regions = Regions.all();
  $scope.reg = 'adama';
})
.controller('IonAutocompleteController', function($scope, Regions) {
    $scope.model = "";
    $scope.callbackValueModel = "";
    var itemss = [];
    var villes = [ "yaounde","douala","garoua","bafoussam","bertoua","maroua", "yagoua" ];
    $scope.getTestItems = function (query) {
      for(var cpt=0 ; cpt<villes.length ; cpt++) {
          if(villes[cpt].indexOf(query) != -1)
             itemss.push(villes[cpt]);
        }
        return {
                items: [
                        {id: "1", name:  "5", view: "yagoua: " },
                        {id: "2", name:  "6", view: "yaounde: "},
                        {id: "3", name:  "7", view: "yekie: " }]
            };
      };
    $scope.callbackMethod = function (query) {
    return Regions.all();
  }
    $scope.itemsClicked = function (callback) {
        $scope.callbackValueModel = callback;
      }
});
