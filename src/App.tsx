import React, { useEffect, useState, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import idea_icon from './idea_icon.png';
import './App.scss';


// interface Tile {
//   id: string,
//   e?: string | number,
//   length?: string | number,
// }

const App:FC = () => {
  const [tileArr, setTileArr] = useState<any[] | "undefined">();
  const [tileUpdated, setTileUpdated] = useState<boolean>(false)

  
  const createTile = () => {
    const time = new Date()
    setTileArr([{ id:uuidv4(), title:'', description:'', time},...tileArr || []])
  }

  const editTile = (id:string, event) => {
    const time = new Date()
    const updateNot = () => {
        setTileUpdated(true)
        setTimeout(() => setTileUpdated(false), 3000)
    }
    if (typeof tileArr === 'object') {
        const newState = tileArr.map((tile) => {
          if (tile.id === id) {
            if (event.target.name === 'title') {
              return {...tile, title:event.target.value, time}
            } else if (event.target.name === 'description') {
              return {...tile, description:event.target.value, time}
            }
          }
          return tile
        })
    
        setTileArr(newState)
        updateNot()
    }

  }

  const removeTile = (id:string) => {
    if( typeof tileArr === "object") {
      setTileArr(tileArr.filter((tile) => tile.id !== id ))
    }
  }

  const sortByDate = () => {

    const sortedArrAsc = [...tileArr || []].sort((a, b) => a.time > b.time ? 1 : -1);

    const sortedArrDesc = [...tileArr || []].sort((a, b) => a.time > b.time ? -1 : 1);

    if (JSON.stringify(tileArr) === JSON.stringify(sortedArrAsc)) {
      setTileArr(sortedArrDesc)
    } else if (JSON.stringify(tileArr) === JSON.stringify(sortedArrDesc)) {
      setTileArr(sortedArrAsc)
    } else {
      setTileArr(sortedArrAsc)
    }
  }

  const sortByTitle = () => {
    const sortedArrAsc = [...tileArr || []].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);

    const sortedArrDesc = [...tileArr || []].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1);

    if (JSON.stringify(tileArr) === JSON.stringify(sortedArrAsc)) {
      setTileArr(sortedArrDesc)
    } else if (JSON.stringify(tileArr) === JSON.stringify(sortedArrDesc)) {
      setTileArr(sortedArrAsc)
    } else {
      setTileArr(sortedArrAsc)
    }
  }

  useEffect(() => {
    if (typeof tileArr !== "undefined") {
      window.localStorage.setItem('notes', JSON.stringify(tileArr));
    }
  },[tileArr])
  
  useEffect(() => {
    if (window.localStorage.getItem('notes') !== null) {
        setTileArr(JSON.parse(window.localStorage.getItem('notes') || "undefined"))
    } 
},[])


  return (
    <div className="App">
      <div className="inner-container scale">
      <h1 className="header-container"><img src={idea_icon} alt="idea_icon" />BOARD</h1>
      <div className="header-btn-container">
        <button className="create-btn" onClick={() => createTile()}>Create New Idea</button>
        <div className="sorting-container">
        <button onClick={() => sortByDate()}>Sort by Date</button>
        <button onClick={() => sortByTitle()}>Sort by Title</button>
        </div>
      </div>

      <div className="updated-not-cont">{tileUpdated === true && <h3>{'Tile has been updated!'}</h3>}</div>
      <div className="flex-container">
        <div className="tiles">
          {typeof tileArr === "object" && (tileArr.map((tile) => (
            <div className="tile slide-in" key={tile.id}>
              <input onChange={(event) => editTile(tile.id, event)} name="title" type="text" className="tile-title" placeholder="Title" value={tile.title} autoFocus />
              <textarea
              maxLength={140} name="description" className="tile-description" placeholder="Description" onChange={(event) => editTile(tile.id, event)} value={tile.description}></textarea>
              <div className="desc-length-cont">
                {tile.description.length > 89 && <span>{140 - tile.description.length}</span>}
              </div>
              <div className="tile-bottom-cont">
                <p>{tile.time.toLocaleString()}</p>
                <button className="remove-btn" onClick={() => removeTile(tile.id)}>Remove</button>
              </div>
            </div>
          )))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
