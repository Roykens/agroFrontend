angular.module('starter.controllers', [])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, $http, $ionicLoading) {
            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            var vefified = "";
            $scope.error = "";
            // Perform the login action when the user submits the login form
            $scope.doLogin = function (user, password) {
                $ionicLoading.show();
                $http.get('api/' + 'authentification/' + user + '/' + password).then(function (resp) {
                    vefified = resp.data;
                    if (vefified.reponse === 'succes') {
                        $ionicLoading.hide();
                        $state.go('app.update', {login: user, password: password});
                        $timeout(function () {
                            $scope.closeLogin();
                        }, 1000);
                    } else {
                        $scope.password = "";
                        $scope.error = "login ou mot de passe incorrect";
                        $ionicLoading.hide();
                    }
                }, function (err) {
                    console.log('ERR', err);
                });
            };
        })

        .controller('PlaylistsCtrl', function ($scope, $stateParams, $http, Prix, Villes, $http, $translate)
        {
            $scope.idmarche = $stateParams.idmarche;
            $scope.idVille = $stateParams.idVille;
            if (typeof ($stateParams.idProduit) !== 'undefined') {
                $http.get('api/produits/' + $stateParams.idProduit).then(function (resp) {
                    $scope.produitSelected = resp.data;
                }, function (err) {
                    console.log('ERR', err);
                });

                $http.get('/api/prix/' + $stateParams.idProduit + '/' + $stateParams.idmarche).then(function (resp) {
                    $scope.prixProduit = resp.data;
                }, function (err) {
                    console.log('ERR', err);
                });
            }

            $scope.ChangeLanguage = function (lang) {
                $translate.use(lang);
            };
        })
        .controller('PlaylistCtrl', ['$scope', '$stateParams', '$log', '$http', '$translate', 'Villes','$timeout',
            function ($scope, $stateParams, $log, $http, $translate, Villes,$timeout) {
                //declaration des variables 
                //$scope.produits = "";
                //$scope.produits ="";
                $scope.data = {"airlines": [], "search": ''};
                $scope.montrelist = true;
                //la fonction qui permet de faire les trasuction des langue
                $scope.ChangeLanguage = function (lang) {
                    $translate.use(lang);
                };
                //recuperation des nom des Categories
                $http.get('/api/categories').then(function (resp) {
                    console.log('Success', resp);
                    $scope.categories = resp.data;
                }, function (err) {
                    console.log('ERR', err);
                });
                // la fonction qui permet de mettre a jour les produits en fonction des categories
                $scope.updateProduits = function (categorie) {
                    console.log('/api/categories/' + categorie.id + '/produits');
                    $http.get('/api/categories/' + categorie.id + '/produits').then(function (resp) {
                        $scope.produits = resp.data;
                    }, function (err) {
                        console.log('ERR', err);
                    });
                };
                //recuperation des nom des villes ayant un produit de la categorie
                $scope.updateVilles = function (produit){
                    $scope.montrelist = true;
                    $http.get('/api/produits/' + produit.id + '/villes').then(function (resp) {
                        $scope.data.airlines = resp.data;
                        $scope.data.search = "";
                    }, function (err) {
                        console.log('ERR', err);
                    });

                    $scope.search = function () {
                        $scope.montrelist = true;
                        /*Villes.searchVilles($scope.data.search, produit.id).then(
                         function (matches) {
                         $scope.data.airlines = matches;
                         }
                         );*/
                    };
                };
                // La fonction qui permart de selectionner une ville
                $scope.selectName = function (ville, produit) {
                    $scope.data.search = ville.nom;
                    $scope.idVille = ville.id;
                    $scope.montrelist = false;
                    //  mettre a jour les marches
                    $http.get('/api/marches/' + produit.id + '/' + ville.id + '/marches').then(function (resp)
                    {
                        $scope.marches = resp.data;
                    }, function (err) {
                        console.log('ERR', err);
                    });
                };
            }]).controller('ModifierCtrl', ['$scope', '$stateParams', '$log', '$http', 'Villes', '$translate',
            function ($scope, $stateParams, $log, $http, Villes, $translate) {
                $scope.login = $stateParams.login;
                $scope.password = $stateParams.password;

                //recuperation des nom des Categories
                $http.get('/api' + '/categories').then(function (resp) {
                    $scope.categories = resp.data;
                }, function (err) {
                    console.log('ERR', err);
                });
                // la fonction qui permet de mettre a jour les produits
                $scope.produits = "";
                $scope.data = {"airlines": [], "search": ''};
                $scope.updateProduits = function (categorie) {
                    console.log('/api/categories/' + categorie.id + '/produits');
                    $http.get('/api/categories/' + categorie.id + '/produits').then(function (resp) {
                        $scope.produits = resp.data;
                        //console.log('Success', resp);
                    }, function (err) {
                        console.log('ERR', err);
                    });
                };
                //recuperation des nom des villes

                $scope.updateVilles = function (produit) {
                    $scope.search = function () {
                        Villes.searchVilles($scope.data.search, produit.id).then(
                                function (matches) {
                                    $scope.data.airlines = matches;
                                }
                        );
                    };
                };

                // cette fonction permet de mettre a jour le prix d un  produit
                $scope.element = {"nouveauPrix": '', "etatPrix": '', "produitId": '', "marcheId": ''};
                $scope.etats = ["Baisse", "Haute"];
                // la fonction qui met a jour le prix
                $scope.updatePrice = function (produit) {
                //
                $scope.element.marcheId = 1;
                //
                $scope.element.produitId = produit.id;
                //
                $scope.element.etatPrix = $scope.element.etatPrix;
                //
                $http.post('/api'+'/prix/', $scope.element).then(function (resp) {
                //$http.post('/api' + '/prix/' + $scope.element.etatPrix+'1/1', $scope.element).then(function (resp) {
                    $scope.success = "prix modifier";
                }, function (err) {
                    console.log('ERR', err);
                });
        };
    }]).controller("AutresprixCtrl", ['$scope', '$stateParams', '$log', '$http', function ($scope, $stateParams, $log, $http) {
        //le controleur qui gere les prix sur les autres marches
        console.log('api ' + $stateParams.idProduit + '/prix/ ' + $stateParams.idVille);
        if (typeof ($stateParams.idProduit) !== 'undefined') {
            idVille = $stateParams.idVille;
            $http.get('/api'+'/prix/' + $stateParams.idProduit + '/' + idVille + '/compare').then(function (resp) {
                $scope.prixProduits = resp.data;
            }, function (err) {
                console.log('ERR', err);
            });
        }
    }]).controller("ActualitesCtrl", ['$scope', '$log',
     function ($scope, $log) {
        //ici on gere comment organiser les
        $scope.data = {supprimer:false, montre: false };
        $scope.moveItem = function (item, $fromIndex, $toIndex) {
            // body...
        }
        $scope.doRefresh = function (item, $fromIndex, $toIndex) {
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.loadMore = function function_name (argument) {
            // body...
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    }]).controller("LineCtrl", ['$scope', '$timeout', '$http', '$stateParams', function ($scope, $timeout, $http,$stateParams) {
        var prixProds = [];
        var tab = [];
        $scope.prixprod = [];
        $scope.dateprod = [];
        // recuperons les caracteristique du produit
        if (typeof ($stateParams.produitId) !== 'undefined') {
                $http.get('api/produits/' + $stateParams.produitId).then(function (resp) {
                    $scope.produitSelected = resp.data;
                }, function (err) {
                    console.log('ERR', err);
                });
        }
        // tracage de la courbe d'evolution des prix des produits
        $http.get('/api'+'/prix/'+$stateParams.produitId+'/'+$stateParams.marcheId+'/0/5').then(function (resp) {
            prixProds = resp.data;
            prixProds.forEach(
                    function (y) {
                        $scope.prixprod.push(y['prix']);
                        tab.push(y['prix']);
                        $scope.dateprod.push(y['datePrix'].substring(0, y['datePrix'].indexOf('T')));
                    }
            );
            $scope.seriesprod = ['Prix / Date Modification'];

            $scope.prixprod[0] = tab;
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            // Simulate async data update
            $timeout(function () {
                $scope.prixprod[0] = tab;
            }, 3000);
        }, function (err) {
            console.log('ERR', err);
        });
    }]).controller('MarkerRemoveCtrl', function ($scope, $ionicLoading, $http, $stateParams) {

    $http.get('api/marches/' + $stateParams.idmarche).then(function (resp) {
        $scope.marche = resp.data;
    }, function (err) {
        console.log('ERR', err);
    });

    $scope.positions = [{
            lat: 4.0473831,
            lng: 9.6951812
        }];

    $scope.$on('mapInitialized', function (event, map) {
        $scope.map = map;
    });

    $scope.centerOnMe = function () {
        $scope.positions = [];
        $ionicLoading.show();
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.positions.push({lat: pos.k, lng: pos.B});
            console.log(pos);
            $scope.map.setCenter(pos);
            $ionicLoading.hide();
        });

    };

});
