const APIController = (function() {

  const apiUrl = 'https://api.nasa.gov/techport/api';

  var _searchForProjects = async (token, searchTerms) => {

    console.time("projectIdQuery");
    const queryProjects = apiUrl + '/projects/search?searchQuery=' +
    encodeURIComponent(searchTerms) +
    '&api_key=' + token;

    // get Projects
    const projectResult = await fetch(queryProjects, {
        method: 'GET',
        headers: { }
    });
    let projectIdArray = [];
    const projectDataJson = await projectResult.json();
    projectDataJson.projects.forEach (projectEl => {
      projectIdArray.push(projectEl.id);
    });
    console.timeEnd("projectIdQuery");

    let projectsArray = [];
    // get the project images etc
    console.time("projectsQuery");
    await Promise.all(

      projectIdArray.map(async projectId => {
        let projectsUrl = `${apiUrl}/projects/${projectId}?api_key=${token}`;
        console.log ('projectsUrl:' + projectsUrl);

        let projectResult = await fetch(projectsUrl, {
          method: 'GET',
          headers: { }
        });
          var jsonDetail = projectResult.json();
        return jsonDetail;
      })
    )
      .then( (projectDetails) => {
        console.timeEnd("projectsQuery");
        console.time("projectsSorting");
        projectDetails.forEach (projectDetail => {

        // iterate around "library items"
        let imageUrl = '';
        let imageDescription = '';
        let imageTitle = '';
        let hasImages = false;
        const hardcodedLimit = 15;  // to avoid re-implementing paging twice (maybe)
        let usableProjectsCounter = 0;  // to avoid re-implementing paging twice (maybe)

        if (projectDetail.project.libraryItems.length) {
          for (let libItem of projectDetail.project.libraryItems) {
            if ((libItem.type = 'Image') &&
            (libItem.files.length ))   {
              hasImages = true;
              imageUrl = libItem.files[0].url;
              imageTitle = libItem.title; // could be anything, not just jpg name
              imageDescription = libItem.description;
              break;
            }
          }
        }
        if (hasImages) {  // hello, eye candy: no eggheads allowed
          usableProjectsCounter++;
          if (usableProjectsCounter <= hardcodedLimit) {
            var project = {
              id: projectDetail.project.id,
              title: projectDetail.project.title,
              startDate: projectDetail.project.startDate,
              endDate: projectDetail.project.endDate,
              status: projectDetail.project.status,
              website: projectDetail.project.website,
              imageUrl: imageUrl,
              imageDescription: imageDescription,
              imageTitle: imageTitle,
              hasImages: hasImages
            };
            projectsArray.push(project);
          } // end limit
        } // end hasImages
      }); // end project detail
    }); // end projectDetails array
    console.timeEnd("projectsSorting");
    return projectsArray;
  }


  const _getProjectDetails = async (token, projectEndPoint, projectArray) => {

    const result = await fetch(`${projectEndPoint}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    // for each track in release, add to project array
    await data.projects.items.forEach(projectEl => {
        // same list box, but track level instead
        // UICtrl.createRelease(trackEl.href, trackEl.name);
        projectArray.push(projectEl);
        //UICtrl.createTrack(trackEl); // works for simple list items, not for a complex table
    });

    console.log('_getProject:data:' + JSON.stringify(data));
    console.log('_getProject:trackArray:' + JSON.stringify(projectArray));
    return projectArray;
  }

  // var _getTrackArray = async (token, releaseData) => {
  //   // Get the tracks (aka getRelease) for each release ID

  //     return trackArray;
  // }

  const _getToken = async () => {

    // const result = await fetch('https://accounts.spotify.com/api/token', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type' : 'application/x-www-form-urlencoded',
    //         'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
    //     },
    //     body: 'grant_type=client_credentials'
    // });

    // const data = await result.json();
    // return data.access_token;
    //todo: don't have this in the code obviously, maybe in a file or dynamic?
    return 'dO88of9b8oCDxO8PNkxPjjyOCEHo838GbcPNgBle';
  }


  return {
      getToken() {
          return _getToken();
      },
      async searchForProjects(token, searchTerms) {
          return _searchForProjects(token, searchTerms);
      },
      getProjectDetails(token, projectEndPoint) {
          return _getProjectDetails(token, projectEndPoint);
      }
  }
})();

export default APIController;
