app.directive('cheatSheet', ["$rootScope",function($rootScope) {

  return {
    restrict: 'E',

    template: '<div ng-include="cheatSheetUrl"></div>',

    link: function(scope) {
      scope.cheatSheetUrl = 'docs/' + $rootScope.version + '/cheat-sheet.html';
    }
  };
}]);
