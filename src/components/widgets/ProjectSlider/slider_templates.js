import React from 'react';

import Slick from 'react-slick';
import styles from './slider.css'

const SliderTemplates = (props) => {

    let template = null;

    const settings = {
        dots:true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll:1,
        ...props.settings
    }
    console.log ("props.data:" + JSON.stringify(props.data));

    //item is an article right?
    switch(props.type){
        case ('featured'):
            template = props.data.map( (item,i) =>{
                return(
                    <div key={i}>
                       <div className={styles.featured_item}>
                            <div className={styles.featured_image}
                                style={{
                                  //PMG
                                  background:`url(${item.imageUrl})`
                                  //Original
                                  // background:`url(../images/articles/${item.image})`
                                }}></div>
                                <div className={styles.featured_caption}>
                                    {item.title}
                                </div>
                                <div className={styles.projectlist_item}>
                                    {item.imageDescription}
                                </div>

                       </div>
                    </div>
                )
            })
            break;
        default:
            template = null;

    }

    return(
        <Slick {...settings} >
            {template}
        </Slick>
    )
}

export default SliderTemplates;

/*
previous code link, wanna remove the link for now

import { Link } from 'react-router-dom'


                            <Link to={`/articles/${item.id}`}>
                                <div className={styles.featured_caption}>
                                    {item.title}
                                </div>
                            </Link>


*/
