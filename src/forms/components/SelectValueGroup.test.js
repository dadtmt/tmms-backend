import React from 'react'
import renderer from 'react-test-renderer'

import SelectValueGroup from './SelectValueGroup'

it('should render correctly', () => {
  const props = {
    controlId: 'SelectValue',
    input: {
      value: 'default'
    },
    label: 'Select a value',
    values: [
      {
        sLabel: 'Default value',
        value: 'default'
      },
      {
        sLabel: 'Some value',
        value: 'some'
      }
    ]
  }
  expect(
    renderer.create(<SelectValueGroup {...props} />).toJSON()
  ).toMatchSnapshot()
})
