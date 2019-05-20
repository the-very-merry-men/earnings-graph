import React, { Component } from 'react';

const Point = (props) => (
    <g>
        <circle cx={props.x} cy={props.y} r="7" fill={props.outlook === 'bull' ? 'green' : 'red'} style={props.type === 'expected' ? {opacity: 0.5} : {}}/> 
        {/* <rect width="10" height="5" x={props.x} y={props.y}>{props.value}</rect> */}
    </g>
);

export default Point;