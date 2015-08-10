var airlines = [
                  {"fs":"LCI","iata":"LF","icao":"LCI","nom":"Maroua ","active":true},
                  {"fs":"TGU","iata":"5U","icao":"TGU","nom":"Yaounde","active":true},
                  {"fs":"BT","iata":"BT","icao":"BTI","nom":"Doula","active":true},
                  {"fs":"9J","iata":"9J","icao":"DAN","nom":"Yagoua","active":true},
                  {"fs":"2O","iata":"2O","icao":"RNE","nom":"Abong-bang","active":true},
                  {"fs":"NPT","icao":"NPT","nom":"Bouda","active":true},
                  {"fs":"C8","iata":"C8","icao":"ICV","nom":"Dschang","active":true},
                  {"fs":"FK","iata":"FK","icao":"WTA","nom":"Ngaoundere","active":true},
                  {"fs":"8K","iata":"8K","icao":"EVS","nom":"Garoua","active":true},
                  {"fs":"W8","iata":"W8","icao":"CJT","nom":"Bafang","active":true},
                  {"fs":"JBW","iata":"3J","icao":"JBW","nom":"Bua ","active":true},
                  {"fs":"TNU","iata":"M8","icao":"TNU","nom":"Bamenda","active":true},
                  {"fs":"HCC","iata":"HC","icao":"HCC","nom":"Ebolowa","active":true},
                  {"fs":"APJ","iata":"MM","icao":"APJ","nom":"Bertoua","active":true},
                  {"fs":"TUY","iata":"L4","icao":"TUY","nom":"Obala","active":true},
                  {"fs":"LAE","iata":"L7","icao":"LAE","nom":"Bagangthe","active":true},
                  {"fs":"L5*","iata":"L5","icao":"LTR","nom":"Fouban","active":true},
                  {"fs":"QA","iata":"QA","icao":"CIM","nom":"Loum","active":true},
                  {"fs":"KBZ","iata":"K7","icao":"KBZ","nom":"Mandjo","active":true},
                  {"fs":"L2","iata":"L2","icao":"LYC","nom":"Bafoussam","active":true},
                  {"fs":"MPK","iata":"I6","icao":"MPK","nom":"Badjoun","active":true},
                  {"fs":"CAO","icao":"CAO","nom":"Edea ","active":true},
                  {"fs":"BEK","iata":"Z9","icao":"BEK","nom":"Kousseri","active":true},
                  {"fs":"IAE","iata":"IO","icao":"IAE","nom":"Mokolo","active":true},
                  {"fs":"GL*","iata":"GL","nom":"Baham","active":true},
                  {"fs":"ATN","iata":"8C","icao":"ATN","nom":"Nkongsamba","active":true},
                  {"fs":"GU","iata":"GU","icao":"GUG","nom":"Batie","active":true},
                  {"fs":"GHY","icao":"GHY","nom":"Ayos ","active":true}
              ];

airlines = airlines.sort(function(a, b) {

  var airlineA = a.nom.toLowerCase();
  var airlineB = b.nom.toLowerCase();

  if(airlineA > airlineB) return 1;
  if(airlineA < airlineB) return -1;
  return 0;
});

//console.log(airlines);

angular.module('starter.services', []).factory('Villes', function() {
  var villes = [
      {id: 1, nom: 'Maroua', marches: { id:1 , nom: 'Centrale', id:2, nom: 'Abotoire' , id:3, nom: 'Artisanal' } },
      {id: 1, nom: 'Maroua', marches: { id:1 , nom: 'Centrale', id:2, nom: 'Abotoire' , id:3, nom: 'Artisanal' } },
      {id: 1, nom: 'Maroua', marches: { id:1 , nom: 'Centrale', id:2, nom: 'Abotoire' , id:3, nom: 'Artisanal' } },
      {id: 1, nom: 'Maroua', marches: { id:1 , nom: 'Centrale', id:2, nom: 'Abotoire' , id:3, nom: 'Artisanal' } },
      {id: 1, nom: 'Maroua', marches: { id:1 , nom: 'Centrale', id:2, nom: 'Abotoire' , id:3, nom: 'Artisanal' } },
      {id: 1, nom: 'Maroua', marches: { id:1 , nom: 'Centrale', id:2, nom: 'Abotoire' , id:3, nom: 'Artisanal' } },
      {id: 1, nom: 'Maroua', marches: { id:1 , nom: 'Centrale', id:2, nom: 'Abotoire' , id:3, nom: 'Artisanal' } }
    ];

  return {
    all: function() {
      return villes;
    },
    get: function(villeId) {
      for (var i = 0; i < villes.length; i++) {
        if (villes[i].id === parseInt(villeId)) {
          return villes[i].marches;
        }
      }
      return null;
    }
  };
}).factory('Test', function ($resource) {
      return $resource("http://localhost:8080/agroBackend//api/villes/:id", {
          id: '@id'
      }, {
          update: {
              method: 'PUT'
          }
      });
}).factory('Categories', function() {
  var Categories = [
      {id: 1, nom: 'Cereales', produits:{id:1, nom: 'Mais' , id:2, nom: 'Mil' , id:3, nom: 'Arachide' } },
      {id: 2, nom: 'Fruits', produits:{id:4, nom: 'Mangue', id:5, nom: 'Avocat', id:6, nom: 'Papaye'  } },
      {id: 3, nom: 'Legumes', produits:{id:7, nom: 'Ndole', id:8, nom: 'Legume' , id:9, nom: 'Biyoule'  } },
      {id: 4, nom: 'Tubercules', produits:{id:10, nom: 'Macabo', id:11, nom: 'Patate' , id:12, nom: 'Manioc'  } },
      {id: 5, nom: 'Feuilles verts', produits:{id:13, nom: 'Poirot', id:14, nom: 'Percil', id:15, nom: 'Celerie' } },
      {id: 6, nom: 'Condiments Secs', produits:{id:17, nom: 'Ail', id:18, nom: 'Poivre Blanc', id:19, nom: 'Artisanal' } }
    ];

  return {
    all: function() {
      return Categories;
    },
    get: function(CategoriesId) {
      for (var i = 0; i < Categories.length; i++) {
        if (Categories.id == parseInt(CategoriesId)) {
          return Categories.produits;
        }
      }
      return null;
    }
  };
}).factory('Categorie', function ($resource) {
    return $resource("/api/Categories/:id", {
          id: '@id'
      }, {
          update: {
            method: 'PUT'
        }
    })
}).factory('FlightDataService', function($q, $timeout) {

    var searchAirlines = function(searchFilter) {
         
        console.log('Searching airlines for ' + searchFilter);

        var deferred = $q.defer();

      var matches = airlines.filter( function(airline) {
        if(airline.nom.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
      })

        $timeout( function(){
        
           deferred.resolve( matches );

        }, 100);

        return deferred.promise;

    };

    return {

        searchAirlines : searchAirlines

    }
}); 
