import React from 'react';
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwlCarousel from '~/components/features/owl-carousel';
import ALink from '~/components/features/custom-link';

import { fadeIn } from '~/utils/data/keyframes';
import { categorySlider } from '~/utils/data/carousel';

function CategorySection() {
    return (
        <Reveal keyframes={ fadeIn } delay={ 300 } duration={ 1200 } triggerOnce>
            <section className="pt-2">
                <div className="container">
                    <h2 className="title title-center mb-5">Popular Categories</h2>

                    <OwlCarousel adClass="owl-theme" options={ categorySlider }>
                        <div className="category category-default1 category-absolute banner-radius overlay-zoom">
                            <ALink href={ { pathname: '/shop', query: { category: 'backpacks-and-fashion-bags' } } }>
                                <figure className="category-media" style={ { backgroundColor: "#edd3c7" } }>
                                    <LazyLoadImage effect="opacity" src="./images/home/categories/1.jpg" alt="category" width="280"
                                        height="280" />
                                </figure>
                            </ALink>
                            <div className="category-content">
                                <h4 className="category-name ls-l"><ALink href={ { pathname: '/shop', query: { category: 'backpacks-and-fashion-bags' } } }>Backpacks &amp; Fashion Bags</ALink>
                                </h4>
                            </div>
                        </div>

                        <div className="category category-default1 category-absolute banner-radius overlay-zoom">
                            <ALink href={ { pathname: '/shop', query: { category: 'travel-and-clothing' } } }>
                                <figure className="category-media" style={ { backgroundColor: "#090909" } }>
                                    <LazyLoadImage effect="opacity" src="./images/home/categories/2.jpg" alt="category" width="280"
                                        height="280" />
                                </figure>
                            </ALink>
                            <div className="category-content">
                                <h4 className="category-name ls-l"><ALink href={ { pathname: '/shop', query: { category: 'travel-and-clothing' } } }>Travel &amp; Clothing</ALink></h4>
                            </div>
                        </div>

                        <div className="category category-default1 category-absolute banner-radius overlay-zoom">
                            <ALink href={ { pathname: '/shop', query: { category: 'musical-instruments' } } }>
                                <figure className="category-media" style={ { backgroundColor: "#fcd772" } }>
                                    <LazyLoadImage effect="opacity" src="./images/home/categories/3.jpg" alt="category" width="280"
                                        height="280" />
                                </figure>
                            </ALink>
                            <div className="category-content">
                                <h4 className="category-name ls-l"><ALink href={ { pathname: '/shop', query: { category: 'musical-instruments' } } }>Musical instruments</ALink></h4>
                            </div>
                        </div>

                        <div className="category category-default1 category-absolute banner-radius overlay-zoom">
                            <ALink href={ { pathname: '/shop', query: { category: 'sneakers' } } }>
                                <figure className="category-media" style={ { backgroundColor: "#9bc6cb" } }>
                                    <LazyLoadImage effect="opacity" src="./images/home/categories/4.jpg" alt="category" width="280"
                                        height="280" />
                                </figure>
                            </ALink>
                            <div className="category-content font-weight-bold">
                                <h4 className="category-name ls-l"><ALink href={ { pathname: '/shop', query: { category: 'sneakers' } } }>Sneakers</ALink>
                                </h4>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </section>
        </Reveal>
    )
}

export default React.memo( CategorySection );