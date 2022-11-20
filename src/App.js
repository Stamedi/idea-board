import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [tileArr, setTileArr] = useState('');

  const createTile = () => {
    const time = new Date()
     setTileArr([{ id:uuidv4(), title:'', description:'', time:time.toLocaleString() },...tileArr])
  }

  const editTitle = (id, e) => {
    const time = new Date()

    const newState = tileArr.map((tile) => {
      if (tile.id === id) {
        return {...tile, title:e, time:time.toLocaleString() }
      }
      return tile
    })
    setTileArr(newState)
  }

  const editDesc = (id, e) => {
    const time = new Date()

    const newState = tileArr.map((tile) => {
      if (tile.id === id) {
        return {...tile, description:e, time:time.toLocaleString() }
      }
      return tile
    })
    setTileArr(newState)
  }

  const removeTile = (id) => {
    setTileArr(tileArr.filter((tile) => tile.id !== id ))
  }

  useEffect(() => {
    if (typeof tileArr !== "string") {
      window.localStorage.setItem('notes', JSON.stringify(tileArr));
    }
  }, [createTile, editTitle, editDesc, removeTile])
  
  useEffect(() => {
    if (window.localStorage.getItem('notes') !== null) {
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
                <input onChange={(e) => editTitle(tile.id, e.target.value)}type="text" className="tile-title" placeholder="Title" value={tile.title} autoFocus />
                <textarea
                maxLength="140" className="tile-description" placeholder="Description" onChange={(e) => editDesc(tile.id, e.target.value)} value={tile.description}></textarea>
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
