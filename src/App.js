import './App.css'
import NavBar from './components/NavBar'
import Museums from './components/Museums'
import MuseumEdit from './components/MuseumEdit'
import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <h1>virtual-museums</h1>
      </header>
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/museums">
              <Museums />
            </Route>
            <Route exact path="/museum/:id/edit">
              <MuseumEdit />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;
