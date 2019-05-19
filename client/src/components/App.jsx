import React, { Component } from 'react';
import Point from './Point.jsx';
import Yaxis from './Yaxis.jsx';
import Xaxis from './Xaxis.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: 'inst',
            outlook: 'bull',
            height: 300,
            width: 550,
            data: []
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        let stock = this.props.match.params.stock;
        this.fetchData(stock);
    }

    fetchData(stock) {
        // debugger;
        fetch(`/api/stocks/${stock}/earnings`)
            .then(res => res.json())
            .then(data => this.setState({ data }));
    }

    calcY(point) {
        let points = this.state.data.reduce((a, b) => [...a, b.expected_eps, b.actual_eps], []);
        let max = Math.max(...points);
        let min = Math.min(...points);
        let range = max - min ? max - min : 0.01;
        let scale = 0.3;
        return this.state.height * (1 - scale) / 2 + (this.state.height * scale / range) * (max - point);
    }

    generatePoints() {
        return this.state.data.map((point, index) => {
            let x = this.state.width * index / 8 + this.state.width * 0.05;
            let actY = this.calcY(point.actual_eps);
            let expY = this.calcY(point.expected_eps);
            return (
                <g key={index}>
                    <Point x={x} y={actY} type={'actual'} outlook={this.state.outlook} />
                    <Point x={x} y={expY} type={'expected'} outlook={this.state.outlook} />
                </g>
            );
        });
    }

    render() {
        
        return (
            <div>
                <h1>Earnings</h1>
                <svg height={this.state.height} width={this.state.width}>
                    <g>
                        {this.state.data ? this.generatePoints() : null}
                    </g>
                    <Xaxis/>
                    <Yaxis/>
                </svg>
            </div>
        );
    }
}

export default App;