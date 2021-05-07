import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Link from 'next/link';
import styles from '../static/styles/imageSlider.module.scss'

function ImageSlider({ artists }) {

    function mapBandsToSlider(){
        return (  
            artists.map(artist => (
                <Carousel.Item key={artist.name}>
                    <Link className={styles.sliderLinks} href={`/artists/${artist.name}`} >
                        <img
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
        <div className={styles.sliderContainer}>
            <Carousel 
                fade
                interval={4000}
                indicators={false}
                className={styles.carouselElement}
            >
              {mapBandsToSlider()}  
            </Carousel>
        </div>
    )
}

export default ImageSlider