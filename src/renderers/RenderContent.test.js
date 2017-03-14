import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import RenderContent from './RenderContent'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <RenderContent />,
    div
  )
})

it('renders CharacterSheet if characterSheet type', () => {
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
    'type': 'characterSheet'
  }

  /* eslint-enable */
  expect(
    renderer.create(<RenderContent {...props} />).toJSON()
  ).toMatchSnapshot()
})

it('renders dice if dice type', () => {
  const props = {
    details: 'details',
    made: false,
    master: false,
    modifier: 0,
    nbDices: 1,
    nbSides: 6,
    result: 6,
    type: 'dice'
  }
  expect(
    renderer.create(<RenderContent {...props} />).toJSON()
  ).toMatchSnapshot()
})

it('renders empty div on unknown type', () => {
  const props = {
    type: 'unknown'
  }
  expect(
    renderer.create(<RenderContent {...props} />).toJSON()
  ).toMatchSnapshot()
})
