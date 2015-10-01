
var airlines = [];
airlines = airlines.sort(function (a, b)
{
    var airlineA = a.nom.toLowerCase();
    var airlineB = b.nom.toLowerCase();
    if (airlineA > airlineB)
        return 1;
    if (airlineA < airlineB)
        return -1;
    return 0;
});
angular.module('starter.services', []).factory('Villes', function ($q, $timeout, $http) {

    var searchVilles = function (searchFilter, idProduit)
    {
        var deferred = $q.defer();

        console.log('/api/produits/' + idProduit + '/villes');

        $http.get('/api/produits/' + idProduit + '/villes').then(function (resp)
        {
            airlines = resp.data;
        }, function (err) {
            console.log('ERR', err);
        });
        var matches = airlines.filter(function (airline)
        {
            if (airline.nom.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1)
                return true;
        })
        $timeout(function ()
        {
            deferred.resolve(matches);
        }, 100);

        return deferred.promise;
    };

    return {
        searchVilles: searchVilles

    }
}).factory('Prix', function ($q, $timeout, $http) {

    return {
        getProduit: function (idProduit) {
            return $http.get('api/produits/' + idProduit);
        },
        get: function (idmarche, idproduit) {
            return $http.get('/api/prix/' + idproduit + '/' + idmarche);
        }
    }
});
