import ALink from '~/components/features/custom-link';

export default function ShopBanner( props ) {
    const { subTitle = '', title = "Riode Shop", current = "Riode Shop" } = props;

    return (
        <div className="page-header" style={ { backgroundImage: `url( ./images/home/shop-banner.jpg )`, backgroundColor: "#3C63A4" } }>
            {
                subTitle ? <h3 className="page-subtitle text-dark">{ subTitle }</h3> : ''
            }
            {
                title ? <h1 className="page-title text-dark">{ title }</h1> : ''
            }
            <ul className="breadcrumb ls-m">
                <li><ALink href="/"><i className="d-icon-home text-dark"></i></ALink></li>
                <li className="delimiter text-dark">/</li>
                <li className="text-dark">{ current }</li>
            </ul>
        </div>
    )
}