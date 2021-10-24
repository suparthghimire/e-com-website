import React from 'react';
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import Custom Components
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { introSlider } from '~/utils/data/carousel';
import { fadeInUpShorter, fadeInRightShorter, fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';

function IntroSection() {
    return (
        <section className="intro-section">
            <div className="container">
                <div className="row grid">
                    <Reveal keyframes={ fadeInRightShorter } delay={ 200 } triggerOnce style={ { display: "contents" } }>
                        <div className="grid-item height-x2 category-list d-lg-block d-none w-1">
                            <ul className="menu menu-options vertical-menu category-menu">
                                <li><ALink href="#" className="menu-title">Browse Our Categories</ALink></li>
                                <li className="submenu">
                                    <ALink href={ { pathname: "/shop", query: { category: 'travel-and-clothing' } } }>
                                        <i className="d-icon-t-shirt1" style={ {
                                            fontSize: "23px",
                                            marginLeft: "-1px",
                                            marginRight: "1rem"
                                        } }></i>Travel &amp; Clothing</ALink>
                                    <div className="megamenu">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <h4 className="menu-title">Women’s Clothing</h4>
                                                <ul>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'bottoms' } } }>Bottoms</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'dresses' } } }>Dresses</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'outwear' } } }>Outwear</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'sleepwear' } } }>Sleepwear</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'swimwear' } } }>Swimwear</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'tops' } } }>Tops</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'two-piece-set' } } }>Two-Piece Set</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'women-s-accessories' } } }>Women's Accessories</ALink></li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-4">
                                                <h4 className="menu-title">Men’s Clothing</h4>
                                                <ul>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'bottoms' } } }>Bottoms</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'men-s-accessories' } } }>Men's Accessories</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'outdoors' } } }>Outdoors</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'outwear' } } }>Outwear</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'sleepwear' } } }>Sleepwear</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'swimwear' } } }>Swimwear</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'tops' } } }>Tops</ALink></li>
                                                    <li><ALink href={ { pathname: "/shop", query: { category: 'underwear' } } }>Underwear</ALink></li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="menu-banner menu-banner3 banner banner-fixed">
                                                    <figure>
                                                        <LazyLoadImage effect="opacity" src="./images/menu/banner-3.jpg" alt="Banner" width="280"
                                                            height="374" />
                                                    </figure>
                                                    <div className="banner-content banner-date">
                                                        <h6
                                                            className=" text-white text-right font-weight-bold text-uppercase lh-1 mb-0">
                                                            20-22<sup>tm</sup>April</h6>
                                                    </div>
                                                    <div className="banner-content x-50 w-100 text-center">
                                                        <h4
                                                            className="banner-subtitle bg-primary d-inline-block mb-1 text-white lh-1 ls-normal text-uppercase font-weight-semi-bold">
                                                            Ultimate Sale</h4>
                                                        <h3
                                                            className="banner-title text-white text-uppercase font-weight-bold lh-1 ls-l mb-0">
                                                            Up To 70%</h3>
                                                        <p className="text-white font-weight-normal ls-normal mb-2">
                                                            Discount Selected Items</p>
                                                        <ALink href={ { pathname: "/shop", query: { category: '' } } }
                                                            className="btn btn-white btn-link btn-underline d-inline-block">Shop Now<i
                                                                className="d-icon-arrow-right"></i></ALink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="submenu">
                                    <ALink href={ { pathname: "/shop", query: { category: 'computer-and-electronics' } } }><i className="d-icon-camera1"></i>Electronics</ALink>
                                    <div className="megamenu">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <h4 className="menu-title">Computers</h4>
                                                <ul>
                                                    <li><ALink href="#">Riode</ALink></li>
                                                    <li><ALink href="#">Acer</ALink></li>
                                                    <li><ALink href="#">American Dreams</ALink></li>
                                                    <li><ALink href="#">Apple</ALink></li>
                                                    <li><ALink href="#">Arcade1UP</ALink></li>
                                                    <li><ALink href="#">Samsung</ALink></li>
                                                    <li><ALink href="#">HP</ALink></li>
                                                    <li><ALink href="#">Sonny</ALink></li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-4">
                                                <h4 className="menu-title">Tablets</h4>
                                                <ul>
                                                    <li><ALink href="#">Ipad</ALink></li>
                                                    <li><ALink href="#">Dell</ALink></li>
                                                    <li><ALink href="#">Lenovo</ALink></li>
                                                    <li><ALink href="#">Peach</ALink></li>
                                                    <li><ALink href="#">Macintosh</ALink></li>
                                                    <li><ALink href="#">5G</ALink></li>
                                                    <li><ALink href="#">Samsung</ALink></li>
                                                    <li><ALink href="#">Sonny</ALink></li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="menu-banner menu-banner3 banner banner-fixed">
                                                    <figure>
                                                        <LazyLoadImage effect="opacity" src="./images/menu/banner-3.jpg" alt="Banner" width="280"
                                                            height="374" />
                                                    </figure>
                                                    <div className="banner-content banner-date">
                                                        <h6
                                                            className=" text-white text-right font-weight-bold text-uppercase lh-1 mb-0">
                                                            20-22<sup>tm</sup>April</h6>
                                                    </div>
                                                    <div className="banner-content x-50 w-100 text-center">
                                                        <h4
                                                            className="banner-subtitle bg-primary d-inline-block mb-1 text-white lh-1 ls-normal text-uppercase font-weight-semi-bold">
                                                            Ultimate Sale</h4>
                                                        <h3
                                                            className="banner-title text-white text-uppercase font-weight-bold lh-1 ls-l mb-0">
                                                            Up To 70%</h3>
                                                        <p className="text-white font-weight-normal ls-normal mb-2">
                                                            Discount Selected Items</p>
                                                        <ALink href="/shop"
                                                            className="btn btn-white btn-link btn-underline d-inline-block">Shop Now<i
                                                                className="d-icon-arrow-right"></i></ALink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <ALink href={ { pathname: "/shop", query: { category: 'backpacks-and-fashion-bags' } } }><i className="d-icon-officebag"></i>Backpacks &amp;
                                            Fashion bags</ALink>
                                </li>
                                <li>
                                    <ALink href={ { pathname: "/shop", query: { category: 'gaming-and-accessories' } } }><i className="d-icon-gamepad1"></i>Gaming &amp;
                                            Accessories
                                        </ALink>
                                </li>
                                <li><ALink href={ { pathname: "/shop", query: { category: 'sporting-goods' } } }><i className="d-icon-basketball1"></i>Sporting Goods</ALink>
                                </li>
                                <li>
                                    <ALink href={ { pathname: "/shop", query: { category: 'computer' } } }><i className="d-icon-desktop"></i>Computer
                                        </ALink>
                                </li>
                                <li>
                                    <ALink href={ { pathname: "/shop", query: { category: 'home-and-kitchen' } } }><i className="d-icon-cook"></i>Home &amp; Kitchen</ALink>
                                </li>
                                <li><ALink href="#" className="menu-title">Today Coupon Deals</ALink>
                                </li>
                                <li>
                                    <ALink href={ { pathname: "/shop", query: { category: 'backpacks-and-fashion-bags' } } }>
                                        <i className="d-icon-card"></i>Backpacks &amp; Fashion bags
                                        </ALink>
                                </li>
                                <li>
                                    <ALink href="#">
                                        <i className="d-icon-card"></i>Daily Deals
                                        </ALink>
                                </li>
                            </ul>
                        </div>
                    </Reveal>

                    <div className="grid-item height-x2">
                        <Reveal keyframes={ fadeIn } delay={ 200 } triggerOnce>
                            <OwlCarousel adClass="intro-slider owl-theme owl-dot-inner owl-dot-dark owl-full-height animation-slider" options={ introSlider }>
                                <div className="intro-slide1 banner banner-fixed banner-radius"
                                    style={ { backgroundColor: "#f6f5f7" } }>
                                    <figure>
                                        <img src="./images/home/slides/1.jpg" width="580" height="508"
                                            alt="banner" />
                                    </figure>
                                    <div className="banner-content y-50">
                                        <Reveal keyframes={ fadeInLeftShorter } duration={ 1000 }>
                                            <h4 className="banner-subtitle text-uppercase font-weight-normal ls-normal">
                                                <span className="text-primary font-weight-bold">01.&nbsp;&nbsp;</span>BEST
                                                SELLERS STORE</h4>
                                        </Reveal>

                                        <Reveal keyframes={ fadeInLeftShorter } duration={ 1000 } delay={ 400 }>
                                            <h3 className="banner-title font-weight-bold ls-md">
                                                Our greatest hits <br />for women</h3>
                                        </Reveal>

                                        <Reveal keyframes={ fadeInUpShorter } duration={ 1000 } delay={ 700 }>
                                            <p className="font-weight-normal ls-normal lh-1 text-uppercase text-dark mb-5">
                                                Starting At <strong className="text-primary">$24.00</strong></p>
                                        </Reveal>

                                        <Reveal keyframes={ fadeInUpShorter } duration={ 1000 } delay={ 900 }>
                                            <ALink href="/shop" className="btn btn-dark btn-sm btn-rounded">Shop
                                                now</ALink>
                                        </Reveal>
                                    </div>
                                </div>
                                <div className="intro-slide2 banner banner-fixed banner-radius"
                                    style={ { backgroundColor: "#e4e8ec" } }>
                                    <figure>
                                        <img src="./images/home/slides/2.jpg" width="580" height="508"
                                            alt="banner" />
                                    </figure>
                                    <div className="banner-content y-50">
                                        <Reveal keyframes={ fadeInLeftShorter } delay={ 200 }>
                                            <h4 className="banner-subtitle text-uppercase font-weight-normal ls-normal">
                                                <span className="text-primary font-weight-bold">02.&nbsp;</span>BEST
                                                    SELLERS STORE</h4>

                                            <Reveal keyframes={ fadeInLeftShorter } delay={ 200 }>
                                                <h3 className="banner-title font-weight-bold ls-md mb-2">Big Sale <br />for women</h3>
                                            </Reveal>

                                            <p className="text-uppercase text-dark ml-1">
                                                Up To<strong
                                                    className="text-primary ml-1 mr-1">$24.00</strong><strong>Off</strong>
                                            </p>
                                            <ALink className="btn btn-white btn-sm btn-rounded btn-shadow" href="/shop">Shop now</ALink>
                                        </Reveal>
                                    </div>
                                </div>
                                <div className="intro-slide3 banner banner-fixed banner-radius"
                                    style={ { backgroundColor: "#1d1b1a" } }>
                                    <figure>
                                        <img src="./images/home/slides/3.jpg" width="580" height="508"
                                            alt="Banner" />
                                    </figure>
                                    <div className="banner-content y-50">
                                        <Reveal keyframes={ fadeInUpShorter } duration={ 1000 }>
                                            <h4 className="banner-subtitle text-uppercase text-white font-weight-normal ls-normal">
                                                <span className="text-primary font-weight-bold">03.&nbsp;</span>BEST SELLERS
                                                STORE</h4>
                                        </Reveal>

                                        <Reveal keyframes={ fadeInUpShorter } duration={ 1000 } delay={ 400 }>
                                            <h3 className="banner-title font-weight-bold text-white ls-md">
                                                Fashionable <br />for men's</h3>
                                        </Reveal>

                                        <Reveal keyframes={ fadeInUpShorter } duration={ 1000 } delay={ 600 }>
                                            <p className="font-weight-normal ls-normal lh-1 text-uppercase text-white mb-5">
                                                Starting At <strong className="text-primary">$24.00</strong></p>
                                        </Reveal>

                                        <Reveal keyframes={ fadeInUpShorter } duration={ 1000 } delay={ 800 }>
                                            <ALink href="/shop" className="btn btn-white btn-outline btn-sm btn-rounded">Shop
                                                now</ALink>
                                        </Reveal>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </Reveal>
                    </div>

                    <div className="grid-item height-x1">
                        <Reveal keyframes={ fadeInLeftShorter } delay={ 200 } triggerOnce>
                            <div className="intro-banner intro-banner1 banner banner-fixed banner-radius 
                                    overlay-dark" style={ { backgroundColor: "#eeeeee" } }>
                                <ALink href="#">
                                    <figure>
                                        <img src="./images/home/banners/1.jpg" width="280" height="241"
                                            alt="banner" />
                                    </figure>
                                </ALink>
                                <div className="banner-content">
                                    <h4 className="banner-subtitle text-uppercase font-weight-normal ls-s">
                                        New Arrivals</h4>
                                    <h3 className="banner-title font-weight-normal text-capitalize ls-md">Spring
                                            Essentials</h3>
                                    <ALink href="/shop" className="btn btn-dark btn-link btn-underline">Shop Now<i
                                        className="d-icon-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="grid-item height-x1">
                        <Reveal keyframes={ fadeInLeftShorter } delay={ 200 } triggerOnce>
                            <div className="intro-banner intro-banner2 banner banner-fixed banner-radius 
                                    overlay-light" style={ { backgroundColor: "#e0dfde" } }>
                                <ALink href="#">
                                    <figure>
                                        <img src="./images/home/banners/2.jpg" width="280" height="241"
                                            alt="banner" />
                                    </figure>
                                </ALink>
                                <div className="banner-content y-50">
                                    <h3 className="banner-title ls-m font-weight-normal mb-5">
                                        <strong className="text-uppercase">Cosmetics</strong><br />Collection
                                        </h3>
                                    <ALink href="/shop" className="btn btn-link btn-underline mb-1">Shop Now<i
                                        className="d-icon-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="grid-item height-x1 w-2">
                        <Reveal keyframes={ fadeInUpShorter } delay={ 200 } triggerOnce>
                            <div className="intro-banner intro-banner3 banner banner-fixed banner-radius 
                                    overlay-dark" style={ { backgroundColor: "#3a4146" } }>
                                <ALink href="#">
                                    <figure>
                                        <img src="./images/home/banners/3.jpg" width="580" height="241"
                                            alt="banner" />
                                    </figure>
                                </ALink>
                                <div className="banner-content y-50">
                                    <h4 className="banner-subtitle text-uppercase font-weight-bold text-primary">BLACK
                                            FRIDAY SALE</h4>
                                    <h3 className="banner-title text-white lh-1 font-weight-bold">Fingerprints Padlock
                                        </h3>
                                    <ALink href="/shop" className="btn btn-white btn-link btn-underline">Shop Now<i
                                        className="d-icon-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="grid-item height-x1">
                        <Reveal keyframes={ fadeInUpShorter } delay={ 200 } triggerOnce>
                            <div className="intro-banner intro-banner4 banner banner-fixed banner-radius h-100 
                                    overlay-light" style={ { backgroundColor: "#fef0e3" } }>
                                <figure>
                                    <img src="./images/home/banners/4.jpg" width="580" height="241"
                                        alt="banner" />
                                </figure>
                                <div className="banner-content w-100 x-50 y-50 text-center pl-2 pr-2">
                                    <h3 className="banner-title ls-m text-capitalize font-weight-bold">Our Brands</h3>
                                    <p className="mb-0 text-uppercase ls-m">
                                        <ALink href="#">New York</ALink> - <ALink href="#">Paris</ALink> - <ALink
                                            href="#">Barcelona</ALink><br />
                                        <ALink href="#">Milan</ALink> - <ALink href="#">Rome</ALink> - <ALink href="#">London</ALink> - <ALink
                                            href="#">Dubai</ALink><br />
                                        <ALink href="#">Moscow</ALink> - <ALink href="#">Tokyo</ALink> - <ALink
                                            href="#">Shanghai</ALink><br />
                                        <ALink href="#">Mumbai</ALink> - <ALink href="#">Melbourne</ALink>
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="grid-item height-x1">
                        <Reveal keyframes={ fadeInUpShorter } delay={ 200 } triggerOnce>
                            <div className="intro-banner intro-banner5 banner banner-fixed banner-radius 
                                    overlay-dark" style={ { backgroundColor: "#f3f5f3" } }>
                                <ALink href="#">
                                    <figure>
                                        <img src="./images/home/banners/5.jpg" width="280" height="241"
                                            alt="banner" />
                                    </figure>
                                </ALink>
                                <div className="banner-content">
                                    <h4 className="banner-subtitle text-uppercase font-weight-normal ls-s">
                                        20% Off</h4>
                                    <h3 className="banner-title ls-m font-weight-normal">Kids Store</h3>
                                    <ALink href="/shop" className="btn btn-link btn-underline">Shop Now<i
                                        className="d-icon-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default React.memo( IntroSection );