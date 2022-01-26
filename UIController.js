
import helpers from "./helpers.js";

// Main user interface module

const UIController = (function() {

  //object to hold references to html selectors
  const DOMElements = {
      hfToken: '#hidden_token',
      searchTerm: '#inp_search_term',
      buttonSubmitProjects: '#btn_submit_projects',
      tbody: 'tbody',
      tbodyProjects: '#tbodyProjects',
      divProjectList: '#project-list'
  }

  //public methods
  return {

    //method to get input fields
    inputField() {
        return {
            projects: document.querySelector(DOMElements.divProjectList),
            submitProjects: document.querySelector(DOMElements.buttonSubmitProjects),
            tbodyProjects: document.querySelector(DOMElements.tbodyProjects),
            tbody: document.querySelector(DOMElements.tbody),
            searchTerm: document.querySelector(DOMElements.searchTerm)
        }
    },

    createProjectTable(projects) {

      let html = ``;
      let counter = 0;
      projects.forEach( projectEl => {


        var websiteLink = `<td></td>`;
        var imageBox = `<td></td>`;
        console.log("website:" + projectEl.website);

        if (projectEl.website) {
          websiteLink = `<td><a href="${projectEl.website}" target="_blank">Link</a></td>`;
        }
        if (projectEl.hasImages) {
          imageBox = `<td> <figure> <img src="${projectEl.imageUrl}" alt="${projectEl.imageTitle}" width="500" height="500">
          <figcaption>${projectEl.imageDescription}</figcaption>
          </figure>`;
        }

        counter++;
        html +=  `<tr>

        <td>${counter}</td>
        <td>${projectEl.id}</td>
        <td>${projectEl.title}</td>
        <td>${projectEl.startDate}</td>
        <td>${projectEl.endDate}</td>
        <td>${projectEl.status}</td>
        <td>${imageBox}</td>
        </td>

        ${websiteLink}

        </tr>`
      });

         document.querySelector("tbody").insertAdjacentHTML('beforeend', html);
      },

      resetProjects() {
        this.inputField().projects.innerHTML = '';
        this.inputField().tbodyProjects.innerHTML = '';

        document.querySelector(DOMElements.tbodyProjects).innerHTML = '';
        document.querySelector(DOMElements.divProjectList).innerHTML = '';
        //document.querySelector(DOMElements.tbody).innerHTML = '';
     },

      storeToken(value) {
          document.querySelector(DOMElements.hfToken).value = value;
      },

      getStoredToken() {
          return {
              token: document.querySelector(DOMElements.hfToken).value
          }
      },
  }

})();

export default UIController;
