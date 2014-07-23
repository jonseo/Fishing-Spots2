angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Shops', function($http, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var shops = [
    { id: 0, name: 'WA Fish Spots', icon: 'ion-map' },
    { id: 1, name: 'OR Fish Spots',icon: 'ion-map' },
    { id: 2, name: 'Gears', icon: 'ion-loading-b' }
  ];

  return {
    all: function() {
      return shops;
    },
    get: function(shopId) {
      // Simple index lookup
      return shops[shopId];
    }
  }
})

.factory('Geo', function($q) {
  return {
    getLocation: function() {
      var q = $q.defer();

      navigator.geolocation.getCurrentPosition(function(position) {
        q.resolve(position);
      }, function(error) {
        q.reject(error);
      });

      return q.promise;
    }
  };
});

