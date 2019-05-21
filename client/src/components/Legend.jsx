import React from 'react';
import Point from './Point.jsx';
import Key from './Key.jsx';

const Legend = (props) => {
  return (
    <svg height={props.height / 5} width={props.width}>
      <Key height={props.height} width={props.width} scale={props.scale} outlook={props.outlook} type={`expected`}/>
      <Key height={props.height} width={props.width} scale={props.scale} outlook={props.outlook} type={`actual`} offset={1}/>
    </svg>
  );
};

export default Legend;