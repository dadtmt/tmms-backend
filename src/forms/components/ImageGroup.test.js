import React from 'react'
import renderer from 'react-test-renderer'

import ImageGroup from './ImageGroup'

it('should render correctly', () => {
  const props = {
    input: {
      value: 'http://image/png'
    },
    label: 'Image url'
  }
  expect(
    renderer.create(<ImageGroup {...props} />).toJSON()
  ).toMatchSnapshot()
})
