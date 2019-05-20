import React from 'react';

const Xaxis = (props) => (
  <g>
    {props.data.map((entry, index) => <text key={index} x={props.width * index * props.scale / 8 + props.width * (1 - props.scale) - 20} y={props.height * 0.95}>Q{entry.quarter} {entry.year}</text>)}
  </g>
);

export default Xaxis;