import './App.css'
import NavBar from './components/NavBar'
import Museums from './components/Museums'
import MuseumEdit from './components/MuseumEdit'
import MuseumCreate from './components/MuseumCreate'
import MuseumView from './components/MuseumView'
import ArtistEdit from './components/ArtistEdit'
import ArtistCreate from './components/ArtistCreate'
import ArtistView from './components/ArtistView'
import ArtEdit from './components/ArtEdit'
import ArtCreate from './components/ArtCreate'
import React, { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"

function App() {
  useEffect (() => {
        fetch(`http://localhost:9292/museums`)
          .then((response) => response.json())
          .then((data) => setMuseums(data))
        fetch(`http://localhost:9292/artists`)
          .then((response) => response.json())
          .then((data) => setArtists(data))
        fetch(`http://localhost:9292/art_pieces`)
          .then((response) => response.json())
          .then((data) => setArtPieces(data))
    }, [])

  const [museums, setMuseums] = useState([])
  const [artists, setArtists] = useState([])
  const [artPieces, setArtPieces] = useState([])

  function onCreateMuseum(museum) {
    setMuseums([...museums, museum])
  }

  function onCreateArtist(artist) {
    setArtists([...artists, artist])
  }

  function onCreateArtPiece(artPiece) {
    setArtPieces([...artPieces, artPiece])
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <h1>virtual-museums</h1>
      </header>
      <div>
        <Switch>
          <Route exact path="/">
            <Museums museums={museums}/>
          </Route>
          <Route exact path="/museums/:id/edit">
            <MuseumEdit museums={museums} setMuseums={setMuseums} />
          </Route>
          <Route exact path="/museums/create">
            <MuseumCreate onCreateMuseum={onCreateMuseum} />
          </Route>
          <Route exact path="/museums/:id">
            <MuseumView />
          </Route>
          <Route exact path="/artists/:id/edit">
            <ArtistEdit artists={artists} setArtists={setArtists} />
          </Route>
          <Route exact path="/artists/create">
            <ArtistCreate onCreateArtist={onCreateArtist} />
          </Route>
          <Route exact path="/artists/:id">
            <ArtistView />
          </Route>
          <Route exact path="/art_pieces/:id/edit">
            <ArtEdit artPieces={artPieces} setArtPieces={setArtPieces} />
          </Route>
          <Route exact path="/art_pieces/create">
            <ArtCreate onCreateArtPiece={onCreateArtPiece} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;
