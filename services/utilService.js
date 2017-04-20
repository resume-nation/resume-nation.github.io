/*
Angular Service to provide common utility functions
across all controller
*/
resumeApp.service('utilService', function(){
  this.guid = function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
});
