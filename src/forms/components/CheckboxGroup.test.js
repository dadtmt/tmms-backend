import React from 'react'
import renderer from 'react-test-renderer'

import CheckboxGroup from './CheckboxGroup'

it('should render correctly', () => {
  const props = {
    input: {
      value: false
    },
    label: 'Check this'
  }
  expect(
    renderer.create(<CheckboxGroup {...props} />).toJSON()
  ).toMatchSnapshot()
})
