import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from 'redux-form'

import Dice from './Dice'

const store = createStore(reducer)

it.only('renders correctly', () => {
  expect(
    renderer.create(<Provider store={store}>
      <Dice />
    </Provider>).toJSON()
  ).toMatchSnapshot()
})
