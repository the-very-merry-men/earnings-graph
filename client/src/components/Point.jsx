import React, { Component } from 'react';

const Point = (props) => (
    <g>
        <circle cx={props.x} cy={props.y} r="7" fill={props.outlook === 'bull' ? '#21ce99' : '#f45531'} style={props.type === 'expected' ? {opacity: 0.3} : {}}/> 
    </g>
);

export default Point;