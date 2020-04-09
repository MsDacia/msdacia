import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import content from './json/static.en-us.json'

import About from './components/About'
import Footer from './components/Footer'
import Header, { MenuItem } from './components/Header'
import Home from './components/Home'
import Portfolio from './components/Portfolio'
import Resume from './components/Resume'

const menuItems: MenuItem[] = content.common.navigation

function App() {
  return (

    <div className="wrapper">
      <div className="container">
        <div className="overlay"></div>
        <Header items={menuItems} />
        <main>
          <div className="main-content">
            <Router>
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/resume">
                  <Resume />
                </Route>
                <Route path="/portfolio">
                  <Portfolio />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
