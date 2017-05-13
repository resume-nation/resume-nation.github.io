//Angular Service to provide Toast across all controller
resumeApp.service('toastService', function ($mdToast) {
  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  var toastPosition = angular.extend({},last);

  this.getToastPosition = function() {
    sanitizePosition();

    return Object.keys(toastPosition)
      .filter(function(pos) { return toastPosition[pos]; })
      .join(' ');
  };

  this.showSimpleToast = function() {
    var pinTo = this.getToastPosition();

    /*$mdToast.show(
      $mdToast.simple()
        .textContent('Saved.')
        .position(pinTo )
        .hideDelay(3000)
    );*/

    $mdToast.show({
          hideDelay   : 2000,
          position    : 'top right',
          templateUrl : 'partials/toast-template.html'
        });
  };

  function sanitizePosition() {
    var current = toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }
});
