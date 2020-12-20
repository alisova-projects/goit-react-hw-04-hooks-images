// import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar';
import fetchPictures from '../ApiService';
import ImageGallery from '../ImageGallery';
import OnLoadMoreBtnClick from '../Button';
import LoaderSpinner from '../Loader';
import authContext from '../Context';
import Modal from '../Modal';
import StartPage from '../StartPage';

export default function ImageFinder() {
  const [pictureName, setPictureName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImgURL, setSelectedImageUrl] = useState('');

  useEffect(() => {
    if (!pictureName) {
      return;
    }
    setIsLoading(true);

    fetchPictures(pictureName, currentPage)
      .then(images => {
        setGallery(gallery => [...gallery, ...images]);
      })
      .catch(error => error)
      .finally(() => {
        setIsLoading(false);
      });
  }, [pictureName, currentPage]);

  const onLoadMoreBtnClick = () => {
    setCurrentPage(currentPage => currentPage + 1);

    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 130,
        behavior: 'smooth',
      });
    }, 600);
  };

  // const onLoadMoreBtnClick = () => {
  //   setCurrentPage(currentPage => currentPage + 1);

  //   const options = {
  //     top: null,
  //     behavior: 'smooth',
  //   };

  //   options.top = window.pageYOffset + document.documentElement.clientHeight;
  //   setTimeout(() => {
  //     window.scrollTo(options);
  //   }, 1000);
  // };
  const handleFormSubmit = query => {
    if (query !== pictureName) {
      setGallery([]);
      setPictureName(query);
      setCurrentPage(1);
    }
  };

  const handleImageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    e.preventDefault();
    const fullImgLink = e.target.getAttribute('data-large');

    setSelectedImageUrl(fullImgLink);
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);

    if (isModalOpen) {
      document.body.style.overflowY = 'hidden';
    }
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {gallery.length === 0 && <StartPage />}
      <ToastContainer />
      <div className="Wrapper">{isLoading && <LoaderSpinner />}</div>
      <authContext.Provider value={handleImageClick}>
        {pictureName && <ImageGallery gallery={gallery} />}
      </authContext.Provider>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img src={selectedImgURL} alt="fullsizeImage"></img>
        </Modal>
      )}
      <div className="BtnWrapper">
        {pictureName && gallery.length > 11 && (
          <OnLoadMoreBtnClick onClick={onLoadMoreBtnClick} />
        )}
      </div>
    </div>
  );
}
