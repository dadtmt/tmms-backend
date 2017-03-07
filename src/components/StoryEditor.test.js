import R from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'

import StoryEditor, {
  getCrossroadsFromData,
  getCurrentCrossroad,
  isChoiceMade
} from './StoryEditor'

describe('getCurrentCrossroad', () => {
  it('should return null on loading', () => {
    const data = {
      loading: true
    }
    expect(getCurrentCrossroad(getCrossroadsFromData(data))).toMatchSnapshot()
  })
  it('should return current crossroad', () => {

    /* eslint-disable sort-keys */
    const data = {
      'variables': {
        'pageEditorId': 'UGFnZUVkaXRvcjox'
      },
      'loading': false,
      'networkStatus': 7,
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
                                'text': 'fsdfsfsdfsfd',
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

    expect(getCurrentCrossroad(getCrossroadsFromData(data))).toMatchSnapshot()
  })
})

describe('isChoiceMade', () => {
  it('return true if one choice is made', () => {

    /* eslint-disable sort-keys */
    const data = {
      'variables': {
        'pageEditorId': 'UGFnZUVkaXRvcjox'
      },
      'loading': false,
      'networkStatus': 7,
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
                                'text': 'fsdfsfsdfsfd',
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
                                node: {
                                  made: true
                                }
                              },
                              {
                                node: {
                                  made: false
                                }
                              }
                            ],
                            '__typename': 'ChoiceConnection'
                          },
                          'testDices': {
                            'edges': [],
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
    expect(
      isChoiceMade(getCurrentCrossroad(getCrossroadsFromData(data)))
    ).toBeTruthy()
  })

  it('return true if one test is made', () => {

    /* eslint-disable sort-keys */
    const data = {
      'variables': {
        'pageEditorId': 'UGFnZUVkaXRvcjox'
      },
      'loading': false,
      'networkStatus': 7,
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
                                'text': 'fsdfsfsdfsfd',
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
                                node: {
                                  made: false
                                }
                              },
                              {
                                node: {
                                  made: false
                                }
                              }
                            ],
                            '__typename': 'ChoiceConnection'
                          },
                          'testDices': {
                            'edges': [
                              {
                                node: {
                                  made: true
                                }
                              },
                              {
                                node: {
                                  made: false
                                }
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
    expect(
      isChoiceMade(getCurrentCrossroad(getCrossroadsFromData(data)))
    ).toBeTruthy()
  })
  it('return false if no crossroad', () => {
    const data = {
      loading: true
    }
    expect(
      isChoiceMade(getCurrentCrossroad(getCrossroadsFromData(data)))
    ).toBeFalsy()
  })
  it('return false if no choice is made', () => {

    /* eslint-disable sort-keys */
    const data = {
      'variables': {
        'pageEditorId': 'UGFnZUVkaXRvcjox'
      },
      'loading': false,
      'networkStatus': 7,
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
                                'text': 'fsdfsfsdfsfd',
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
                                node: {
                                  made: false
                                }
                              },
                              {
                                node: {
                                  made: false
                                }
                              }
                            ],
                            '__typename': 'ChoiceConnection'
                          },
                          'testDices': {
                            'edges': [
                              {
                                node: {
                                  made: false
                                }
                              },
                              {
                                node: {
                                  made: false
                                }
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

    expect(
      isChoiceMade(getCurrentCrossroad(getCrossroadsFromData(data)))
    ).toBeFalsy()
  })
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    clearPageEditor: jest.fn(),
    createChoice: jest.fn(),
    createCrossroad: jest.fn(),
    createTest: jest.fn(),
    data: {},
    deleteChoice: jest.fn(),
    deleteTestDice: jest.fn(),
    toggleIsReady: jest.fn(),
    updateCrossroadText: jest.fn()
  }
  const client = new ApolloClient()
  ReactDOM.render(
    <ApolloProvider client={client}>
      <StoryEditor {...props} />
    </ApolloProvider>,
    div
  )
})
