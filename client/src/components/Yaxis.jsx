import React from 'react';

const Yaxis = (props) => {
  let points = props.data.reduce((a, b) => [...a, b.expected_eps, b.actual_eps], []);
  let max = Math.max(...points);
  let min = Math.min(...points);
  let resolution = 4;
  let axis = new Array(resolution).fill(0);
  axis[0] = min;
  axis[axis.length - 1] = max;
  let constant = props.height * (1 + props.scale) / 2;
  let coefficient = props.scale * props.height * -1 / (resolution - 1);
  let dollar = (n) => n < 0 ? `-$${Math.abs(n).toFixed(2)}` : `$${n.toFixed(2)}`;
  return (
    <g>
      {axis.map((label, index) => <text fill="#cbcbcd" key={index} y={constant + coefficient * index}>{label ? dollar(label) : dollar((min*(resolution - 1) + max) * index / resolution) }</text>)}
    </g>
  );
}

export default Yaxis;