import { useState, useEffect } from "react";
import { Magnifier } from "react-image-magnifiers";

import MediaLightBox from "~/components/partials/product/light-box";
import { BASE_URL } from "~/config";

export default function MediaThree(props) {
  const { product } = props;
  const [index, setIndex] = useState(0);
  const [isOpen, setOpenState] = useState(false);
  // let lgImages = lgImages.slice( 0, 5 );

  useEffect(() => {
    setIndex(0);
  }, [window.location.pathname]);

  const changeOpenState = (openState) => {
    setOpenState(openState);
  };

  const openLightBox = (e) => {
    e.preventDefault();
    setIndex(parseInt(e.currentTarget.getAttribute("index")));
    setOpenState(true);
  };
  // lgImages.slice( 0, 5 )
  if (product.product_image.length === 0)
    return (
      <figure className="product-image mb-4">
        <img src="https://source.unsplash.com/1000x1000" alt="" />
      </figure>
    );
  return (
    <>
      <div className="product-gallery row pb-0">
        {product.product_image.map((image, index) =>
          index === 0 ? (
            <figure className="product-image mb-4" key={"image" + index}>
              <Magnifier
                //TODO ADD BASE URL after Images come from database
                imageSrc={image.url}
                imageAlt="magnifier"
                largeImageSrc={image.url}
                dragToMove={false}
                mouseActivation="hover"
                cursorStyleActive="crosshair"
                className="product-image large-image"
              />

              <div className="product-label-group">
                {product.stock === 0 ? (
                  <label className="product-label label-out">out</label>
                ) : (
                  ""
                )}

                {product.is_top ? (
                  <label className="product-label label-top">top</label>
                ) : (
                  ""
                )}

                {product.is_new ? (
                  <label className="product-label label-new">new</label>
                ) : (
                  ""
                )}

                {product.discount ? (
                  <label className="product-label label-sale">sale</label>
                ) : (
                  ""
                )}
              </div>

              <a
                href="#"
                className="product-image-full"
                onClick={openLightBox}
                index={index}
              >
                <i className="d-icon-zoom"></i>
              </a>
            </figure>
          ) : (
            <div
              className={`${index % 4 < 2 ? "col-sm-4" : "col-sm-8"}`}
              key={"image" + index}
            >
              <figure className="product-image mb-4">
                <Magnifier
                  //TODO: Add Base URL after Images have been uploaded
                  imageSrc={image.url}
                  imageAlt="magnifier"
                  largeImageSrc={image.url}
                  dragToMove={false}
                  mouseActivation="hover"
                  cursorStyleActive="crosshair"
                  className="product-image large-image"
                />
                <a
                  href="#"
                  className="product-image-full"
                  onClick={openLightBox}
                  index={index}
                >
                  <i className="d-icon-zoom"></i>
                </a>
              </figure>
            </div>
          )
        )}
      </div>
      {/* TODO: THIS CAN BE DONE IF IMAGES HAVE THEIR OWN API ENDPOINT */}
      <MediaLightBox
        isOpen={isOpen}
        changeOpenState={changeOpenState}
        index={index}
        product={product}
      />
    </>
  );
}
