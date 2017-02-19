import React, { Component } from 'react'

import StoryEditor from './containers/StoryEditorWithData'
import StoryFeed from './containers/StoryFeedWithData'

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
          Write the story
        </p>
        <StoryEditor />
        <StoryFeed />
      </div>
    )
  }
}

export default App
