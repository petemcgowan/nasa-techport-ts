import APIController from "./APIController.js";
import UIController from "./UIController.js";

const APPController = (function(UICtrl, APICtrl) {

  // get input field object ref
  const DOMInputs = UICtrl.inputField();

  // create search releases button click event listener
  DOMInputs.submitProjects.addEventListener('click', async (e) => {
    // prevent page reset
    e.preventDefault();
    // clear projects
    UICtrl.resetProjects();
    //get the token
    const token = UICtrl.getStoredToken().token;
    // get the playlist field
    // const searchTerms = 'black%20loops%20year%3A2019-2020';
    const searchTerms = UICtrl.inputField().searchTerm;
    // get the list of releases

    var projectsArray =await APICtrl.searchForProjects(token, searchTerms.value);
    console.time("uiTableCreation");
    UICtrl.createProjectTable(projectsArray);
    console.timeEnd("uiTableCreation");
  });

  // get genres on page load
  const setupToken = async () => {
    //get the token
      const token = await APICtrl.getToken();

    //store the token onto the page
    UICtrl.storeToken(token);
  }

  return {
    init() {
      console.log('App is starting');
      setupToken();
    }
  }

})(UIController, APIController);

// will need to call a method to load the genres on page load
//Pete  not needed anymore?
//APPController.init();

