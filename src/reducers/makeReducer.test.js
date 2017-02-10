import makeReducer, { createReducer, enhanceReducer } from './makeReducer'

describe('enhanceReducer', () => {
  it('should enhance a reducer with action handlers', () => {
    const someState = {
      state: 'some'
    }
    const targetState = {
      state: 'target'
    }
    const handlers = {
      'SOME_ACTION_TYPE': () => targetState
    }
    const reducer = makeReducer({})
    expect(enhanceReducer(
      handlers
    )(reducer)(someState, { type: 'SOME_ACTION_TYPE' }))
      .toEqual(targetState)
  })
})

describe('createReducer', () => {
  const initialState = {
    state: 'initial'
  }
  const targetState = {
    state: 'target'
  }
  const someAction = {
    type: 'SOME_ACTION_TYPE'
  }
  const notHandledAction = {
    type: 'NOT_HANDLED_ACTION_TYPE'
  }
  const handlers = {
    SOME_ACTION_TYPE: () => targetState
  }
  const reducer = createReducer(initialState, handlers)
  it('should return a reducer handling someActionType', () => {
    expect(reducer(initialState, someAction)).toEqual(targetState)
  })
  it(
    'should return a reducer that return initialState for not handled actions',
    () => {
      expect(reducer(initialState, notHandledAction)).toEqual(initialState)
    })
})

describe('makeReducer', () => {
  it('return a reducer that handles some action', () => {
    const someState = {
      state: 'some'
    }
    const targetState = {
      state: 'target'
    }
    const someAction = {
      type: 'SOME_ACTION_TYPE'
    }
    const handlers = {
      SOME_ACTION_TYPE: () => targetState
    }
    const reducer = makeReducer(handlers)
    expect(reducer(someState, someAction)).toEqual(targetState)
  })
  it(
    'return a reducer that return original state if the action is not handled',
    () => {
      const someState = {
        state: 'some'
      }
      const targetState = {
        state: 'target'
      }
      const anotherAction = {
        type: 'ANOTHER_ACTION_TYPE'
      }
      const handlers = {
        SOME_ACTION_TYPE: () => targetState
      }
      const reducer = makeReducer(handlers)
      expect(reducer(someState, anotherAction)).toEqual(someState)
    }
  )
})
