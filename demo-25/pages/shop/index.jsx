import React from 'react';
import Helmet from 'react-helmet';

import ALink from '~/components/features/custom-link';

import SidebarFilterOne from '~/components/partials/shop/sidebar/sidebar-filter-one'
import ProductListOne from '~/components/partials/shop/product-list/product-list-one';

function Shop() {
    return (
        <main className="main shop">
            <Helmet>
                <title>Riode React eCommerce Template - Shop Page</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Shop Page</h1>

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb breadcrumb-sm">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li>Shop</li>
                    </ul>
                </div>
            </nav>

            <div className="page-content mb-10">
                <div className="container">
                    <div className="row gutter-lg main-content-wrap">
                        <SidebarFilterOne type="banner" />

                        <div className="col-lg-9 main-content">
                            <div className="shop-banner banner" style={ { backgroundImage: "url(./images/home/shop-banner.jpg)", backgroundColor: "#f2f2f3" } }>
                                <div className="banner-content">
                                    <h4 className="banner-subtitle font-weight-bold text-grey text-uppercase">Flash Sales</h4>
                                    <h1 className="banner-title font-weight-bold ls-m">Jackets Collection</h1>
                                    <p className="font-primary text-uppercase text-dark lh-1"><strong>Up To 70</strong>% Discount</p>
                                    <ALink href="#" className="btn btn-outline btn-dark btn-rounded">Shop now</ALink>
                                </div>
                            </div>

                            <ProductListOne type="banner" />
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default React.memo( Shop );