/* eslint-disable */
import React, {useState} from 'react';
import styled from 'styled-components';
import {DefaultGallery, Image} from './ImageGalleryStyles.jsx';

const DefaultView = ({image, onGalleryButtonClick, currentView, onImageClick}) => {
  if (currentView === 'default') {
    return (
      <DefaultGallery>
        <button className='image-left' onClick={(event) => onGalleryButtonClick(event)}>{String.fromCharCode(0x2B05)}</button>
        <Image src={image.url} onClick={() => onImageClick(image)}></Image>
        <button className='image-right' onClick={(event) => onGalleryButtonClick(event)}>{String.fromCharCode(0x2B95)}</button>
      </DefaultGallery>
    )
  }
  return null;
}

export default DefaultView;

// const [fade, setFade] = useState(false);
// onAnimationEnd={setFade(true)}