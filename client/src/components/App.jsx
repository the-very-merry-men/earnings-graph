import Point from './Point.jsx';
import $ from 'jquery';
import Yaxis from './Yaxis.jsx';
import Xaxis from './Xaxis.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: 'strm',
            outlook: 'bullish',
            height: 300,
            width: 550,
            data: []
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(`/api/stock/${this.state.stock}/earnings`)
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
                <g>
                    <Point x={x} y={actY} type={'actual'} outlook={this.state.outlook} />
                    <Point x={x} y={expY} type={'expected'} outlook={this.state.outlook} />
                </g>
            )
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
                </svg>
            </div>
        );
    }
}

export default App;