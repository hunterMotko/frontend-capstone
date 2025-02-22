/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


// ------------------COMPONENT------------------ //

const FeaturesList = ({ features, relatedFeatures, main, related }) => {
  const [allFeatures, setAllFeatures] = useState([]);
  const [uniq, setUniq] = useState([]);
  const [total, setTotal] = useState({});
  const featNames = [];
  const shared = {};

  const unique = () => {
    allFeatures.forEach(feature => featNames.push(feature.feature))
  }

  const buildShared = () => {
    features.forEach(feature => {
      shared[feature.feature] = [feature.value, null];
    })
    relatedFeatures.forEach(feature => {
      if (shared[feature.feature]) {
        shared[feature.feature][1] = feature.value;
      } else {
        shared[feature.feature] = [null, feature.value];
      }
    })
    setTotal(shared);
  }

  useEffect(() => {
    buildShared()
    setAllFeatures([...features, ...relatedFeatures])
  }, [features])

  useEffect(() => {
    unique();
    setUniq([...new Set(featNames)]);
  }, [allFeatures])

  return (
    <div>
      <table>
        <thead>
          <tr style={{'fontSize': '20px', 'textAlign': 'center'}}>
            <th style={{'borderRight': '1px solid black', 'borderBottom': '1px solid black'}}>{main}</th>
            <th style={{'borderRight': '1px solid black', 'borderBottom': '1px solid black'}}>Features</th>
            <th style={{'borderRight': '1px solid black', 'borderBottom': '1px solid black'}}>{related}</th>
          </tr>
        </thead>
        <tbody>
        {uniq.map(feature => {
          return (
            <tr key={feature}>
              <td style={{'borderRight': '1px solid black', 'borderBottom': '1px solid black', 'textAlign': 'right'}}>{total[feature][0]}</td>
              <td style={{'fontWeight': 'bold', 'borderRight': '1px solid black', 'borderBottom': '1px solid black','textAlign': 'center'}}>{feature}</td>
              <td style={{'borderRight': '1px solid black', 'borderBottom': '1px solid black'}}>{total[feature][1]}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default FeaturesList;
