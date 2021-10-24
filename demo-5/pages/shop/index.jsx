import React from 'react';
import { Helmet } from 'react-helmet';

import ALink from '~/components/features/custom-link';

import SidebarFilterOne from '~/components/partials/shop/sidebar/sidebar-filter-one'
import ProductListOne from '~/components/partials/shop/product-list/product-list-one';

function ShopBoxedBanner() {
    return (
        <main className="main">
            <Helmet>
                <title>Riode React eCommerce Template - Shop Boxed Banner Page</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Shop Boxed Banner Page</h1>
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li>Shop</li>
                    </ul>
                </div>
            </nav>

            <div className="page-content mb-10 pb-7">
                <div className="container">
                    <div className="row main-content-wrap gutter-lg">
                        <SidebarFilterOne type="boxed" />

                        <div className="col-lg-9 main-content">
                            <div className="shop-banner banner"
                                style={ { backgroundImage: `url(./images/home/shop_banner.jpg)`, backgroundColor: "#EFEFEF" } }>
                                <div className="banner-content">
                                    <h1 className="banner-title ls-m text-uppercase"><strong
                                        className="mr-2">-50<sup>%</sup></strong><span
                                            className="font-weight-normal"><strong className="d-block">Sporting</strong>Goods
											Sale</span></h1>
                                    <h4 className="banner-subtitle text-body font-weight-normal">Spring/summer 2020
										collection</h4>
                                    <ALink href="/shop" className="btn btn-outline btn-dark btn-rounded">Shop now</ALink>
                                </div>
                            </div>

                            <ProductListOne type="boxed" />
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default React.memo( ShopBoxedBanner );