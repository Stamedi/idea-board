import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import idea_icon from './idea_icon.png'
import './App.css';

function App() {
  const [tileArr, setTileArr] = useState('');
  const [tileCreated, setTileCreated] = useState(false)

  const createTile = () => {
    const time = new Date()
     setTileArr([{ id:uuidv4(), title:'', description:'', descLength:140, time:time.toLocaleString() },...tileArr])

     setTileCreated(true)
     setTimeout(() => setTileCreated(false), 3000)
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

  const editDesc = (id, e, length) => {
    const time = new Date()
    const newState = tileArr.map((tile) => {
      if (tile.id === id) {
        return {...tile, description:e, descLength:length-e.length, time:time.toLocaleString() }
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
      <h1 className="header-container"><img src={idea_icon} alt="idea_icon" /> BOARD</h1>
      <div className="header-btn-container">
        <button className="create-btn" onClick={() => createTile()}>Create New Idea</button>
      </div>

      <div className="created-not-cont">{tileCreated === true && <h3>{'Tile has been created!'}</h3>}</div>
      <div className="flex-container">
        <div className="tiles">
          {tileArr.length !== 0 && (tileArr.map((tile) => (
            <div className="tile" key={tile.id}>
              <input onChange={(e) => editTitle(tile.id, e.target.value)}type="text" className="tile-title" placeholder="Title" value={tile.title} autoFocus />
              <textarea
              maxLength="140" className="tile-description" placeholder="Description" onChange={(e) => editDesc(tile.id, e.target.value, e.target.maxLength)} value={tile.description}></textarea>
              <div className="desc-length-cont">
                {tile.descLength < 51 && <span>{tile.descLength}</span>}
              </div>
              <div className="tile-bottom-cont">
                <p>{tile.time}</p>
                <button className="remove-btn" onClick={() => removeTile(tile.id)}>Remove</button>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

export default App;
