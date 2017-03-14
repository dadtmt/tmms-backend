import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import CharacterSheet from './CharacterSheet'

/* eslint-disable */
const props = {
  'id': 'U2hlZXRzOjIz',
  'characs': [
    {
      'name': 'Force',
      'value': '17'
    },
    {
      'name': 'Dex',
      'value': '18'
    }
  ],
  'description': 'Rodeur semi orc',
  'gear': [
    {
      'name': 'Arc Feu',
      'description': '1D8 + 1D6 feu',
      'image': 'https://s-media-cache-ak0.pinimg.com/236x/3b/76/10/3b76104f3387a68e7210c438de6a23c7.jpg',
      'count': '1'
    },
    {
      'name': 'Fleches',
      'count': '10'
    }
  ],
  'image': 'https://s-media-cache-ak0.pinimg.com/736x/fe/a2/b2/fea2b2e27dc64aed4228bb3697018436.jpg',
  'isPlayer': true,
  'name': 'Marom',
  '__typename': 'Sheets'
}

/* eslint-enable */

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <CharacterSheet {...props} />,
    div
  )
})

it('renders correctly', () => {
  expect(
    renderer.create(<CharacterSheet {...props} />).toJSON()
  ).toMatchSnapshot()
})
