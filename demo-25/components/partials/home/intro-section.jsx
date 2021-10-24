import React, { useEffect, useRef } from 'react';
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import Custom Components
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { introSlider } from '~/utils/data/carousel';
import { fadeIn, fadeInUpShorter, fadeInLeftShorter, blurIn, fadeInRightShorter } from '~/utils/data/keyframes';

function IntroSection() {
    const ref = useRef( null );

    useEffect( () => {
        isotopeInit();
    }, [] );

    async function isotopeInit() {
        const Isotope = ( await import( 'isotope-layout' ) ).default;

        let iso = new Isotope( ref.current, {
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-space'
            }
        } );
    }

    return (
        <div className="categories grid row" ref={ ref }>
            <div className="grid-item col-md-6 height-x2">
                <Reveal keyframes={ fadeInRightShorter } delay={ 100 } duration={ 1200 } className="h-100" triggerOnce>
                    <div className="category category-banner text-white overlay-zoom category-absolute" style={ { backgroundColor: "#f0f0f0" } }>
                        <figure className="category-media">
                            <img src="./images/home/categories/1.jpg" alt="category" width="585" height="434" />
                        </figure>

                        <div className="category-content">
                            <h4 className="category-name">New Arrivals</h4>
                            <span className="category-count">
                                <span>6</span> Products
                            </span>
                            <ALink href={ { pathname: "/shop", query: { category: 'new-arrivals' } } } className="btn btn-underline btn-link">Shop Now</ALink>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="grid-item col-md-6 height-x15">
                <Reveal keyframes={ fadeInLeftShorter } delay={ 200 } duration={ 1200 } className="h-100" triggerOnce>
                    <div className="category category-banner overlay-zoom category-absolute" style={ { backgroundColor: "#dae0e0" } }>
                        <figure className="category-media">
                            <img src="./images/home/categories/2.jpg" alt="category" width="585" height="434" />
                        </figure>

                        <div className="category-content">
                            <h4 className="category-name">Flash Sales</h4>
                            <span className="category-count">
                                <span>3</span> Products
                            </span>
                            <ALink href={ { pathname: "/shop", query: { category: 'flash-sales' } } } className="btn btn-underline btn-link">Shop Now</ALink>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="grid-item col-md-3 col-6 height-x15">
                <Reveal keyframes={ fadeInUpShorter } delay={ 300 } duration={ 1200 } className="h-100" triggerOnce>
                    <div className="category category-banner overlay-zoom category-absolute text-white" style={ { backgroundColor: "#e6e6e6" } }>
                        <figure className="category-media">
                            <img src="./images/home/categories/4.jpg" alt="category" width="585" height="434" />
                        </figure>

                        <div className="category-content">
                            <h4 className="category-name">Cosmetia</h4>
                            <span className="category-count">
                                <span>3</span> Products
                            </span>
                            <ALink href={ { pathname: "/shop", query: { category: 'cosmetia' } } } className="btn btn-underline btn-link">Shop Now</ALink>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="grid-item col-md-3 col-6 height-x15">
                <Reveal keyframes={ fadeInLeftShorter } delay={ 400 } duration={ 1200 } className="h-100" triggerOnce>
                    <div className="category category-banner overlay-zoom category-absolute text-white" style={ { backgroundColor: "#ce9174" } }>
                        <figure className="category-media">
                            <img src="./images/home/categories/5.jpg" alt="category" width="585" height="434" />
                        </figure>

                        <div className="category-content">
                            <h4 className="category-name">Footwear</h4>
                            <span className="category-count">
                                <span>3</span> Products
                            </span>
                            <ALink href={ { pathname: "/shop", query: { category: 'footwear' } } } className="btn btn-underline btn-link">Shop Now</ALink>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="grid-item col-md-6 height-x1">
                <Reveal keyframes={ fadeInRightShorter } delay={ 200 } duration={ 1200 } className="h-100" triggerOnce>
                    <div className="category category-banner overlay-zoom category-absolute" style={ { backgroundColor: "#ebebeb" } }>
                        <figure className="category-media">
                            <img src="./images/home/categories/3.jpg" alt="category" width="585" height="434" />
                        </figure>

                        <div className="category-content">
                            <h4 className="category-name">Best Seller</h4>
                            <span className="category-count">
                                <span>3</span> Products
                            </span>
                            <ALink href={ { pathname: "/shop", query: { category: 'best-seller' } } } className="btn btn-underline btn-link">Shop Now</ALink>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="grid-space col-1"></div>
        </div>
    )
}

export default React.memo( IntroSection );