resumeApp.controller('tabCtrl', function($scope, toastService, utilService, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function(current, old) {
        switch (current) {
            case 0:
                $location.url("/home");
                break;
            case 1:
                $location.url("/summary");
                break;
            case 2:
                $location.url("/basicinfo");
                break;
            case 3:
                $location.url("/experiences");
                break;
            case 4:
                $location.url("/projects");
                break;
            case 5:
                $location.url("/education");
                break;
            case 6:
                $location.url("/skills");
                break;
            case 7:
                $location.url("/download");
                break;
        }
    });

    // For maintaing tab state while routing
    $scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
      var currentState = toState.name;

      if(currentState=='view1'){
        $scope.selectedIndex = 0;
      }else if(currentState=='view2'){
        $scope.selectedIndex = 1;
      }else if(currentState=='view3'){
        $scope.selectedIndex = 2;
      }else if(currentState=='view4'){
        $scope.selectedIndex = 3;
      }else if(currentState=='view5'){
        $scope.selectedIndex = 4;
      }else if(currentState=='view6'){
        $scope.selectedIndex = 5;
      }else if(currentState=='view7'){
        $scope.selectedIndex = 6;
      }else if(currentState=='view8'){
        $scope.selectedIndex = 7;
      }
    });

    if(localStorage.getItem('basicInfoObject')!==null){
      var retrievedObject = localStorage.getItem('basicInfoObject');
      var basicInfoObject =  JSON.parse(retrievedObject);

      $scope.fullname = basicInfoObject.fullname;
      $scope.email = basicInfoObject.email;
      $scope.phonenumber = basicInfoObject.phonenumber;
      $scope.website = basicInfoObject.website;
    }

    if(localStorage.getItem('biographyObject')!==null){
      var retrievedObject = localStorage.getItem('biographyObject');
      var biographyObject =  JSON.parse(retrievedObject);

      $scope.biography = biographyObject.biography;
    }

    $scope.saveBasicInfo = function() {
      var fullname = this.fullname || '';
      var email = this.email || '';
      var phonenumber = this.phonenumber || '';
      var website = this.website || '';

      var basicInfoObject = { 'fullname': fullname, 'email': email, 'phonenumber': phonenumber, 'website': website };

      // Put the object into storage
      localStorage.setItem('basicInfoObject', JSON.stringify(basicInfoObject));

      $scope.fullname = fullname;
      $scope.email = email;
      $scope.phonenumber = phonenumber;
      $scope.website = website;

      toastService.showSimpleToast();
    }

    $scope.saveSummery = function(){
      var biography = this.biography || '';

      var biographyObject = {'biography': biography};

      localStorage.setItem('biographyObject', JSON.stringify(biographyObject));

      $scope.biography = this.biography;

      toastService.showSimpleToast();
    }

    this.topDirections = 'left';
    this.bottomDirections = 'down';

    this.isOpen = false;
    this.selectedMode = 'md-scale';
    this.selectedDirection = 'up';
})
