import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [tileArr, setTileArr] = useState([]);

  const createTile = () => {
    const time = new Date()
     setTileArr([{ id:uuidv4(), title:'', description:'', time:time.toLocaleString() },...tileArr])
  }

  const editTitle = (id, title) => {
    const time = new Date()

    const newState = tileArr.map((tile) => {
      if (tile.id === id) {
        return {...tile, title, time:time.toLocaleString() }
      }
      return tile
    })
    setTileArr(newState)
  }

  const editDesc = (id, description) => {
    const time = new Date()

    const newState = tileArr.map((tile) => {
      if (tile.id === id) {
        return {...tile, description, time:time.toLocaleString() }
      }
      return tile
    })
    setTileArr(newState)
  }

  const removeTile = (id) => {
    setTileArr(tileArr.filter((tile) => tile.id !== id ))
  }

  useEffect(() => {
    if (tileArr.length !== 0) {
      window.localStorage.setItem('notes', JSON.stringify(tileArr));
    } 
  }, [createTile, editTitle, editDesc, removeTile])

  
  useEffect(() => {
    if (window.localStorage.getItem('notes') !== null) {
      if (window.localStorage.getItem('notes').length !== 0)
      setTileArr(JSON.parse(window.localStorage.getItem('notes')))
    }
},[])

  
  return (
    <div className="App">
      <h1>IDEA BOARD</h1>
      <button onClick={() => createTile()}>Create New Idea</button>
        <div className="flex-container">
          <div className="tiles">
            {tileArr.length !== 0 && (tileArr.map((tile) => (
              <div className="tile" key={tile.id}>
                <input className="tile-title" onChange={() => editTitle(tile.id, tile.title)}placeholder="Title" autoFocus></input>
                <textarea
                maxLength="140" className="tile-description" placeholder="Description" onChange={() => editDesc(tile.id, tile.description)}></textarea>
                <div className="tile-bottom-cont">
                  <p>{tile.time}</p>
                  <button onClick={() => removeTile(tile.id)}>Remove</button>
                </div>
              </div>
            )))}
          </div>
        </div>
    </div>
  );
}

export default App;
