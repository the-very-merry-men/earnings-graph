import Point from './Point.jsx';
import Yaxis from './Yaxis.jsx';
import Xaxis from './Xaxis.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let height = 200;
        let width = 200;
        return (
            <div>
                <h1>Earnings</h1>
                <svg height={height} width={width}>
                    <g transform={`translate(${height/2}, ${width/2})`}>
                        <Point x='4' y='5' type='expected' outlook='bullish'/>   
                    </g>
                    <g>
                        <text x="0" y="200">15</text>
                    </g>
                </svg>
            </div>
        );
    }
}

export default App;