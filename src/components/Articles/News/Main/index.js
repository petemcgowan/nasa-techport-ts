import React from 'react';

import ProjectSlider from '../../../widgets/ProjectSlider/projectSlider';
import NewsList from '../../../widgets/NewsList/newsList';

const NewsMain = () => (
    <div>
        <ProjectSlider
            type="featured"
            settings={{dots:false}}
            start={0}
            amount={3}
        />
        <NewsList
            type="cardMain"
            loadMore={true}
            start={3}
            amount={3}
        />
    </div>
)

export default NewsMain;