import React from 'react'
import renderer from 'react-test-renderer'

import BlockRichTextButton from './BlockRichTextButton'

it('renders correctly', () => {
  const props = {
    iconName: 'bold',
    isActive: true,
    label: 'bold',
    toggleBlockType: jest.fn()
  }
  expect(
    renderer.create(<BlockRichTextButton {...props} />).toJSON()
  ).toMatchSnapshot()
})
