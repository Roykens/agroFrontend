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
                    if (vefified.reponse === 'succes'){
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

            //console.log($stateParams.idProduit+'je suis la'+$stateParams.idmarche);
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
        .controller('PlaylistCtrl', ['$scope', '$stateParams', '$log', '$http', '$translate','Villes',
            function ($scope, $stateParams, $log, $http, $translate, Villes) {

                $scope.ChangeLanguage = function (lang) {
                    $translate.use(lang);
                };

                //recuperation des nom des Categories
                $http.get('/api/categories').then(function (resp) {
                    $scope.categories = resp.data;
                    //console.log('Success', resp);
                }, function (err) {
                    console.log('ERR', err);
                });

                // la fonction qui permet de mettre a jour les produits en fonction des categories
                $scope.produits = "";
                $scope.data = {"airlines": [], "search": ''};
                $scope.montrelist = true;


                $scope.updateProduits = function (categorie) {
                    console.log('/api/categories/' + categorie.id + '/produits');
                    $http.get('/api/categories/' + categorie.id + '/produits').then(function (resp) {
                        $scope.produits = resp.data;
                        //console.log('Success', resp);
                    }, function (err) {
                        console.log('ERR', err);
                    });
                };

                //recuperation des nom des villes ayant un produit

                $scope.updateVilles = function (produit)
                {
                    //
                    $http.get('/api/produits/' + produit.id + '/villes').then(function (resp){
                        $scope.data.airlines = resp.data;
                    }, function (err) {
                        console.log('ERR', err);
                    });
            //
                    //

                    $scope.search = function () {
                        $scope.montrelist = true;
                        /*Villes.searchVilles($scope.data.search, produit.id).then(
                                function (matches) {
                                    $scope.data.airlines = matches;
                                }
                        );*/
                    };
                };
                // si selection une ville une ville
                $scope.selectName = function (ville, produit) {
                    $scope.data.search = ville.nom;
                    $scope.idVille = ville.id;
                    $scope.montrelist = false;
                    //$scope.data.airlines = "";
                    console.log('/api/marches/' + produit.id + '/' + ville.id + '/marches');

                    //  mettre a jour les marches
                    $http.get('/api/marches/' + produit.id + '/' + ville.id + '/marches').then(function (resp)
                    {
                        $scope.marches = resp.data;
                        console.log('Success', resp);
                    }, function (err) {
                        console.log('ERR', err);
                    });
                };

                $scope.currentDate = new Date();
                $scope.debut = new Date();
                $scope.title = "Custom Title";

                $scope.datePickerCallback = function (val) {
                    if (typeof (val) === 'undefined') {
                        console.log('Date not selected');
                    } else {
                        console.log('Selected date is : ', val);
                    }
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

        $scope.updateVilles = function (produit){
            $scope.search = function () {
                Villes.searchVilles($scope.data.search, produit.id).then(
                        function (matches) {
                            $scope.data.airlines = matches;
                        }
                );
            };
        };

        // cettefonction permet de mettre a jour le prix d un  produit
        $scope.element = {"prix": '', "datePrix": '', "etatPrix": '', "produit": [], "marche": []};
        $scope.etats = ["Baisse", "Haute"];
        //la date de la mise a jour
        $scope.element.datePrix = new Date();
        $scope.datePickerCallback = function (val) {
                if (typeof (val) === 'undefined') {
                    console.log('Date not selected');
                } else {
                    console.log('Selected date is : ', val);
                    $scope.element.datePrix = val;
                }
            };
            // la fonction qui met a jour le prix
        $scope.updatePrice = function (produit){
            //
            $scope.element.marche = {"agents":[{"version":1,"id":52,"nom":"15166","login":"adrien","password":"adrien12","phone":"5616511111156","mail":"mongang12@gmail.com","adresse":"douala","roleType":"AGENT"}],"version":1,"id":6,"nom":"Mokolo","longitude":11.5004164,"latitude":3.87467,"dateCreation":"2015-08-19T00:00:00+01:00","description":"marhe de yaounde","ville":{"version":1,"id":5,"nom":"Yaounde"}};
            //
            $scope.element.produit = {"version":1,"id":1,"nom":"riz niema","conditionnement":"kg","info":"riz pafume","categorie":{"version":1,"id":1,"nom":"Cereales"}};
            //
            $scope.element.etatPrix= "Baisse";
            console.log('la mise a jour du prix');
            $http.post('/api'+'/prix/'+$scope.element.etatPrix, $scope.element).then(function (resp) {
                $scope.success = "prix modifier";
            }, function (err) {
                console.log('ERR', err);
            });;
        };
    }]).controller("AutresprixCtrl", ['$scope', '$stateParams', '$log', '$http', function ($scope, $stateParams, $log, $http) {
        
        //le controleur qui gere les prix sur les autres marches
        console.log('api '+$stateParams.idProduit+'/prix/ '+$stateParams.idVille);
        if (typeof ($stateParams.idProduit) !== 'undefined') {
            idVille = $stateParams.idVille;
            $http.get('/api' + '/prix/'+$stateParams.idProduit+'/'+idVille+'/compare').then(function (resp) {
                $scope.prixProduits = resp.data;
            }, function (err) {
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
