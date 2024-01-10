import React from 'react';
import './Slide.scss';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slide = ({ children, flag, slidesToShow, slidesToSlide }) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: slidesToShow,
            slidesToSlide: slidesToSlide // optional, default to 1.
        },
        // tablet: {
        //     breakpoint: { max: 1024, min: 464 },
        //     items: 2,
        //     slidesToSlide: 2 // optional, default to 1.
        // },
        // mobile: {
        //     breakpoint: { max: 464, min: 0 },
        //     items: 1,
        //     slidesToSlide: 1 // optional, default to 1.
        // }
    };

    return (
        <div className='slide' style={{ marginBottom: flag === 2 ? '100px' : '0' }}>
            <div className='container'>
                {flag == 1 ? <h1>Popular services</h1> : <h1>Inspiring work made on GigHub</h1>}

                <Carousel
                    swipeable={true} // Allow swipe gestures
                    draggable={true} // Allow dragging
                    showDots={false}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={false} // Enable auto play
                    keyBoardControl={true}
                    customTransition="transform 1000ms ease-in-out" // Smooth transition
                    transitionDuration={1000} // Duration of each transition
                >
                    {children}
                </Carousel>
            </div>
        </div>
    );
}
export default Slide;

// You create an array of CatCard components by mapping over the cards array in the Home page.
// You pass this array of CatCard components as "children" (special prop) to the Slide component.
// The Slide component, in turn, renders these CatCard components within the Slider component, and the library takes care of the presentation and animation of the slides.




