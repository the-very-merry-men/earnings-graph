import React, { Component } from 'react';
import Point from './Point.jsx';
import Yaxis from './Yaxis.jsx';
import Xaxis from './Xaxis.jsx';
import Legend from './Legend.jsx';

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
    let match = window.location.pathname.match(/\/stocks\/(\w+)/i);
    const stock = match ? match[1] : null;
    if (stock) {
      return this.setState({stock}, () => this.fetchData());
    }
    this.fetchData();
  }

  fetchData() {
    //const url = 'http://ec2-52-14-233-205.us-east-2.compute.amazonaws.com:3000';
    fetch(`/api/stocks/${this.state.stock}/earnings`)
      .then(res => {
        consol
        res.json()
      })
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
  }

  calcY(point) {
    const points = this.state.data.reduce((a, b) => [...a, b.expected_eps, b.actual_eps], []);
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min ? max - min : 0.01;
    return this.state.height * (1 - this.state.yScale) / 2 + (this.state.height * this.state.yScale / range) * (max - point);
  }

  generatePoints() {
    return this.state.data.map((point, index) => {
      const x = this.state.width * index * this.state.xScale / 8 + this.state.width * (1-this.state.xScale);
      const actY = this.calcY(point.actual_eps);
      const expY = this.calcY(point.expected_eps);
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
      <Legend height={this.state.height} width={this.state.width} scale={this.state.xScale} outlook={this.state.outlook}/>
    </div>
    );
  }
}

export default App;