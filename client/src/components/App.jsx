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
      width: 680,
      data: [],
      xScale: 0.88,
      yScale: 0.5
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    let stock = this.props.match.params.stock;
    if (stock) {
      return this.setState({stock}, () => this.fetchData());
    }
    this.fetchData();
  }

  fetchData() {
    fetch(`/api/stocks/${this.state.stock}/earnings`)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
  }

  calcY(point) {
    let points = this.state.data.reduce((a, b) => [...a, b.expected_eps, b.actual_eps], []);
    let max = Math.max(...points);
    let min = Math.min(...points);
    let range = max - min ? max - min : 0.01;
    return this.state.height * (1 - this.state.yScale) / 2 + (this.state.height * this.state.yScale / range) * (max - point);
  }

  generatePoints() {
    return this.state.data.map((point, index) => {
      let x = this.state.width * index * this.state.xScale / 8 + this.state.width * (1-this.state.xScale);
      let actY = this.calcY(point.actual_eps);
      let expY = this.calcY(point.expected_eps);
      return (
        <g key={index}>
          <Point x={x} y={actY} type={'actual'} outlook={this.state.outlook}/>
          <Point x={x} y={expY} type={'expected'} outlook={this.state.outlook}/>
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
        <Xaxis data={this.state.data} width={this.state.width} height={this.state.height} scale={this.state.xScale}/>
        <Yaxis data={this.state.data} width={this.state.width} height={this.state.height} scale={this.state.yScale}/>
      </svg>
    </div>
    );
  }
}

export default App;