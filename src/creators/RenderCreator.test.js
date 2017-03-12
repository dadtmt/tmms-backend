import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from 'redux-form'

import RenderCreator from './RenderCreator'

const store = createStore(reducer)

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <Provider store={store}><RenderCreator /></Provider>,
    div
  )
})

it('renders dice if dice type', () => {
  expect(
    renderer.create(<Provider store={store}>
      <RenderCreator type='dice' />
    </Provider>).toJSON()
  ).toMatchSnapshot()
})
