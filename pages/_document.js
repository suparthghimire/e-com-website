import Document, { NextScript, Head, Main, Html } from "next/document";
import { TITLE } from "~/config";
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <base href="/react/riode/demo-25/"></base> */}
          <base href="/"></base>
          <title>{TITLE}</title>
          <link rel="icon" href="images/icons/favicon_new.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"
          />
          <link rel="stylesheet" href="vendor/riode-fonts/riode-fonts.css" />
          <link
            rel="stylesheet"
            href="vendor/fontawesome-free/css/all.min.css"
          />
          <link
            rel="stylesheet"
            href="vendor/owl-carousel/owl.carousel.min.css"
          />
        </Head>

        <body>
          <Main />

          <script src="./js/jquery.min.js"></script>

          <NextScript />
        </body>
      </Html>
    );
  }
}
