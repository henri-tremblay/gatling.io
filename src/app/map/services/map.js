/**
 * Copyright (C) 2000-2016 eBusiness Information
 *
 * This file is part of MapSquare Widgets.
 *
 * MapSquare Widgets is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MapSquare Widgets is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MapSquare Widgets.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by Anthony Salembier and Jason Conard.
 */
'use strict';

define([
  'angular',
  './module',
  'leaflet',
  'lodash',
  'leaflet.markercluster'
], function (angular, module, L, _) {

  module.factory('MapService', MapService);

  MapService.$inject = ['$http', '$log', '$q', 'Constants'];

  function MapService($http, $log, $q, Constants) {

    var parent = {
      widget: {}
    };

    function init(map, config, widgets) {

      var sizes = {
        small: [32, 40],
        medium: [48, 60],
        large: [64, 80]
      };

      config.mapBounds = config.mapBounds || [[85, -180], [-65, 180]];
      config.tileServer = config.tileServer || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      config.widgetConf = config.widgetConf || {};
      config.widgetConf.panelPosition = config.widgetConf.panelPosition || 'left';
      config.widgetConf.logoByType = _.valueOrElse(config.widgetConf.logoByType, false);
      config.widgetConf.clickMarker = _.valueOrElse(config.widgetConf.clickMarker, false);
      config.widgetConf.osmSearch = _.valueOrElse(config.widgetConf.osmSearch, false);
      config.widgetConf.minZoom = config.widgetConf.minZoom || 3;
      config.widgetConf.maxZoom = config.widgetConf.maxZoom || 18;
      config.widgetConf.initialZoom = config.widgetConf.initialZoom || 3;
      config.widgetConf.initialLocation = config.widgetConf.initialLocation || [0, 0];
      config.clusterMaxLevel = config.clusterMaxLevel || 18;

      var manager = {
        widgets: widgets
      };

      var display = 'classic';
      var parentDisplay = getComputedStyle(map.parentNode).display;
      if (parentDisplay.indexOf('flex') >= 0) {
        display = 'flexible';
      }

      map.setAttribute('class', 'map-container ' + display);

      manager.rootElement = map;

      var content = document.createElement('div');
      content.setAttribute('class', 'map-content ' + display);

      var element = document.createElement('div');
      element.setAttribute('id', config.id + '-map');
      element.setAttribute('class', 'map-view ' + display);

      content.appendChild(element);
      map.appendChild(content);

      manager.conf = config;

      // Add "maxBounds : mapConfig.mapBounds", on the options of map if you want to prohibit drawing the map outside the bounds.
      manager.map = L.map(config.id + '-map', {
        maxZoom: config.maxZoom,
        minZoom: config.minZoom,
        zoomControl: false
      });
      L.tileLayer(config.tileServer, {
        attribution: '<a href="http://openstreetmap.fr/" target="_blank">OpenStreetMap</a> | <a href="http://mapsquare.io/" target="_blank">mapsquare</a>'
      }).addTo(manager.map);

      var markerClusterGroup = new L.MarkerClusterGroup({disableClusteringAtZoom: config.clusterMaxLevel});
      manager.map.markerGroup = markerClusterGroup;
      manager.map.addLayer(markerClusterGroup);

      new L.Control.Zoom({position: 'topright'}).addTo(manager.map);

      if (config.fitBounds) {
        manager.map.fitBounds(config.fitBounds);
      } else {
        manager.map.setView(config.initialLocation, config.initialZoom);
      }

      manager.getType = function (point) {
        for (var i = 0; i < manager.conf.types.length; i++) {
          var currentType = manager.conf.types[i];
          if (point.typeId === currentType.id) {
            return currentType;
          }
        }
        return null;
      };

      config.points = [];
      config.types = [];
      config.tracks = [];
      config.areas = [];

      manager.traces = L.layerGroup([]);
      manager.areas = L.layerGroup([]);
      manager.map.addLayer(manager.traces);
      manager.map.addLayer(manager.areas);

      var refreshButton = document.createElement('div');
      refreshButton.className = 'map-refresh';
      refreshButton.innerHTML = '<i class="fa fa-undo"></i>';
      map.appendChild(refreshButton);

      refreshButton.addEventListener('click', function () {
        if (config.fitBounds) {
          manager.map.fitBounds(config.fitBounds);
        } else {
          manager.map.setView(config.initialLocation, config.initialZoom);
        }
      });

      var initWidgets = function () {
        manager.conf.tracks.forEach(function (t) {
          var track;
          var latLngs = [];
          t.latLngList.forEach(function (latLng) {
            latLngs.push(L.latLng(latLng.lat, latLng.lng))
          });

          var options = {
            color: t.strokeOptions.strokeColor,
            weight: t.strokeOptions.strokeWeight,
            opacity: t.strokeOptions.strokeOpacity
          };

          track = L.polyline(latLngs, options);
          t.polyline = track;
          manager.traces.addLayer(track);
        });

        manager.conf.areas.forEach(function (p) {
          var polygon;
          var latLngs = [];
          p.latLngList.forEach(function (latLng) {
            latLngs.push(L.latLng(latLng.lat, latLng.lng))
          });

          var options = {};

          if (p.fillOptions) {
            options.fillColor = p.fillOptions.fillColor;
            options.fillOpacity = p.fillOptions.fillOpacity;
          } else {
            options.fill = false;
          }

          if (p.strokeOptions) {
            options.color = p.strokeOptions.strokeColor;
            options.weight = p.strokeOptions.strokeWeight;
            options.opacity = p.strokeOptions.strokeOpacity;
          } else {
            options.stroke = false;
          }

          polygon = L.polygon(latLngs, options);
          p.polygon = polygon;
          manager.areas.addLayer(polygon);
        });

        config.points = config.points.filter(function (point) {
          point.typeItem = manager.getType(point);
          point.typeItem.enable = true;
          return point.typeItem;
        });

        config.points.forEach(function (point) {

          point.iconUrl = Constants.Prefixes.Images + point.typeItem.icon;

          var currentMarker = null;
          var anchorX = point.typeItem.anchorX;
          var anchorY = point.typeItem.anchorY;
          var popupAnchorX = -anchorX + ( sizes[point.typeItem.markerSize][0] / 2 );
          var popupAnchorY = -anchorY;
          var iconSize = [40, 48];

          var icon = L.icon({
            iconUrl: point.iconUrl,
            iconSize: iconSize,
            iconAnchor: [anchorX, anchorY],
            popupAnchor: [popupAnchorX, popupAnchorY]
          });
          currentMarker = L.marker([point.latLng.lat, point.latLng.lng], {icon: icon});

          point.marker = currentMarker;
          point.enable = true;
          manager.map.markerGroup.addLayer(currentMarker);

          var itemNameStr = '<h4>' + point.name + '</h4>';
          if (!config.widgetConf.clickMarker) {
            currentMarker.bindPopup(itemNameStr).openPopup();
            currentMarker.closePopup();

            currentMarker.on('click', function () {
            });

            // Leaflet bug, simple click isn't triggered and dbclick is triggered as a simple one.
            currentMarker.on('dbclick', function () {
              currentMarker.togglePopup();
            });
          }
        });

        manager.utils = {
          addClass: function (elem, clazz) {
            if (elem.className.indexOf(clazz) < 0) {
              if (elem.className.length !== 0) {
                elem.className += ' ';
              }
              elem.className += clazz;
            }
          },
          removeClass: function (elem, clazz) {
            elem.className = elem.className.replace(' ' + clazz, '').replace(clazz + ' ', '').replace(clazz, '');
          },
          toggleClass: function (elem, clazz) {
            if (elem.className.indexOf(clazz) < 0) {
              this.addClass(elem, clazz);
            } else {
              this.removeClass(elem, clazz);
            }
          },
          hasClass: function (elem, clazz) {
            return (' ' + elem.className + ' ').indexOf(' ' + clazz + ' ') > -1;
          },
          contains: function (array, elem) {
            var found = false;
            for (var i = 0; i < array.length && !found; i++) {
              if (array[i] === elem) {
                found = true;
              }
            }
            return found;
          }
        };

        widgets.forEach(function (widgetName) {
          if (parent.widget[widgetName]) {
            parent.widget[widgetName](manager);
          } else {
            $log.error('The widget ' + widgetName + ' is not loaded or loaded after the init function.')
          }
        });
      };

      if (config.poiServer.length > 0) {
        $q.all([
          $http.get(config.poiServer + '/type'),
          $http.get(config.poiServer + '/poi'),
          $http.get(config.poiServer + '/track'),
          $http.get(config.poiServer + '/polygon'),
          $http.get(config.poiServer + '/layer/')
        ]).then(_.spread(function (types, points, tracks, polygons, layers) {
          manager.conf.types = types;
          manager.conf.points = points;
          manager.conf.tracks = tracks;
          manager.conf.areas = polygons;
          manager.conf.layers = layers;

          manager.conf.points.forEach(function (point) {
            point.latLngTable = [point.latLng.lat, point.latLng.lng];
          });
          // Filter types if there is no points available for any type.
          manager.conf.types = manager.conf.types.filter(function (type) {
            for (var i = 0; i < manager.conf.points.length; i++) {
              if (manager.conf.points[i].typeId === type.id) {
                return true;
              }
            }

            return false;
          });
        })).then(initWidgets);
      } else {
        manager.conf.traces = [];
        manager.conf.areas = [];
        manager.conf.layers = [];
        manager.conf.types = [
          {
            id: '5617b4d351d6bd45a8f6881f',
            name: 'Gatling Corp',
            icon: 'GatlingPOI.png',
            markerSize: 'large',
            anchorX: 20,
            anchorY: 48,
            fields: [
              'Address',
              'E-mail',
              'Phone'
            ]
          }
        ];
        manager.conf.points = [
          {
            id: '5617b5a151d6bd45a8f68820',
            latLng: {
              lat: 48.798602621890964,
              lng: 2.3261457681655884
            },
            name: 'Gatling Corp',
            level: 0,
            revision: 13,
            typeId: '5617b4d351d6bd45a8f6881f',
            lastUpdate: '2015-10-09T13:02:40.147Z',
            fields: {
              Address: '45-47 avenue Carnot - Cachan',
              Phone: '+33 (0) 1 41 24 43 29',
              'E-mail': 'contact@gatling.io'
            }
          }
        ];

        // Filter types if there is no points available for any type.
        manager.conf.types = manager.conf.types.filter(function (type) {
          for (var i = 0; i < manager.conf.points.length; i++) {
            if (manager.conf.points[i].typeId === type.id) {
              return true;
            }
          }
          return false;
        });

        initWidgets();
      }
    }

    return angular.extend(parent, {
      init: init
    });
  }
});
