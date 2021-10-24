import React, { useEffect } from 'react';
import Reveal from 'react-awesome-reveal';

import ALink from '~/components/features/custom-link';

import { parallaxHandler } from '~/utils';

import { fadeInUpShorter } from '~/utils/data/keyframes';

function CtaSection() {
    useEffect( () => {
        window.addEventListener( 'scroll', parallaxHandler, true );

        return () => {
            window.removeEventListener( 'scroll', parallaxHandler, true );
        }
    }, [] )

    return (
        <section className="banner banner-cta parallax" data-option="{'speed': 4}" style={ { backgroundImage: `url(./images/home/cta.jpg)`, backgroundColor: "#b8cdce" } }>
            <div className="container text-center">
                <Reveal keyframes={ fadeInUpShorter } delay={ 200 } duration={ 750 } triggerOnce>
                    <div className="banner-content">
                        <h3 className="banner-title mb-1">Sign up to <strong className="text-uppercase">Riode</strong></h3>
                        <p className="ls-s text-white">It only takes a second to find out about our latest <br />news
                                and
                                promotions...</p>
                        <form action="#" className="input-wrapper input-wrapper-round input-wrapper-inline">
                            <input type="email" className="form-control text-body bg-white" name="email" id="email"
                                placeholder="Email address here..." required />
                            <button className="btn btn-sm btn-dark btn-icon-right" type="submit">subscribe<i
                                className="d-icon-arrow-right"></i></button>
                        </form>
                        <div className="social-links">
                            <ALink href="#" className="social-link social-facebook fab fa-facebook-f"></ALink>
                            <ALink href="#" className="social-link social-twitter fab fa-twitter"></ALink>
                            <ALink href="#" className="social-link social-linkedin fab fa-linkedin-in"></ALink>
                            <ALink href="#" className="social-link social-google fab fa-google"></ALink>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

export default React.memo( CtaSection );