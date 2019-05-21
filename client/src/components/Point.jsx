import React, { Component } from 'react';

const Point = (props) => (
    <g>
        <circle cx={props.x} cy={props.y} r="7" fill={props.outlook === 'bull' ? 'green' : 'red'} style={props.type === 'expected' ? {opacity: 0.5} : {}}/> 
    </g>
);

export default Point;