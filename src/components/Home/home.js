import React from 'react'

import ProjectSlider from '../widgets/ProjectSlider/projectSlider';
//import NewsList from '../widgets/NewsList/newsList';
//import VideosList from '../widgets/VideosList/videosList';

const Home = () => {
  return (
    <div>
      <ProjectSlider
        type="featured"
        start={0}
        amount={3}
        settings={{
          dots:true
        }}
      />
    </div>
  )
}

export default Home;
/*
      <NewsList
        type="card"
        loadmore={true}
        start={3}
        amount={3}
      />
*/

/* Commented 3rd section , may never need?

      <VideosList
        type="card"
        title={true}
        loadmore={true}
        start={0}
        amount={3}
      />
*/