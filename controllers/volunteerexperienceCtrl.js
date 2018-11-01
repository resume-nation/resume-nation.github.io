resumeApp.controller('volunteerexperienceCtrl', function($scope, toastService, utilService, $location, $log) {
  var volunteerexperienceList = this;
  volunteerexperienceList.experiences = [];

  volunteerexperienceList.btnSaveExperience = "Add";
  if(JSON.parse(localStorage.getItem('addVolunteerExperienceObject'))){
    var resolveAddVolunteerExperienceObject = JSON.parse(localStorage.getItem('addVolunteerExperienceObject'));
    for(var i = 0; i < resolveAddVolunteerExperienceObject.length; i++) {
        var obj = resolveAddVolunteerExperienceObject[i];

        volunteerexperienceList.experiences.push({id: obj.id, orgname: obj.orgname, time_period: obj.time_period, role_org: obj.role_org, desc: obj.desc});
        //console.log(obj.id);
    }
  }

  volunteerexperienceList.addExperience = function(){
    if(volunteerexperienceList.orgname==undefined
      ||volunteerexperienceList.time_period==undefined
      ||volunteerexperienceList.role_org==undefined
      ||volunteerexperienceList.desc==undefined
      ||volunteerexperienceList.orgname==''
      ||volunteerexperienceList.time_period==''
      ||volunteerexperienceList.role_org=='')
      return false;

    var vexpId = utilService.guid();
    if(volunteerexperienceList.id!=undefined && volunteerexperienceList.id!=''){
      var addVolunteerExperienceObject = JSON.parse(localStorage.getItem('addVolunteerExperienceObject'));
      for (i=0;i<addVolunteerExperienceObject.length;i++){
        if (addExperienceObject[i].id == volunteervolunteerexperienceList.id) {
          addExperienceObject[i].orgname = volunteerexperienceList.orgname;
          addExperienceObject[i].time_period = volunteerexperienceList.time_period;
          addExperienceObject[i].role_org = volunteerexperienceList.role_org;
          addExperienceObject[i].desc = volunteerexperienceList.desc;
        }
      }
      localStorage.setItem('addVolunteerExperienceObject', JSON.stringify(addVolunteerExperienceObject));

      // Update the selected Experience
      angular.forEach(volunteerexperienceList.experiences, function (p) {
        if (p.id == volunteerexperienceList.id) {
          p.orgname = volunteerexperienceList.orgname;
          p.time_period = volunteerexperienceList.time_period;
          p.role_org = volunteerexperienceList.role_org;
          p.desc = volunteerexperienceList.desc;
        }
      });
    }else{
      volunteerexperienceList.experiences.push({id:expId, orgname: volunteerexperienceList.orgname, time_period: volunteerexperienceList.time_period, role_org: volunteerexperienceList.role_org, desc: volunteerexperienceList.desc});

      var addVolunteerExperienceObject = JSON.parse(localStorage.getItem('addVolunteerExperienceObject')) || [];
      var addVolunteerExperienceNewItem = {'id': vexpId, 'orgname': volunteerexperienceList.orgname, 'time_period': volunteerexperienceList.time_period, 'role_org': volunteerexperienceList.role_org, 'desc': volunteerexperienceList.desc};

      addExperienceObject.push(addVolunteerExperienceNewItem);
      localStorage.setItem('addVolunteerExperienceObject', JSON.stringify(addVolunteerExperienceObject));
    }
    volunteerexperienceList.orgname = '';
    volunteerexperienceList.time_period = '';
    volunteerexperienceList.role_org = '';
    volunteerexperienceList.desc = '';
    volunteerexperienceList.id = '';
    volunteerexperienceList.btnSaveExperience = "Add";

    toastService.showSimpleToast();
  }

  volunteerexperienceList.removeExperience = function(experience) {
    var _index = volunteerexperienceList.experiences.indexOf(experience);
    var id = experience.id;
    console.log(experience);
    volunteerexperienceList.experiences.splice(_index, 1);

    var addVolunteerExperienceObject = JSON.parse(localStorage.getItem('addVolunteerExperienceObject'));
    for (i=0;i<addVolunteerExperienceObject.length;i++)
                if (addVolunteerExperienceObject[i].id == id) addVolunteerExperienceObject.splice(i,1);
    localStorage.setItem('addVolunteerExperienceObject', JSON.stringify(addVolunteerExperienceObject));
  }

    volunteerexperienceList.bindSelectedData = function(experience) {
    volunteerexperienceList.btnSaveExperience = "Save";
    volunteerexperienceList.orgname = experience.orgname;
    volunteerexperienceList.time_period = experience.time_period;
    volunteerexperienceList.role_org = experience.role_org;
    volunteerexperienceList.desc = experience.desc;
    volunteerexperienceList.id = experience.id;
  }
})
