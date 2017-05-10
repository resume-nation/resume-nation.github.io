resumeApp.controller('skillsCtrl', function($scope, toastService, utilService, $location, $log) {
  var skillsList = this;
  skillsList.skills = [];

  skillsList.btnSaveSkills = "Add";
  if(JSON.parse(localStorage.getItem('addSkillsObject'))){
    var resolveAddSkillsObject = JSON.parse(localStorage.getItem('addSkillsObject'));
    for(var i = 0; i < resolveAddSkillsObject.length; i++) {
        var obj = resolveAddSkillsObject[i];

        skillsList.skills.push({id: obj.id, name: obj.name});
        //console.log(obj.id);
    }
  }

  skillsList.addSkill = function(){
    console.log(skillsList.name);
    if(skillsList.name==undefined || skillsList.name=='')
      return false;

    var skillId = utilService.guid();
    console.log(skillsList.id);
    if(skillsList.id!=undefined && skillsList.id!=''){
      var addSkillsObject = JSON.parse(localStorage.getItem('addSkillsObject'));
      for (i=0;i<addSkillsObject.length;i++){
        if (addSkillsObject[i].id == skillsList.id) {
          addSkillsObject[i].name = skillsList.name;
        }
      }
      localStorage.setItem('addSkillsObject', JSON.stringify(addSkillsObject));

      // Update the selected Project
      angular.forEach(skillsList.skills, function (p) {
        if (p.id == skillsList.id) {
          p.name = skillsList.name;
        }
      });
    }else{
      console.log('here');
      skillsList.skills.push({id:skillId, name: skillsList.name});

      var addSkillsObject = JSON.parse(localStorage.getItem('addSkillsObject')) || [];
      var addSkillNewItem = {'id': skillId, 'name': skillsList.name};

      addSkillsObject.push(addSkillNewItem);
      localStorage.setItem('addSkillsObject', JSON.stringify(addSkillsObject));
    }
    skillsList.name = '';
    skillsList.id = '';
    skillsList.btnSaveSkills = "Add";

    toastService.showSimpleToast();
  }

  skillsList.removeSkill = function(skill) {
    var _index = skillsList.skills.indexOf(skill);
    var id = skill.id;
    //console.log(education);
    skillsList.skills.splice(_index, 1);

    var addSkillsObject = JSON.parse(localStorage.getItem('addSkillsObject'));
    for (i=0;i<addSkillsObject.length;i++)
                if (addSkillsObject[i].id == id) addSkillsObject.splice(i,1);
    localStorage.setItem('addSkillsObject', JSON.stringify(addSkillsObject));
  }

  skillsList.bindSelectedSkill = function(skill) {
    skillsList.btnSaveSkills = "Save";
    skillsList.name = skill.name;
    skillsList.id = skill.id;
  }

})
