import React, { Component } from 'react'

import CurrentPage from './containers/CurrentPageContainer'
import StoryFeedWithData from './containers/StoryFeedWithData'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Tell me my story</h2>
        </div>
        <p className='App-intro'>
          Type and save the page, you can use emoji.
        </p>
        <CurrentPage />
        <StoryFeedWithData />
      </div>
    )
  }
}

export default App
