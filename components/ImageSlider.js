import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Link from 'next/link';
import styles from '../static/styles/imageSlider.module.scss'

function ImageSlider({ artists }) {

    function mapBandsToSlider(){
        return (  
            artists.map(artist => (
                <Carousel.Item id={styles.carouselItem} key={artist.name}>
                    <Link id={styles.sliderLinks} href={`/artists/${artist.url}`} >
                        <img
                            id={styles.carouselImg}
                            className="d-block w-100"
                            src={artist.image}
                            alt={artist.name + " artist photo"}
                        />
                    </Link>
                    <Carousel.Caption>
                        {/* <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            ))
        )
    }

    return (
        <div id={styles.sliderContainer}>
            <Carousel 
                fade
                interval={4000}
                indicators={false}
                id={styles.carouselElement}
            >
              {mapBandsToSlider()}  
            </Carousel>
        </div>
    )
}

export default ImageSlider