import React from 'react';
import Point from './Point.jsx';

const Key = (props) => (
  <g transform={`translate(${props.offset ? props.width / 4 : 0})`}>
    <g transform={`translate(${(1 - props.scale) * props.width / 3})`}>
        <Point y={props.height / 10} outlook={props.outlook} type={props.type} />
    </g>
    <g transform={`translate(${(1 - props.scale) * props.width - 20})`}>
      <text y={props.height / 10 - 10} fontWeight="bold" fontSize="13">{props.type === 'expected' ? 'Estimated' : 'Actual'}</text>
      <text y={props.height / 10 + 15} fontWeight="normal">{props.type === 'expected' ? '___' : 'Expected Jul 31, After Hours'}</text>
    </g>
  </g>
);

export default Key;