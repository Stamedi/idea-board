import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [tileArr, setTileArr] = useState([]);

  const createTile = () => {
    const time = new Date()
    setTileArr([...tileArr, { id:uuidv4(), title:'New Title', description:'New Desc', time:time.toLocaleString() }])
  }

  const editTile = () => {

  }
  return (
    <div className="App">
      <h1>IDEA BOARD</h1>
      <button onClick={() => createTile()}>Create New Idea</button>
        <div className="tiles">
          {tileArr.map((tile) => (
            <div className="tile" key={tile.id}>
              <input className="tile-title" onChange={(e) => e.target.value}placeholder="Title"></input>
              <textarea
              maxlength="140" className="tile-description" placeholder="Description" onChange={(e) => e.target.value}></textarea>
              <div>
                <p>{tile.time}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;
