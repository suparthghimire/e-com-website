import { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function MediaLightBox(props) {
  const { product } = props;
  const size = product.product_image.length;

  const [isOpen, setOpenState] = useState(false);
  const [index, setIndex] = useState(0);
  console.log(product);
  useEffect(() => {
    setOpenState(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    setIndex(props.index);
  }, [props.index]);

  const closeLightBox = () => {
    props.changeOpenState(false);
  };

  const setNextHandler = () => {
    setIndex((index + 1) % size);
  };

  const setPrevHandler = () => {
    setIndex((index + size - 1) % size);
  };

  // return <>{isOpen ? <div>Hello</div> : ""}</>;
  return (
    <>
      {isOpen ? (
        <Lightbox
          mainSrc={product.product_image[index].url}
          nextSrc={product.product_image[(index + 1) % size]?.url}
          prevSrc={product.product_image[(index - 1) % size]?.url}
          onCloseRequest={closeLightBox}
          onMovePrevRequest={setPrevHandler}
          onMoveNextRequest={setNextHandler}
          animationDisabled={false}
          animationDuration={300}
          imageTitle={product.name}
          imagePadding={80}
          clickOutsideToClose={true}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default MediaLightBox;
