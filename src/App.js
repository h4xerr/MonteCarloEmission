import logo from './logo.svg';
import './App.css';

}
function App() {
  return (
    <div className="App">
    <h1>MOMO E GLUP</h1>
    </div>
  );
}

export default class App extends Component {
  componentDidMount() {
    console.log('I was triggered during componentDidMount')
  }

  render() {
    console.log('I was triggered during render')
    return (
      <div> I am the App component </div>
    )
  }
export default App;
