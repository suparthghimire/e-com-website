import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { Magnifier } from "react-image-magnifiers";
import Modal from "react-modal";
import imagesLoaded from "imagesloaded";
import { GET_SINGLE_PRODUCT } from "~/api/queries";
// import { GET_PRODUCT } from '~/server/queries';
// import withApollo from '~/server/apollo';

import OwlCarousel from "~/components/features/owl-carousel";

import DetailOne from "~/components/partials/product/detail/detail-one";

import { modalActions } from "~/store/modal";

import { mainSlider3 } from "~/utils/data/carousel";

const customStyles = {
  content: {
    position: "relative",
  },
  overlay: {
    background: "rgba(0,0,0,.4)",
    zIndex: "10000",
    overflowX: "hidden",
    overflowY: "auto",
  },
};

Modal.setAppElement("#__next");

function Quickview(props) {
  const { slug, closeQuickview, isOpen } = props;
  const [loaded, setLoadingState] = useState(false);
  const { data, status } = useQuery(
    ["single-product", { slug }],
    GET_SINGLE_PRODUCT
  );
  const router = useRouter();
  const product = data;

  useEffect(() => {
    isOpen && closeQuickview() && setLoadingState(false);
    router.events.on("routeChangeStart", closeQuickview);

    return () => {
      closeQuickview();
      router.events.off("routeChangeStart", closeQuickview);
    };
  }, []);

  if (slug === "" || !data) return "";

  const closeQuick = () => {
    document.querySelector(".ReactModal__Overlay").classList.add("removed");
    document.querySelector(".quickview-modal").classList.add("removed");
    setLoadingState(false);
    setTimeout(() => {
      closeQuickview();
    }, 330);
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="QuickView"
      onRequestClose={closeQuick}
      shouldFocusAfterRender={false}
      style={customStyles}
      className="product product-single row product-popup quickview-modal modal-height"
      id="product-quickview"
    >
      <>
        <div className={`row p-0 m-0 ${status !== "loading" ? "" : "d-none"}`}>
          <div className="col-md-6">
            <div className="product-gallery mb-md-0 pb-0">
              <OwlCarousel
                adClass="product-single-carousel owl-theme owl-nav-inner"
                options={mainSlider3}
              >
                {product &&
                  product.product_image.map((item, index) => (
                    <Magnifier
                      key={"quickview-image-" + index}
                      imageSrc={item.url}
                      imageAlt="magnifier"
                      largeImageSrc={item.url}
                      dragToMove={false}
                      mouseActivation="hover"
                      cursorStyleActive="crosshair"
                      className="product-image large-image"
                    />
                  ))}
              </OwlCarousel>
            </div>
          </div>

          <div className="col-md-6">
            <DetailOne product={data} adClass="scrollable pr-3" isNav={false} />
          </div>
        </div>

        <button
          title="Close (Esc)"
          type="button"
          className="mfp-close p-0"
          onClick={closeQuick}
        >
          <span>×</span>
        </button>
      </>
      {status === "loading" ? (
        <div className="product row p-0 m-0 skeleton-body mfp-product">
          <div className="col-md-6">
            <div className="skel-pro-gallery"></div>
          </div>

          <div className="col-md-6">
            <div className="skel-pro-summary"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    slug: state.modal.singleSlug,
    isOpen: state.modal.quickview,
  };
}

export default connect(mapStateToProps, {
  closeQuickview: modalActions.closeQuickview,
})(Quickview);
