import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [tileArr, setTileArr] = useState([]);

  const createTile = () => {
    const time = new Date()
    setTileArr([{ id:uuidv4(), title:'New Title', description:'New Desc', time:time.toLocaleString() },...tileArr])
  }

  const editTile = () => {

  }

  const removeTile = (id) => {
    setTileArr(tileArr.filter((tile) => tile.id !== id ))
  }
  return (
    <div className="App">
      <h1>IDEA BOARD</h1>
      <button onClick={() => createTile()}>Create New Idea</button>
        <div className="flex-container">
          <div className="tiles">
            {tileArr.map((tile) => (
              <div className="tile" key={tile.id}>
                <input className="tile-title" onChange={(e) => e.target.value}placeholder="Title"></input>
                <textarea
                maxLength="140" className="tile-description" placeholder="Description" onChange={(e) => e.target.value}></textarea>
                <div className="tile-bottom-cont">
                  <p>{tile.time}</p>
                  <button onClick={() => removeTile(tile.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default App;
