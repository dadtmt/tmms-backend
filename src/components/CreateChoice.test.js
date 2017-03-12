import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from 'redux-form'

import CreateChoice from './CreateChoice'

const props = {
  crossroadId: 'SOME_ID',
  submitChoice: jest.fn()
}

it('renders without crashing', () => {
  const store = createStore(reducer)
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <CreateChoice {...props} />
    </Provider>,
    div
  )
})
