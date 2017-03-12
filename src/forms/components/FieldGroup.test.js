import React from 'react'
import { Field, reducer as formReducer, reduxForm } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import renderer from 'react-test-renderer'

import FieldGroup, { ValidableFieldGroup } from './FieldGroup'

describe('FieldGroup', () => {
  it('should render correctly with required props', () => {
    const input = {},
      meta = {}
    const output = renderer.create(
      <FieldGroup
        controlId='fieldGroupControlId'
        input={input}
        meta={meta}
        type='text'
      />
    )
    expect(output.toJSON()).toMatchSnapshot()
  })
  it('should render correctly password input', () => {
    const store = createStore(combineReducers({ form: formReducer }))
    const Form = () => <Field
      name='password'
      controlId='password'
      component={ValidableFieldGroup}
      type='password'
      placeholder='password'
      size='large'
    />
    const ReduxForm = reduxForm({ form: 'password' })(Form)
    const output = renderer.create(
      <Provider store={store} >
        <ReduxForm />
      </Provider>
    )
    expect(output.toJSON()).toMatchSnapshot()
  })
  it('should render correctly with optional props', () => {
    const input = {},
      meta = {}
    const output = renderer.create(
      <FieldGroup
        controlId='fieldGroupControlId'
        input={input}
        label='a label'
        meta={meta}
        placeholder='a placeholder'
        size='large'
        type='text'
      />
    )
    expect(output.toJSON()).toMatchSnapshot()
  })
})

describe('ValidableFieldGroup', () => {
  it('should render correctly with no error and touched', () => {
    const input = {},
      meta = {
        error: null,
        touched: true
      }
    const output = renderer.create(
      <ValidableFieldGroup
        controlId='fieldGroupControlId'
        input={input}
        meta={meta}
        type='text'
      />
    )
    expect(output.toJSON()).toMatchSnapshot()
  })
  it('should render correctly with error and touched', () => {
    const input = {},
      meta = {
        error: 'some error',
        touched: true
      }
    const output = renderer.create(
      <ValidableFieldGroup
        controlId='fieldGroupControlId'
        input={input}
        meta={meta}
        type='text'
        validationState='error'
      />
    )
    expect(output.toJSON()).toMatchSnapshot()
  })
})
