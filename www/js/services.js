angular.module('starter.services', [])

.factory('Regions', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var regions = [{
    id: 1,
    name: 'Adamoua'
  }, {
    id: 2,
    name: 'Centre'
  },{
    id: 3,
    name: 'Est'
  }, {
    id: 4,
    name: 'Extreme Nord'
  }, {
    id: 5,
    name: 'Littoral'
  }, {
    id: 6,
    name: 'Nord'
  },{
    id: 7,
    name: 'Nord Ouest'
  }, {
    id: 8,
    name: 'Ouest'
  }, {
    id: 9,
    name: 'Sud'
  }, {
    id: 10,
    name: 'Sud Ouest'
  }
];

  return {
    all: function() {
      return regions;
    },
    get: function(chatId) {
      for (var i = 0; i < regions.length; i++) {
        if (regions[i].id === parseInt(chatId)) {
          return regions[i];
        }
      }
      return null;
    }
  };
});
