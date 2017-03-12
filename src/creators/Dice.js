import React from 'react'
import { Field, reduxForm } from 'redux-form'

import CheckboxGroup from '../forms/components/CheckboxGroup'
import FieldGroup from '../forms/components/FieldGroup'

const normalizeInt = value => parseInt(value, 10)

const Dice = () => <form>
  <Field
    component={CheckboxGroup}
    label='The story teller rolls the dice!'
    name='master'
  />
  <Field
    component={FieldGroup}
    controlId='nbDices'
    label='Number of dices:'
    name={'nbDices'}
    normalize={normalizeInt}
    type='number'
  />
  <Field
    component={FieldGroup}
    controlId='nbSides'
    label='Number of sides:'
    name={'nbSides'}
    normalize={normalizeInt}
    type='number'
  />
  <Field
    component={FieldGroup}
    controlId='modifier'
    label='Modifier:'
    name={'modifier'}
    normalize={normalizeInt}
    type='number'
  />
</form>

export default reduxForm({
  form: 'content',
  initialValues: {
    master: false,
    modifier: 0,
    nbDices: 1,
    nbSides: 6
  }
})(Dice)
