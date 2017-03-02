import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import RichTextDisplay from './RichTextDisplay'

jest.mock('draft-js/lib/generateRandomKey', () => () => '123')

const props = {
  rawContent: {
    blocks: [
      {
        data: {},
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        key: '4bkmd',
        text: 'some rich text',
        type: 'unstyled'
      }
    ],
    entityMap: {}
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <RichTextDisplay {...props} />,
    div
  )
})

it('renders correctly', () => {
  expect(
    renderer.create(<RichTextDisplay {...props} />).toJSON()
  ).toMatchSnapshot()
})
