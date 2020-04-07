import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import content from './json/static.en-us.json'

import About from './components/About'
import Home from './components/Home'
import Menu, { MenuItem } from './components/Menu'
import Portfolio from './components/Portfolio'
import Resume from './components/Resume'

const menuItems: MenuItem[] = content.common.navigation

function App() {
  return (

    <div className="wrapper">
      {/* <cover-background>
        <transition name="zoom"> */}
          <div className="main-content">
            <Router>
              <Menu items={menuItems} />

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
        {/* </transition>
      </cover-background> */}
    </div>
  )
}

export default App
