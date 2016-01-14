'use strict';

define([
  './module'
], function (module) {

  module.controller('MapCtrl', MapCtrl);

  function MapCtrl() {
    var me = this;

    me.conf = {
      id: 'gatling-map',
      tileServer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      poiServer: '',
      mapBounds: [
        [
          85,
          -180
        ],
        [
          -65,
          180
        ]
      ],
      widgetConf: {
        panelPosition: 'left'
      },
      minZoom: 3,
      maxZoom: 18,
      initialZoom: 3,
      initialLocation: [
        40.734538,
        -73.9776211
      ],
      fitBounds: [
        [
          48.905599980514666,
          2.22747802734375
        ],
        [
          48.7790182843748,
          2.459564208984375
        ]
      ],
      clusterMaxLevel: 19
    };
  }
});
