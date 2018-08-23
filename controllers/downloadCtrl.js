resumeApp.controller('downloadCtrl', function($scope, $location, $log, $mdToast) {
  var downloadList = this;
  downloadList.elem = [];
  downloadList.skill = [];

  $scope.resumeSelection = 'Resume1';

  downloadList.noContent = '';
  var i = 0;

  if(localStorage.getItem('basicInfoObject')!==null){
    var retrievedObject = localStorage.getItem('basicInfoObject');
    var basicInfoObject =  JSON.parse(retrievedObject);

    downloadList.fullname = basicInfoObject.fullname;
    downloadList.email = basicInfoObject.email;
    downloadList.phonenumber = basicInfoObject.phonenumber;
    downloadList.website = basicInfoObject.website;

    if(basicInfoObject.fullname=='')
      i++;
  }else{
    i++;
  }

  if(localStorage.getItem('biographyObject')!==null){
    var retrievedObject = localStorage.getItem('biographyObject');
    var biographyObject =  JSON.parse(retrievedObject);
    downloadList.summary = biographyObject.biography;

    if(biographyObject.biography=='')
      i++;
  }else{
    i++;
  }

  if(localStorage.getItem('addExperienceObject')!==null){
    var retrievedObject = localStorage.getItem('addExperienceObject');
    downloadList.elem = JSON.parse(retrievedObject);

    if(JSON.parse(retrievedObject).length==0)
      i++;
  }else{
    i++;
  }

  if(localStorage.getItem('addProjectObject')!==null){
    var retrievedObject = localStorage.getItem('addProjectObject');
    downloadList.projects = JSON.parse(retrievedObject);

    if(JSON.parse(retrievedObject).length==0)
      i++;
  }else{
    i++;
  }

  if(localStorage.getItem('addSkillsObject')!==null){
    var retrievedObject = localStorage.getItem('addSkillsObject');
    downloadList.skill = JSON.parse(retrievedObject);

    if(JSON.parse(retrievedObject).length==0)
      i++;
  }else{
    i++;
  }

  if(localStorage.getItem('addEducationObject')!==null){
    var retrievedObject = localStorage.getItem('addEducationObject');
    downloadList.education = JSON.parse(retrievedObject);

    if(JSON.parse(retrievedObject).length==0)
      i++;
  }else{
    i++;
  }

  downloadList.noContent = i;

  $scope.printThis = function(resumeSelection) {
      if(resumeSelection=='Resume1'){
        $('#resume_1').printThis();
      }else if(resumeSelection=='Resume2'){
        $('#resume_2').printThis();
      }else if(resumeSelection=='Resume3'){
        $('#resume_3').printThis();
      }
    };

  $scope.linespacing = 35;
  let linespacing = $scope.linespacing/35;
  $('.cv1').css('line-height', linespacing+'em');
  $scope.changeLinespacing = function() {
    //console.log($scope.linespacing);
    let linespacing = $scope.linespacing/35;
    $('.cv1').css('line-height', linespacing+'em');
  }
});
