import './App.css';
import BusStop from './components/BusStop';
import {useState, useEffect} from 'react'

function App() {

  const [ids, setIds] = useState([])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ids = params.get("ids").split(',');
    setIds(ids);
  }, [])

  return (
    <div className="App">
      { ids.map(id => <BusStop key={ id } id={id} />) }
    </div>
  );
}

export default App;
