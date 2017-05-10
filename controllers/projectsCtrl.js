resumeApp.controller('projectsCtrl', function($scope, toastService, utilService, $location, $log) {
  var projectsList = this;
  projectsList.projects = [];

  projectsList.btnSaveProjects = "Add";
  if(JSON.parse(localStorage.getItem('addProjectObject'))){
    var resolveAddProjectObject = JSON.parse(localStorage.getItem('addProjectObject'));
    for(var i = 0; i < resolveAddProjectObject.length; i++) {
        var obj = resolveAddProjectObject[i];

        projectsList.projects.push({id: obj.id, title: obj.title, website: obj.website, desc: obj.desc});
        //console.log(obj.id);
    }
  }

  projectsList.addProject = function(){
    if(projectsList.title==undefined
      || projectsList.website==undefined
      ||projectsList.desc==undefined
      || projectsList.title==''
      || projectsList.website=='')
      return false;

    var projectId = utilService.guid();
    if(projectsList.id!=undefined && projectsList.id!=''){
      var addProjectObject = JSON.parse(localStorage.getItem('addProjectObject'));
      for (i=0;i<addProjectObject.length;i++){
        if (addProjectObject[i].id == projectsList.id) {
          addProjectObject[i].title = projectsList.title;
          addProjectObject[i].website = projectsList.website;
          addProjectObject[i].desc = projectsList.desc;
        }
      }
      localStorage.setItem('addProjectObject', JSON.stringify(addProjectObject));

      // Update the selected Project
      angular.forEach(projectsList.projects, function (p) {
        if (p.id == projectsList.id) {
          p.title = projectsList.title;
          p.website = projectsList.website;
          p.desc = projectsList.desc;
        }
      });
    }else{
      projectsList.projects.push({id:projectId, title: projectsList.title, website: projectsList.website, desc: projectsList.desc});

      var addProjectObject = JSON.parse(localStorage.getItem('addProjectObject')) || [];
      var addProjectNewItem = {'id': projectId, 'title': projectsList.title, 'website': projectsList.website, 'desc': projectsList.desc};

      addProjectObject.push(addProjectNewItem);
      localStorage.setItem('addProjectObject', JSON.stringify(addProjectObject));
    }
    projectsList.title = '';
    projectsList.website = '';
    projectsList.desc = '';
    projectsList.id = '';
    projectsList.btnSaveProjects = "Add";

    toastService.showSimpleToast();
  }

  projectsList.removeProject = function(project) {
    var _index = projectsList.projects.indexOf(project);
    var id = project.id;
    console.log(project);
    projectsList.projects.splice(_index, 1);

    var addProjectObject = JSON.parse(localStorage.getItem('addProjectObject'));
    for (i=0;i<addProjectObject.length;i++)
                if (addProjectObject[i].id == id) addProjectObject.splice(i,1);
    localStorage.setItem('addProjectObject', JSON.stringify(addProjectObject));
  }

  projectsList.bindSelectedProject = function(project) {
    projectsList.btnSaveProjects = "Save";
    projectsList.title = project.title;
    projectsList.website = project.website;
    projectsList.desc = project.desc;
    projectsList.id = project.id;
  }
})
