import React from 'react';

const Xaxis = (props) => (
  <g>
    {props.data.map((entry, index, arr) => <text fill="#cbcbcd" key={index} x={props.width * index * props.scale / arr.length + props.width * (1 - props.scale) - 20} y={props.height * 0.95}>Q{entry.quarter} {entry.year}</text>)}
  </g>
);

export default Xaxis;