import React from 'react'
import ReactDOM from 'react-dom'

import StoryEditor, {
  getCrossroadIdFromProps,
  isChoiceMade,
  isReady
} from './StoryEditor'

describe('getCrossroadIdFromProps', () => {
  it('should return crossroadId', () => {
    const props = {
      data: {
        getPageEditor: {
          crossroads: {
            edges: [
              {
                node: {
                  id: 'SOME_ID'
                }
              }
            ]
          }
        }
      }
    }
    expect(getCrossroadIdFromProps(props)).toBe('SOME_ID')
  })
  it('should return falsy when edges empty', () => {
    const props = {
      data: {
        getPageEditor: {
          crossroads: {
            edges: []
          }
        }
      }
    }
    expect(getCrossroadIdFromProps(props)).toBeFalsy()
  })
  it('should return falsy when no getPageEditor', () => {
    const props = {
      data: {}
    }
    expect(getCrossroadIdFromProps(props)).toBeFalsy()
  })
})

describe('isChoiceMade', () => {
  it('return true if one choice is made', () => {
    const crossroads = {
      edges: [
        {
          node: {
            choices: { edges: [
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
            ] }
          }
        }
      ]
    }
    expect(isChoiceMade(crossroads)).toBeTruthy()
  })
  it('return true if one test is made', () => {
    const crossroads = {
      edges: [
        {
          node: {
            choices: { edges: [
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
            ] },
            testDices: { edges: [
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
            ] }
          }
        }
      ]
    }
    expect(isChoiceMade(crossroads)).toBeTruthy()
  })
  it('return false if no crossroad', () => {
    const crossroads = {
      edges: []
    }
    expect(isChoiceMade(crossroads)).toBeFalsy()
  })
  it('return false if no choice is made', () => {
    const crossroads = {
      edges: [
        {
          node: {
            choices: { edges: [
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
            ] }
          }
        }
      ]
    }
    expect(isChoiceMade(crossroads)).toBeFalsy()
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
  ReactDOM.render(
    <StoryEditor {...props} />,
    div
  )
})

describe('isReady', () => {
  it('return false if crossroad not ready', () => {
    const crossroads = {
      edges: [{ node: { isReady: false } }]
    }
    expect(isReady(crossroads)).toBeFalsy()
  })
  it('return true if crossroad not ready', () => {
    const crossroads = {
      edges: [{ node: { isReady: true } }]
    }
    expect(isReady(crossroads)).toBeTruthy()
  })
})
