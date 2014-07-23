'use strict';

angular.module('starter')
.service('maps', function ($rootScope,$stateParams, MapOptions) {
  // Global variable self, return map object 
  var self = this;

  // Create a Google Maps object, but don't attach it to any visible element on the page. This
  // object will only be used for calculating directions or similar, not for displaying a map to
  // the user.
  this.map = new google.maps.Map(document.createElement('div'), MapOptions);
  this.directionsService = new google.maps.DirectionsService();

  this.directions = {};

  /**
   * Get directions between two points from the Google Maps API.
   * 
   * @param {string} origin The start location from which to calculate directions
   * @param {string} destination The end location to which to calculate directions
   */
   this.getDirections = function(origin , destination) {
    var mod = 'DRIVING';
    if($stateParams.travelID == 0){
      mod = 'DRIVING';
    }
    if($stateParams.travelID == 1){
      mod = 'WALKING';
    }

    var request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode[mod]
    };

    this.directionsService.route(request, function(result, status) {
       if (status == google.maps.DirectionsStatus.OK) {
          self.directions = result;
          // Sharing data between service and directive
          $rootScope.$broadcast('maps.directions');
        }
    });
  };

  // Set markers on map
  // If id equals -1 set only one shop marker
  // else set all shop markers
  // '$rootScope.$broadcast' send data to directive
  this.setMarkers = function(id,coords,marker){
     var myLocation = {
       latitude: coords.latitude,
       longitude: coords.longitude,
       succeed: coords.succeed
     }

     var send = {};

     if(id > -1 ){
      if(id == 0){
        send = wamaps;
      }

      if(id == 1){
        send = ormaps;
      }
      if(id == 2){
        send = clothesShop;
      }

     }else{
        send = marker;
        // Send one marker to directive if we choose
        // only one shop to show on map
        $rootScope.$broadcast('one',send);
     }
     // Send my location to directive
     $rootScope.$broadcast('loc',myLocation);
     // Send all shops locations to directive
     $rootScope.$broadcast('all',send);
  }

    // return details for selected group of shops
    this.getDetiles = function(id){
      if(id == 0){
        return wamaps;
      }
      if(id == 1){
        return ormaps;
      }
      if(id == 2){
        return clothesShop;
      }
    }
      // Some fake testing data
      var ormaps = [
      {
        id:1,
        name: 'Clackamas river Steelhead' ,
        address: 'OR' ,
        time: '06-02',
        tel: '011/3235297',
        lat: 45.352880890582654,
        lang: -122.48419765
      },

      {
        id:2,
        name: 'Nehalem Bay Salmon' ,
        address: 'OR',
        time: '00-24',
        tel: '011/ 334 9960',
        lat: 45.689498447985635,
        lang: -123.92122795239254
      },

      {

        id:3,
        name: 'Siletz River Steelhead',
        address: 'OR',
        time: '00-24',
        tel: '066/411411',
        lat: 44.72040884993897,
        lang:  -123.91810494999999
      }

      ]

      var wamaps = [
      {
        id: 1,
        name: 'Brewster Pool Summer Kings',
        type: 'Salmon',
        address: 'Brewster, WA',
        tel: '360-123-1234',
        lat: 48.1018556230261,
        lang: -119.77935704999999
      },
      {
        id:2,
        name:'Forks Salmon',
        type: '' ,
        address: 'Forks, WA' ,
        time: ' 1000 ' ,
        tel: ' 360-123-1234' ,
        lat: 48.26396129419168, 
        lang: -124.30112405 
      },
      {
        id:3,
        name:'Sekiu Chinook',
        type: '(Salmon Fishing)' ,
        address: 'Sekiu, WA' ,
        //time: ' 09-22 ' ,
        //tel: ' 011/2627934' ,
        lat: 47.97243732243014, 
        lang: -124.37560052380371

      },
      {
        id:4,
        name:'Solduc River Steelhead',
        type: '' ,
        address: 'WA' ,
        time: ' 0900 ' ,
        tel: '111' ,
        lat: 48.26396129419168 ,
        lang: -124.30112405
      },
       {
        id:5,
        name:'Humptulips River Coho',
        type: '' ,
        address: 'WA' ,
        time: ' 0900 ' ,
        tel: '111' ,
        lat: 47.072032091814386 ,
        lang: -124.04045079999997
      }
      ]

      var clothesShop = [
      {
        id:1,
        name: 'Zara',
        address: 'Knez Mihailova 5',
        time: '10-22',
        tel: '011/2023400',
        lat: 44.815882,
        lang: 20.4592081
      },
      {
        id:2,
        name: 'Alexandar 13',
        address: 'Terazije 14',
        time: '09-20',
        tel: '011/3069782',
        lat: 44.8126192,
        lang: 20.4613334
      },
      {
        id:3,
        name: 'Mango',
        address: 'Knez Mihailova 8',
        time: '09-21',
        tel:'011/303 2350',
        lat: 44.815883,
        lang: 20.4592081
      }
      ]

      return this;
    });
