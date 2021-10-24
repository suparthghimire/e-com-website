import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwlCarousel from '~/components/features/owl-carousel';
import ALink from '~/components/features/custom-link';

import { fadeInLeftShorter, fadeIn, fadeInRightShorter } from '~/utils/data/keyframes';
import { testiSlider } from '~/utils/data/carousel';

export default function InstagramSection() {
    return (
        <section className="instagram-section pb-8 mb-10">
            <div className="container">
                <h2 className="title title-simple text-normal title-center mb-6">Follow Us on Instagram</h2>
                <div className="grid row">
                    <div className="grid-item height-x1">
                        <Reveal triggerOnce keyframes={ fadeInLeftShorter } delay={ 300 }>
                            <figure className="instagram" style={ { backgroundColor: "#ced0cf" } }>
                                <ALink href="#">
                                    <LazyLoadImage effect="opacity" src="./images/home/instagrams/1.jpg" alt="Instagram" width="180"
                                        height="180" />
                                </ALink>
                            </figure>
                        </Reveal>
                    </div>
                    <div className="grid-item height-x1">
                        <Reveal triggerOnce keyframes={ fadeInLeftShorter } delay={ 200 }>
                            <figure className="instagram" style={ { backgroundColor: "#dddcda" } }>
                                <ALink href="#">
                                    <LazyLoadImage effect="opacity" src="./images/home/instagrams/2.jpg" alt="Instagram" width="180"
                                        height="180" />
                                </ALink>
                            </figure>
                        </Reveal>
                    </div>
                    <div className="grid-item height-x1">
                        <Reveal triggerOnce keyframes={ fadeInRightShorter } delay={ 200 }>
                            <figure className="instagram" style={ { backgroundColor: "#eaebe9" } }>
                                <ALink href="#">
                                    <LazyLoadImage effect="opacity" src="./images/home/instagrams/3.jpg" alt="Instagram" width="180"
                                        height="180" />
                                </ALink>
                            </figure>
                        </Reveal>
                    </div>
                    <div className="grid-item height-x1">
                        <Reveal triggerOnce keyframes={ fadeInRightShorter } delay={ 300 }>
                            <figure className="instagram" style={ { backgroundColor: "#b4b4b6" } }>
                                <ALink href="#">
                                    <LazyLoadImage effect="opacity" src="./images/home/instagrams/4.jpg" alt="Instagram" width="180"
                                        height="180" />
                                </ALink>
                            </figure>
                        </Reveal>
                    </div>
                    <div className="grid-item height-x2">
                        <div className="testimonial-wrapper">
                            <h3 className="title title-simple font-weight-semi-bold text-normal">What they
                        say about us</h3>
                            <Reveal triggerOnce keyframes={ fadeIn } delay={ 200 }>
                                <OwlCarousel adClass="owl-theme" options={ testiSlider }>
                                    <div className="testimonial testimonial-centered">
                                        <div className="testimonial-info">
                                            <figure className="testimonial-author-thumbnail">
                                                <LazyLoadImage effect="opacity" src="images/agents/4.jpg" alt="user" width="40" height="40" />
                                            </figure>
                                            <blockquote className="comment">
                                                “ Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                                Phasellus hendrerit.
                                                Pellente sque aliquet nibh nec urna. In nisi neque ”
                                </blockquote>
                                            <cite>
                                                Jenson Gregory
                                    <span>Customer</span>
                                            </cite>
                                        </div>
                                    </div>
                                    <div className="testimonial testimonial-centered">
                                        <div className="testimonial-info">
                                            <figure className="testimonial-author-thumbnail">
                                                <LazyLoadImage effect="opacity" src="images/agents/4.jpg" alt="user" width="40" height="40" />
                                            </figure>
                                            <blockquote className="comment">“ Lorem ipsum dolor sit amet, consectetuer
                                            adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec
                                    urna. In nisi neque ”</blockquote>
                                            <cite>
                                                Mary Adams
                                    <span>Customer</span>
                                            </cite>
                                        </div>
                                    </div>
                                    <div className="testimonial testimonial-centered">
                                        <div className="testimonial-info">
                                            <figure className="testimonial-author-thumbnail">
                                                <LazyLoadImage effect="opacity" src="images/agents/4.jpg" alt="user" width="40" height="40" />
                                            </figure>
                                            <blockquote className="comment">“ Lorem ipsum dolor sit amet, consectetuer
                                            adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec
                                    urna. In nisi neque ”</blockquote>
                                            <cite>
                                                Owen Hunt
                                    <span>Customer</span>
                                            </cite>
                                        </div>
                                    </div>
                                </OwlCarousel>
                            </Reveal>

                        </div>
                    </div>
                    <div className="grid-item height-x1">
                        <Reveal triggerOnce keyframes={ fadeInLeftShorter } delay={ 300 }>
                            <figure className="instagram" style={ { backgroundColor: "#3b414d" } }>
                                <ALink href="#">
                                    <LazyLoadImage effect="opacity" src="./images/home/instagrams/5.jpg" alt="Instagram" width="180"
                                        height="180" />
                                </ALink>
                            </figure>
                        </Reveal>
                    </div>
                    <div className="grid-item height-x1">
                        <Reveal triggerOnce keyframes={ fadeInLeftShorter } delay={ 200 }>
                            <figure className="instagram" style={ { backgroundColor: "#d1cecb" } }>
                                <ALink href="#">
                                    <LazyLoadImage effect="opacity" src="./images/home/instagrams/6.jpg" alt="Instagram" width="180"
                                        height="180" />
                                </ALink>
                            </figure>
                        </Reveal>
                    </div>
                    <div className="grid-item height-x1">
                        <Reveal triggerOnce keyframes={ fadeInRightShorter } delay={ 200 }>
                            <figure className="instagram" style={ { backgroundColor: "#e3e7ea" } }>
                                <ALink href="#">
                                    <LazyLoadImage effect="opacity" src="./images/home/instagrams/7.jpg" alt="Instagram" width="180"
                                        height="180" />
                                </ALink>
                            </figure>
                        </Reveal>
                    </div>
                    <div className="grid-item height-x1">
                        <Reveal triggerOnce keyframes={ fadeInRightShorter } delay={ 300 }>
                            <figure className="instagram" style={ { backgroundColor: "#162021" } }>
                                <ALink href="#">
                                    <LazyLoadImage effect="opacity" src="./images/home/instagrams/8.jpg" alt="Instagram" width="180"
                                        height="180" />
                                </ALink>
                            </figure>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}