import React, { useEffect, useState, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import idea_icon from './idea_icon.png';
// @ts-ignore
import desc_icon from './list.png';
// @ts-ignore
import asc_icon from './sort.png';
import './App.scss';

const App:FC = () => {
  const [tileArr, setTileArr] = useState<any[] | "undefined">();
  const [tileUpdated, setTileUpdated] = useState<boolean>(false)
  const [sortTiles, setSortTiles] = useState<{sort: string, sortBy: string} | undefined >()


  const createTile = () => {
    const time = new Date()
    setTileArr([{ id:uuidv4(), title:'', description:'', time:time.toLocaleString() },...tileArr || []])
  }

  const editTile = (id:string, event) => {
    const time = new Date()
    const updateNot = () => {
        if (tileUpdated === false) {
          setTileUpdated(true)
          setTimeout(() => setTileUpdated(false), 3000)
        }
    }
    if (typeof tileArr === 'object') {
        const newState = tileArr.map((tile) => {
          if (tile.id === id) {
            if (event.target.name === 'title') {
              return {...tile, title:event.target.value, time:time.toLocaleString()}
            } else if (event.target.name === 'description') {
              return {...tile, description:event.target.value, time:time.toLocaleString()}
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

  const sortBy = (event) => {
    const sortName = event.target.name
    const titleAsc = [...tileArr || []].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
    const titleDesc = [...tileArr || []].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1);
    const dateAsc = [...tileArr || []].sort((a, b) => a.time > b.time ? 1 : -1)
    const dateDesc = [...tileArr || []].sort((a, b) => a.time > b.time ? -1 : 1)

    if (sortTiles) {
      if (sortTiles.sort === 'asc') {
        setSortTiles({sortBy:sortName, sort:'desc'})
      } else if (sortTiles.sort === 'desc') {
        setSortTiles({sortBy:sortName, sort:'asc'})
      } 
    } else {
      setSortTiles({sortBy:sortName, sort:'asc'})
    }
    
   if (sortTiles) {
    const sortedArr = 
    sortName === 'title' ? 
      (
        sortTiles.sort === 'desc' ?
          (titleAsc) 
        : sortTiles.sort === 'asc' ?
          (titleDesc) 
        : (titleAsc)
      )
    : sortName === 'date' ?
      (
        sortTiles.sort === 'desc' ? 
          (dateAsc) 
      : sortTiles.sort === 'asc' ?
          (dateDesc) 
        : (dateAsc)
      ) 
    : [];

    setTileArr(sortedArr)
   }
  }

  // const sortByIcon = () => {
  //   sortTiles && (sortTiles.sortBy === 'title' && sortTiles.sort === 'asc' ? <img src={asc_icon} alt="" /> : sortTiles.sortBy === 'title' && sortTiles.sort === 'desc' ? <img src={desc_icon} alt="" /> : '')
  // }

  useEffect(() => {
    tileArr && window.localStorage.setItem('notes', JSON.stringify(tileArr))
  },[tileArr])
  
  useEffect(() => {
    const notes = window.localStorage.getItem('notes')
    const parsed = notes ? JSON.parse(notes) : null
    if (parsed) {
        setTileArr(parsed)
    }
},[])


  return (
    <div className="App">
      <div className="inner-container scale">
      <h1 className="header-container"><img src={idea_icon} alt="idea_icon" />BOARD</h1>
      <div className="header-btn-container">
        <button className="create-btn" onClick={() => createTile()}>Create New Idea</button>
        <div className="sorting-container">
        <button name="date" onClick={(event) => sortBy(event)}>Sort by Date</button>
        <div className="sorting-icon-cont">
          {sortTiles && (sortTiles.sortBy === 'date' && sortTiles.sort === 'desc' ? <img src={desc_icon} alt="" /> : sortTiles.sortBy === 'date' && sortTiles.sort === 'asc' ? <img src={asc_icon} alt="" /> : '')}
        </div>
        <button name="title" onClick={(event) => sortBy(event)}>Sort by Title</button>
        <div className="sorting-icon-cont">
          {sortTiles && (sortTiles.sortBy === 'title' && sortTiles.sort === 'desc' ? <img src={desc_icon} alt="" /> : sortTiles.sortBy === 'title' && sortTiles.sort === 'asc' ? <img src={asc_icon} alt="" /> : '')}
        </div>
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
