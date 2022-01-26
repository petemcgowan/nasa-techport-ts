import React, { Component } from 'react';
import axios from 'axios';


import SliderTemplates from './slider_templates';
import { URL } from '../../../config';
import APIController from '../../../APIController';

class ProjectSlider extends Component {

    state = {
      // Pete this will be 'projects'
      projects:[]
    }

    async componentDidMount(){

      // Pete: Call APIController to get NASA data
      await  APIController.searchForProjects('dO88of9b8oCDxO8PNkxPjjyOCEHo838GbcPNgBle', 'Sub-Orbital Large Balloon')
      .then( async projectsArray => {
        console.log("projectsArray:" + JSON.stringify(projectsArray));
      //   console.log(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`);

      //   var response = await axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`);
      //   console.log("response:" + JSON.stringify(response));
      //   return response.data;
      // })
      // .then(  articles => {
      //   // this is 'news', the format is likely articles in db.json
        // console.log("articles:" + JSON.stringify(articles));
        this.setState({
          projects:projectsArray
          // news:response.data
        })
      })
    }


    render(){
        return(
            <SliderTemplates data={this.state.projects} type={this.props.type} settings={this.props.settings}/>
        )
    }

}

export default ProjectSlider;
