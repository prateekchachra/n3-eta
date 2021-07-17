import React, { CSSProperties } from 'react'

import './ImageSlider.scss';

import { Carousel } from 'react-bootstrap'

type ImageSliderProps = {
    id: string;
    name: string;
    images: string[];
    style: CSSProperties;
}

const ImageSlider = ( {id, name, images, style}: ImageSliderProps ) :JSX.Element => {

    function renderImageItems(images: string[]) {
        const imageItems = images.map( (image, index) => { 
            const imgSrc = image;
            return (
            <Carousel.Item key={index} className="imageWrapper">
                <img
                    className="d-block w-100 image"
                    src = {imgSrc}
                    alt="Loading..."
                />
            </Carousel.Item>
            )}
        );
        return imageItems;
    }

    return (
        <div id={id} className="imageSliderContainer" style={style}>
            <Carousel indicators={false} className="imageSlider" controls={images.length > 1}>
                {renderImageItems(images)}
            </Carousel>
        </div>
    )
}

export default ImageSlider;
