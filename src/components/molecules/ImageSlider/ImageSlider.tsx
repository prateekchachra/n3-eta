import React from 'react'

import './ImageSlider.scss';

import { Carousel } from 'react-bootstrap'

type ImageSliderProps = {
    id: string;
    name: string;
    images: string[];

}

const ImageSlider = ( {id, name, images}: ImageSliderProps ) :JSX.Element => {

    function renderImageItems(images: string[]) {
        const imageItems = images.map( image => { 
            const imgSrc = image;
            return (
            <Carousel.Item key={imgSrc}>
                <img
                    className="d-block w-100 imageContainer"
                    src = {imgSrc}
                    alt="First slide"
                />
            </Carousel.Item>
            )}
        );
        return imageItems;
    }

    return (
        <div id={id}>
            <Carousel indicators={false}>
                {renderImageItems(images)}
            </Carousel>
        </div>
    )
}

export default ImageSlider;
