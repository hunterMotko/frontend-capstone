/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Comparison from '../comparison/Comparison.jsx';
import 'whatwg-fetch';
import StarsContainer from '../../common/StarsContainer.jsx';
import { ProductContext } from '../../context/Product';

const placeholder = 'https://images.unsplash.com/photo-1546213290-e1b492ab3eee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3174&q=80';


// -------------------STYLES------------------- //

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: end;
  align-items: center;
  border: 2px solid rgb(207, 106, 48);
  border-radius: 5px;
  margin-right: 10px;
  margin-left: 10px;
  font-family:'Roboto',sans-serif;
  &:hover {
    border: 2px solid rgb(59, 167, 184);
    box-shadow: 0 0 5px rgb(59, 167, 184);
  }
`;

const ImageStyle = styled.div`
  background-image: url(${props => props.src});
  height: 350px;
  max-width: 300px;
  min-width: 300px;
  background-position: center;
  background-size: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const IconStyle = styled.i`
  display: flex;
  justify-content: end;
  margin-right: 0.3em;
  font-size: 30px;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 300px;
  justify-content: space-between;
`;

const CategoryStyle = styled.div`
  display: flex;
  padding-left: 5px;
  padding-top: 5px;
  align-self: start;
  font-family:'Roboto',sans-serif;
  font-weight: small;
`;

const NameStyle = styled.div`
  display: flex;
  align-self: center;
  font-family:'Roboto',sans-serif;
  font-weight: bold;
`;

const SalePrice = styled.div`
  color: #b50000;
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
`;


// ------------------COMPONENT------------------ //

const RelatedProductCard = ({ prod, id }) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [style, setStyle] = useState([]);
  const [image, setImage] = useState('');
  const [features, setFeatures] = useState([]);
  const [mainFeatures, setMainFeatures] = useState([]);
  const [comparisonModal, setComparisonModal] = useState(false);
  const {currentItem, setCurrentItem, setProductId} = useContext(ProductContext);

  const getProduct = () => {
    fetch(`${process.env.API_URI}/products/${prod}`, { method: 'GET', headers: { Authorization: process.env.API_KEY } })
      .then((response) => {
        response.json().then(result => {
          setCurrentProduct(result);
          setName(result.name);
          setCategory(result.category);
          setFeatures(result.features);
        })
      })
  };

  const getStyle = () => {
    fetch(`${process.env.API_URI}/products/${prod}/styles`, { method: 'GET', headers: { Authorization: process.env.API_KEY } })
      .then((response) => {
        response.json().then(result => {
          setStyle(result.results[0]);
          setImage(result.results[0].photos[0].thumbnail_url);
        })
      })
  }

  const getFeatures = (id) => {
    fetch(`${process.env.API_URI}/products/${id}`, {
      method: 'GET',
      headers: {
        Authorization: process.env.API_KEY
      }
    })
      .then(response => response.json())
      .then(results => {
        setMainFeatures(results.features);
      })
      .catch(err => console.log(`Error getting features: ${err}`))
  }


  useEffect(() => {
    getProduct();
    getStyle();
    if (id) {
      getFeatures(id);
    }
  }, [id])

  const starClick = () => {
    setComparisonModal(true);
  }

  const close = () => {
    setComparisonModal(false);
  }

  const clickedCard = () => {
    setCurrentItem(currentProduct);
    setProductId(currentProduct.id);
  }


  return (
    <CardStyle>
      {
        image ?
        <div>
          <ImageStyle src={image} alt="related card image">
            <IconStyle onClick={starClick}>&#11088;</IconStyle>
          </ImageStyle>
        </div> :
        <div>
          <ImageStyle src={placeholder} alt="related card placeholder image">
            <IconStyle onClick={starClick}>&#11088;</IconStyle>
          </ImageStyle>
        </div>
      }
      {
        comparisonModal &&
        <Comparison show={comparisonModal} close={close} name={name} currentItem={currentItem} id={id} relatedFeatures={features} mainFeatures={mainFeatures}/>
      }
      <InnerDiv onClick={clickedCard}>
        <CategoryStyle className="product-category">{category.toUpperCase()}</CategoryStyle>
        <StarsContainer currentItem={currentProduct} starsAndReviews={false} singleReview={false}/>
      </InnerDiv>
      <NameStyle className="product-name" onClick={clickedCard}>{name}</NameStyle>
      { style.sale_price ? <><SalePrice className="price">SALE ${style.sale_price}</SalePrice><OriginalPrice className="price">${style.original_price}</OriginalPrice></> : <div className="price">${style.original_price}</div>}
    </CardStyle>
  );
}

export default RelatedProductCard;