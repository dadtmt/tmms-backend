import R from 'ramda'
import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import {
  Field,
  FieldArray,
  propTypes as formPropTypes,
  reduxForm
} from 'redux-form'
import { branch } from 'recompose'

import { pageEditorId } from '../config'
import ButtonGroup from '../forms/components/ButtonGroup'
import CheckboxGroup from '../forms/components/CheckboxGroup'
import FieldGroup from '../forms/components/FieldGroup'
import ImageGroup from '../forms/components/ImageGroup'
import {
  CREATE_SHEET_MUTATION,
  UPDATE_SHEET_MUTATION
} from '../graphql/mutations'

const withCreateMutation = graphql(
  CREATE_SHEET_MUTATION,
  {
    props: ({ mutate }) => ({
      onSubmit: values => mutate({
        variables: {
          newSheet: {
            ...values,
            editorId: pageEditorId
          }
        }
      })
    })
  }
)

const withUpdateMutation = graphql(
  UPDATE_SHEET_MUTATION,
  {
    props: ({ mutate }) => ({
      onSubmit: values => mutate({
        variables: {
          sheet: R.omit('__typename')(values)
        }
      })
    })
  }
)

const renderCharacs = ({ fields }) => <div>
  <ButtonGroup
    glyph='plus'
    onClick={() => fields.push({})}
  />
  <ListGroup>
    {fields.map((charac, index) =>
      <ListGroupItem key={index} >
        <ButtonGroup
          glyph='trash'
          onClick={() => fields.remove(index)}
          title='remove'
        />
        <Field
          component={FieldGroup}
          controlId={`${charac}.name`}
          label='Characteristic:'
          name={`${charac}.name`}
          type='text'
        />
        <Field
          component={FieldGroup}
          controlId={`${charac}.value`}
          label='Value:'
          name={`${charac}.value`}
          type='number'
        />
      </ListGroupItem>
    )}
  </ListGroup>
</div>

renderCharacs.propTypes = {
  fields: PropTypes.object.isRequired
}

const renderGear = ({ fields }) => <div>
  <ButtonGroup
    glyph='plus'
    onClick={() => fields.push({})}
  />
  <ListGroup>
    {fields.map((item, index) =>
      <ListGroupItem key={index} >
        <ButtonGroup
          glyph='trash'
          onClick={() => fields.remove(index)}
          title='remove'
        />
        <Field
          component={FieldGroup}
          controlId={`${item}.name`}
          label='Name:'
          name={`${item}.name`}
          type='text'
        />
        <Field
          component={FieldGroup}
          controlId={`${item}.description`}
          label='Description:'
          name={`${item}.description`}
          type='text'
        />
        <Field
          component={ImageGroup}
          controlId={`${item}.image`}
          label='Image:'
          name={`${item}.image`}
        />
        <Field
          component={FieldGroup}
          controlId={`${item}.count`}
          label='Count:'
          name={`${item}.count`}
          type='number'
        />
      </ListGroupItem>
    )}
  </ListGroup>
</div>

renderGear.propTypes = {
  fields: PropTypes.object.isRequired
}

const CharacterSheet = ({ handleSubmit }) =>
<form onSubmit={handleSubmit}>
  <Field
    component={CheckboxGroup}
    label='player sheet'
    name='isPlayer'
  />
  <Field
    component={FieldGroup}
    controlId='name'
    label='Character name:'
    name='name'
    type='text'
  />
  <Field
    component={FieldGroup}
    controlId='description'
    label='description:'
    name='description'
    type='text'
  />
  <Field
    component={ImageGroup}
    controlId='image'
    label='image:'
    name='image'
  />
  <FieldArray name='characs' component={renderCharacs} />
  <FieldArray name='gear' component={renderGear} />
  <ButtonGroup glyph='save' title='save' type='submit' />
</form>

CharacterSheet.propTypes = {
  ...formPropTypes
}

const CharacterSheetForm = reduxForm({
  enableReinitialize: true,
  form: 'content'
})(CharacterSheet)

export default branch(
  R.pipe(
    R.path(['initialValues', 'id']),
    R.isNil
  ),
  withCreateMutation,
  withUpdateMutation
)(CharacterSheetForm)
