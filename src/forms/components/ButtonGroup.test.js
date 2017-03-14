import React from 'react'
import renderer from 'react-test-renderer'

import ButtonGroup from './ButtonGroup'

it('should render correctly', () => {
  const props = {
    glyph: 'plus',
    onClick: jest.fn(),
    title: 'add'
  }
  expect(
    renderer.create(<ButtonGroup {...props} />).toJSON()
  ).toMatchSnapshot()
})
