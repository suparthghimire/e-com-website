import React from 'react';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '~/components/features/owl-carousel';

import PostEight from '~/components/features/post/post-eight';

import { fadeIn } from '~/utils/data/keyframes';
import { mainSlider6 } from '~/utils/data/carousel';

function BlogSection( props ) {
    const { posts } = props;

    return (
        <section className="pt-10 mt-3 pb-10">
            <Reveal keyframes={ fadeIn } duration={ 1000 } triggerOnce>
                <div className="container mt-4">
                    <h2 className="title title-center">Latest News</h2>

                    <OwlCarousel adClass="owl-theme post-slider" options={ mainSlider6 }>
                        {
                            posts && posts.length ?
                                posts.slice( 15, 18 ).map( ( post, index ) => (
                                    <div className="blog-post" key={ "post-eight" + index }>
                                        <PostEight post={ post } adClass="overlay-zoom" isOriginal={ true } contentClass="mb-4" btnAdClass="btn-sm" />
                                    </div>
                                ) ) : ''
                        }
                    </OwlCarousel>
                </div>
            </Reveal>
        </section >
    )
}

export default React.memo( BlogSection );