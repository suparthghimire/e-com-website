import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import { headerCategories } from '~/utils/data/menu';

function MobileMenu( props ) {
    const [ search, setSearch ] = useState( "" );
    const router = useRouter();

    useEffect( () => {
        window.addEventListener( 'resize', hideMobileMenuHandler );
        document.querySelector( "body" ).addEventListener( "click", onBodyClick );

        return () => {
            window.removeEventListener( 'resize', hideMobileMenuHandler );
            document.querySelector( "body" ).removeEventListener( "click", onBodyClick );
        }
    }, [] )

    useEffect( () => {
        setSearch( "" );
    }, [ router.query.slug ] )

    const hideMobileMenuHandler = () => {
        if ( window.innerWidth > 991 ) {
            document.querySelector( 'body' ).classList.remove( 'mmenu-active' );
        }
    }

    const hideMobileMenu = () => {
        document.querySelector( 'body' ).classList.remove( 'mmenu-active' );
    }

    function onSearchChange( e ) {
        setSearch( e.target.value );
    }

    function onBodyClick( e ) {
        if ( e.target.closest( '.header-search' ) ) return e.target.closest( '.header-search' ).classList.contains( 'show-results' ) || e.target.closest( '.header-search' ).classList.add( 'show-results' );

        document.querySelector( '.header-search.show' ) && document.querySelector( '.header-search.show' ).classList.remove( 'show' );
        document.querySelector( '.header-search.show-results' ) && document.querySelector( '.header-search.show-results' ).classList.remove( 'show-results' );
    }

    function onSubmitSearchForm( e ) {
        e.preventDefault();
        router.push( {
            pathname: '/shop',
            query: {
                search: search
            }
        } );
    }

    return (
        <div className="mobile-menu-wrapper">
            <div className="mobile-menu-overlay" onClick={ hideMobileMenu }>
            </div>

            <ALink className="mobile-menu-close" href="#" onClick={ hideMobileMenu }><i className="d-icon-times"></i></ALink>

            <div className="mobile-menu-container scrollable">
                <form action="#" className="input-wrapper" onSubmit={ onSubmitSearchForm }>
                    <input type="text" className="form-control" name="search" autoComplete="off" value={ search } onChange={ onSearchChange }
                        placeholder="Search your keyword..." required />
                    <button className="btn btn-search" type="submit">
                        <i className="d-icon-search"></i>
                    </button>
                </form>

                <ul className="mobile-menu mmenu-anim">
                    <li><ALink href="#" className="menu-title">Browse Our Categories</ALink></li>
                    {
                        headerCategories.map( cat =>
                            <li key={ `mobile-cat-${ cat.slug }` }>
                                <ALink href={ { pathname: "/shop", query: { category: cat.slug } } }><i className={ cat.icon }></i>{ cat.title }</ALink>
                            </li>
                        ) }
                    <li><ALink href="#" className="menu-title">Today Coupon Deals</ALink>
                    </li>
                    <li>
                        <ALink href={ { pathname: '/shop', query: { category: 'backpacks-and-fashion-bags' } } }>
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
        </div>
    )
}

export default React.memo( MobileMenu );