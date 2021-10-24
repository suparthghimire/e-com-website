import ALink from '~/components/features/custom-link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-middle">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="widget widget-about">
                                <ALink href="/" className="logo-footer">
                                    <img src="./images/home/logo-footer.png" alt="logo-footer" width="150"
                                        height="43" />
                                </ALink>
                                <div className="widget-body">
                                    <p className="ls-s">Fringilla urna porttitor rhoncus dolor purus<br />
                                        luctus venenatis lectus magna fringilla diam<br />
                                        maecenas ultricies mi eget mauris.</p>
                                    <ALink href="mailto:mail@riode.com">Riode@example.com</ALink>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">About Us</h4>
                                <ul className="widget-body">
                                    <li><ALink href="/pages/about-us">About Us</ALink></li>
                                    <li><ALink href="#">Order History</ALink></li>
                                    <li><ALink href="#">Returns</ALink></li>
                                    <li><ALink href="#">Custom Service</ALink></li>
                                    <li><ALink href="#">Terms &amp; Condition</ALink></li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Customer Service</h4>
                                <ul className="widget-body">
                                    <li><ALink href="#">Payment Methods</ALink></li>
                                    <li><ALink href="#">Money-back Guarantee!</ALink></li>
                                    <li><ALink href="#">Returns</ALink></li>
                                    <li><ALink href="#">Shipping</ALink></li>
                                    <li><ALink href="#">Terms and Conditions</ALink></li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">My Account</h4>
                                <ul className="widget-body">
                                    <li><ALink href="/pages/login">Sign in</ALink></li>
                                    <li><ALink href="/pages/cart">View Cart</ALink></li>
                                    <li><ALink href="/pages/wishlist">My Wishlist</ALink></li>
                                    <li><ALink href="#">Track My Order</ALink></li>
                                    <li><ALink href="#">Help</ALink></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-left">
                        <figure className="payment">
                            <img src="images/payment.png" alt="payment" width="159" height="29" />
                        </figure>
                    </div>
                    <div className="footer-center">
                        <p className="copyright">Riode eCommerce &copy; 2021. All Rights Reserved</p>
                    </div>
                    <div className="footer-right">
                        <div className="social-links">
                            <ALink href="#" className="social-link social-facebook fab fa-facebook-f"></ALink>
                            <ALink href="#" className="social-link social-twitter fab fa-twitter"></ALink>
                            <ALink href="#" className="social-link social-linkedin fab fa-linkedin-in"></ALink>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    )
}