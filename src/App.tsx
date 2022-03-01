import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Controller,
  EffectCube,
} from "swiper";
import "swiper/swiper-bundle.css";
import "./styles.css";
import APIController from "./APIController";
import {ProjectType} from "./interfaces/ProjectInterface"

/*  //Image type
  allImages.push({
    imageUrl: nasaFileUrl + libItem.file.fileId,
    imageTitle: libItem.title, // could be anything, not just jpg name
    imageDescription: libItem.description,
  });
*/
/** for the inner array "allImages"  */

SwiperCore.use([Navigation, Pagination, Controller, EffectCube]);

function App() {
  // const [controlledSwiper] = useState<Swiper | null>(null);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [projectSlides, setProjectSlides] = useState<JSX.Element[]>([]);
  const [detailSlides, setDetailSlides] = useState<JSX.Element[]>([]);

  useEffect(() => {
    console.log("App, calling searchForProjects");
    (async () => {
      let projectArray: ProjectType[] =[];
      await APIController.searchForProjects(
        "dO88of9b8oCDxO8PNkxPjjyOCEHo838GbcPNgBle",
        // something like "neuro plasticity"
        // "James Webb Space Telescope"  //current favorite/biggish
        // "Dragonfly"  //looks good
        // "Joint Polar Satellite System"   //kinda meh
        //"Landsat 9"  //images aren't great
        // "Lucy" //images aren't great
        //"Mars Sample Return"  // too many results
        // "Comet Sample Return" // too many results (79)
        "Gamma-Ray Burst" // yup i like this  TODO: and it shows that i need to check for primary image, it's not always the first image, so I'll check the indicator I believe is there
        //"Psyche"  // not bad, it's an option
        //"CubeSat Plasma Lazer" // could be better, there's any variants of Cubesat, so might b
        //"Heliopause Electrostatic" // simple!  visual! it's a keeper
        //"Roman Space" // is like this, "Roman Space Telescope", which this is, returns only 1 result, but this one seems good
        // "Sub-Orbital Large Balloon"  // original test
        // Continue: https://www.technologyreview.com/2021/01/04/1015519/the-11-biggest-space-missions-of-2021/
        // Continue: https://www.nasa.gov/centers/ames/engineering/projects
        // Continue: https://www.nasa.gov/centers/ivv/services/ivvprojects_current.html
       , projectArray
        ).then(async (projectsArray: ProjectType[]) => {
        console.log("projectsArray:" + JSON.stringify(projectsArray));
        setProjects(projectsArray);
        console.log("projects:" + JSON.stringify(projects));

        /////////////////////////////////
        var arProjectSlides = [];
        for (let i = 0; i < projectsArray.length; i += 1) {
          arProjectSlides.push(
            <SwiperSlide
              key={`slide-${i}`}
              style={{ backgroundPosition: "center", backgroundSize: "cover" }}
            >
              <div style={{ position: "relative" }}>
                <img
                  style={{ height: "300px", width: "300px" }}
                  src={projectsArray[i].primaryImageUrl}
                  alt={projectsArray[i].primaryImageUrl}
                />
              </div>
            </SwiperSlide>
          );
        }
        setProjectSlides(arProjectSlides);

        var projectDetailSlides = [];
        projectDetailSlides.push(
          <SwiperSlide key={`slideDef-${0}`} tag="li">
            <div>
              <div>{projectsArray[0].definition}</div>
            </div>
          </SwiperSlide>
        );
        projectDetailSlides.push(
          <SwiperSlide key={`slideTech-${0}`} tag="li">
            <div>
              <div>{projectsArray[0].exampleTechnologies}</div>
            </div>
          </SwiperSlide>
        );
        projectDetailSlides.push(
          <SwiperSlide key={`slideBene-${0}`} tag="li">
            <div>
              <div>{projectsArray[0].benefits}</div>
            </div>
          </SwiperSlide>
        );
        // Bonus images round, if there's more than 1 image available
        if (projectsArray[0].allImages.length > 1) {
          for (let imageItem of projectsArray[0].allImages) {
            if (projectsArray[0].primaryImageUrl !== imageItem.imageUrl) {
              console.log("imageItem.imageUrl:" + imageItem.imageUrl);
              projectDetailSlides.push(
                <SwiperSlide key={`slideImg-${imageItem.imageUrl}`} tag="li">
                  <div>
                    <img
                      style={{ height: "300px", width: "300px" }}
                      src={imageItem.imageUrl}
                      alt={imageItem.imageUrl}
                    />
                  </div>
                </SwiperSlide>
              );
            } // end if url matches
          } // end for
        } // end if images length

        setDetailSlides(projectDetailSlides);
        ///////////////////
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: You need do multi-dimensional array.  when the user changes the

  return (
    <React.Fragment>
      <Swiper
        id="cube"
        effect={"cube"}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        // controller={{ control: controlledSwiper }}
        tag="section"
        wrapperTag="ul"
        navigation
        pagination
        spaceBetween={0}
        slidesPerView={1}
        onInit={(swiper) => console.log("Swiper initialized!", swiper)}
        onSlideChange={(swiper) => {
          console.log("Slide index changed to: ", swiper.activeIndex);
          setSwiperActiveIndex(swiper.activeIndex);

          var projectDetailSlides = [];
          projectDetailSlides.push(
            <SwiperSlide key={`slideDef-${swiperActiveIndex}`} tag="li">
              <div>
                <div>{projects[swiperActiveIndex].definition}</div>
              </div>
            </SwiperSlide>
          );
          projectDetailSlides.push(
            <SwiperSlide key={`slideTech-${swiperActiveIndex}`} tag="li">
              <div>
                <div>{projects[swiperActiveIndex].exampleTechnologies}</div>
              </div>
            </SwiperSlide>
          );
          projectDetailSlides.push(
            <SwiperSlide key={`slideBene-${swiperActiveIndex}`} tag="li">
              <div>
                <div>{projects[swiperActiveIndex].benefits}</div>
              </div>
            </SwiperSlide>
          );

          // Bonus images round, if there's more than 1 image available
          if (projects[swiperActiveIndex].allImages.length > 1) {
            for (let imageItem of projects[swiperActiveIndex].allImages) {
              if (
                projects[swiperActiveIndex].primaryImageUrl !==
                imageItem.imageUrl
              ) {
                console.log("imageItem.imageUrl:" + imageItem.imageUrl);
                projectDetailSlides.push(
                  <SwiperSlide key={`slideImg-${imageItem.imageUrl}`} tag="li">
                    <div>
                      <img
                        style={{ height: "300px", width: "300px" }}
                        src={imageItem.imageUrl}
                        alt={imageItem.imageUrl}
                      />
                    </div>
                  </SwiperSlide>
                );
              } // end if url matches
            } // end for
          } // end if images length

          setDetailSlides(projectDetailSlides);
        }}
        onReachEnd={() => console.log("Swiper end reached")}
      >
        {projectSlides.map((projectSlide) => (
          <div>{projectSlide}</div>
        ))}
      </Swiper>

      <Swiper
        id="controller"
        // onSwiper={setControlledSwiper}
        navigation
        pagination
      >
        {detailSlides.map((detailSlide) => (
          <div>{detailSlide}</div>
        ))}
      </Swiper>
    </React.Fragment>
  );
}

export default App;
