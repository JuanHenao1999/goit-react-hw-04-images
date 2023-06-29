import { useState } from "react";
import css from "./ImageGalleryItem.module.css";
import { Modal } from "../Modal/Modal";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ url, alt, largeImage }) => {

  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal(prevState => !prevState);
  };

  return (
    <>
      <li className={css["imageGalleryItem"]} onClick={toggleModal}>
        <img
          className={css["imageGalleryItem-image"]}
          src={url}
          alt={alt}
          loading="lazy"
        />
      </li>
      {isShowModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={alt} width="800px" />
        </Modal>
      )}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  largeImage: PropTypes.string,
}