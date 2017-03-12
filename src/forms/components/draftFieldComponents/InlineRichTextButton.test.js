import React from 'react'
import renderer from 'react-test-renderer'

import InlineRichTextButton from './InlineRichTextButton'

it('renders correctly', () => {
  const props = {
    iconName: 'bold',
    inlineStyle: 'the draft code for the style',
    isActive: true,
    label: 'bold',
    onMouseDown: jest.fn(),
    toggleInlineStyle: jest.fn()
  }
  expect(
    renderer.create(<InlineRichTextButton {...props} />).toJSON()
  ).toMatchSnapshot()
})
