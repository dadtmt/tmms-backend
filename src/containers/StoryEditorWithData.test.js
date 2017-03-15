import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import StoryEditorWithData, {
  isInteractive,
  reducer
} from './StoryEditorWithData'

const client = new ApolloClient()

describe('isInteractive', () => {
  it('return true by default', () => {
    const values = {}
    expect(isInteractive(values)).toBeTruthy()
  })
  it('return false if type is dice and master true', () => {
    const values = {
      content: {
        master: true
      },
      type: 'dice'
    }
    expect(isInteractive(values)).toBeFalsy()
  })
  it('return true if type is dice and master false', () => {
    const values = {
      content: {
        master: false
      },
      type: 'dice'
    }
    expect(isInteractive(values)).toBeTruthy()
  })
  it('return false if type is characterSheet', () => {
    const values = {
      type: 'characterSheet'
    }
    expect(isInteractive(values)).toBeFalsy()
  })
})

describe('reducer', () => {

  /* eslint-disable sort-keys */
  const state = {
    'viewer': {
      'user': {
        'editors': {
          'edges': [
            {
              'node': {
                'id': 'UGFnZUVkaXRvcjox',
                'crossroads': {
                  'edges': [
                    {
                      'node': {
                        'createdAt': '2017-03-07T11:37:25.000Z',
                        'id': 'Q3Jvc3Nyb2FkOjIx',
                        'isReady': false,
                        'text': {
                          'entityMap': {},
                          'blocks': [
                            {
                              'key': '8ussa',
                              'text': 'crossroad',
                              'type': 'unstyled',
                              'depth': 0,
                              'inlineStyleRanges': [],
                              'entityRanges': [],
                              'data': {}
                            }
                          ]
                        },
                        'choices': {
                          'edges': [
                            {
                              'node': {
                                'id': 'Q2hvaWNlOjY0',
                                'made': false,
                                'text': {
                                  'entityMap': {},
                                  'blocks': [
                                    {
                                      'key': 'f7ujh',
                                      'text': 'Go left',
                                      'type': 'unstyled',
                                      'depth': 0,
                                      'inlineStyleRanges': [],
                                      'entityRanges': [],
                                      'data': {}
                                    }
                                  ]
                                },
                                '__typename': 'Choice'
                              },
                              '__typename': 'ChoiceEdge'
                            }
                          ],
                          '__typename': 'ChoiceConnection'
                        },
                        'testDices': {
                          'edges': [
                            {
                              'node': {
                                'id': 'VGVzdERpY2U6MzI=',
                                'made': false,
                                'text': {
                                  'entityMap': {},
                                  'blocks': [
                                    {
                                      'key': 'f10c4',
                                      'text': 'I KILL YOU',
                                      'type': 'unstyled',
                                      'depth': 0,
                                      'inlineStyleRanges': [],
                                      'entityRanges': [],
                                      'data': {}
                                    }
                                  ]
                                },
                                'master': true,
                                'modifier': 0,
                                'nbDices': 1,
                                'nbSides': 6,
                                'details': ' (3)  + 0',
                                'result': 3,
                                '__typename': 'TestDice'
                              },
                              '__typename': 'TestDiceEdge'
                            }
                          ],
                          '__typename': 'TestDiceConnection'
                        },
                        '__typename': 'Crossroad'
                      },
                      '__typename': 'CrossroadEdge'
                    }
                  ],
                  '__typename': 'CrossroadConnection'
                },
                '__typename': 'PageEditor'
              },
              '__typename': 'UserEditorsEdge'
            }
          ],
          '__typename': 'UserEditorsConnection'
        },
        '__typename': 'User'
      },
      '__typename': 'Viewer'
    }
  }

  /* eslint-enable sort-keys */

  it('return state unchanged on some action', () => {
    expect(reducer(state, { type: 'SOME_ACTION' })).toEqual(state)
  })

  it('handles CREATE_CROSSROAD_MUTATION', () => {

    /* eslint-disable sort-keys */
    const action = {
      'type': 'APOLLO_MUTATION_RESULT',
      'operationName': 'CreateCrossroad',
      'result': {
        'data': {
          'createCrossroad': {
            'changedEdge': {
              'node': {
                'createdAt': '2017-03-07T15:12:18.000Z',
                'id': 'Q3Jvc3Nyb2FkOjIy',
                'isReady': false,
                'text': {
                  'entityMap': {},
                  'blocks': [
                    {
                      'key': '2ovct',
                      'text': 'Here comes the troll...',
                      'type': 'unstyled',
                      'depth': 0,
                      'inlineStyleRanges': [],
                      'entityRanges': [],
                      'data': {}
                    }
                  ]
                },
                'choices': {
                  'edges': [],
                  '__typename': 'ChoiceConnection'
                },
                'testDices': {
                  'edges': [],
                  '__typename': 'TestDiceConnection'
                },
                '__typename': 'Crossroad'
              },
              '__typename': 'CrossroadEdge'
            },
            '__typename': 'CreateCrossroadPayload'
          }
        }
      }
    }

    /* eslint-enable sort-keys */

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('handles CREATE_CHOICE_MUTATION', () => {

    /* eslint-disable sort-keys */
    const action = {
      'type': 'APOLLO_MUTATION_RESULT',
      'operationName': 'CreateChoice',
      'result': {
        'data': {
          'createChoice': {
            'changedEdge': {
              'node': {
                'id': 'Q2hvaWNlOjU2',
                'made': false,
                'text': {
                  'entityMap': {},
                  'blocks': [
                    {
                      'key': 'nts2',
                      'text': 'This is my choice',
                      'type': 'unstyled',
                      'depth': 0,
                      'inlineStyleRanges': [],
                      'entityRanges': [],
                      'data': {}
                    }
                  ]
                },
                '__typename': 'Choice'
              },
              '__typename': 'ChoiceEdge'
            },
            '__typename': 'CreateChoicePayload'
          }
        }
      }
    }

    /* eslint-enable sort-keys */

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('handles DELETE_CHOICE_MUTATION', () => {

    /* eslint-disable sort-keys */
    const action = {
      'type': 'APOLLO_MUTATION_RESULT',
      'operationName': 'DeleteChoice',
      'result': {
        'data': {
          'deleteChoice': {
            'changedChoice': {
              'id': 'Q2hvaWNlOjY0',
              '__typename': 'Choice'
            },
            '__typename': 'DeleteChoicePayload'
          }
        }
      }
    }

    /* eslint-enable sort-keys */

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('handles DELETE_TEST_MUTATION', () => {

    /* eslint-disable sort-keys */
    const action = {
      'type': 'APOLLO_MUTATION_RESULT',
      'operationName': 'DeleteTestDice',
      'result': {
        'data': {
          'deleteTestDice': {
            'changedTestDice': {
              'id': 'VGVzdERpY2U6MzI=',
              '__typename': 'TestDice'
            },
            '__typename': 'DeleteTestDicePayload'
          }
        }
      }
    }

    /* eslint-enable sort-keys */

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('handles DELETE_TEST_MUTATION', () => {

    /* eslint-disable sort-keys */
    const action = {
      'type': 'APOLLO_MUTATION_RESULT',
      'operationName': 'CreateChoice',
      'result': {
        'data': {
          'createChoice': {
            'changedEdge': {
              'node': {
                'id': 'Q2hvaWNlOjU2',
                'made': false,
                'text': {
                  'entityMap': {},
                  'blocks': [
                    {
                      'key': 'nts2',
                      'text': 'This is my choice',
                      'type': 'unstyled',
                      'depth': 0,
                      'inlineStyleRanges': [],
                      'entityRanges': [],
                      'data': {}
                    }
                  ]
                },
                '__typename': 'Choice'
              },
              '__typename': 'ChoiceEdge'
            },
            '__typename': 'CreateChoicePayload'
          }
        }
      }
    }

    /* eslint-enable sort-keys */

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('handles CREATE_TEST_MUTATION', () => {

    /* eslint-disable sort-keys */
    const action = {
      'type': 'APOLLO_MUTATION_RESULT',
      'operationName': 'CreateTestDice',
      'result': {
        'data': {
          'createTestDice': {
            'changedEdge': {
              'node': {
                'id': 'VGVzdERpY2U6MjY=',
                'made': false,
                'text': {
                  'entityMap': {},
                  'blocks': [
                    {
                      'key': 'alu20',
                      'text': 'Roll to survive...',
                      'type': 'unstyled',
                      'depth': 0,
                      'inlineStyleRanges': [],
                      'entityRanges': [],
                      'data': {}
                    }
                  ]
                },
                'master': false,
                'modifier': 0,
                'nbDices': 1,
                'nbSides': 20,
                'details': ' (17)  + 0',
                'result': 17,
                '__typename': 'TestDice'
              },
              '__typename': 'TestDiceEdge'
            },
            '__typename': 'CreateTestDicePayload'
          }
        }
      }
    }

    /* eslint-enable sort-keys */

    expect(reducer(state, action)).toMatchSnapshot()
  })
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ApolloProvider client={client} >
      <StoryEditorWithData />
    </ApolloProvider>,
    div
  )
})
