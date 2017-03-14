import React, { PropTypes } from 'react'
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

import CharacterSheet from './CharacterSheet'

const SheetSelector = ({ selectSheet, selectedSheet, sheets }) => <div>
  <FormGroup controlId='selectCharacter'>
    <ControlLabel>Select Character</ControlLabel>
    <FormControl
      componentClass='select'
      onChange={selectSheet}
      placeholder='select'
      value={selectedSheet.id}
    >
      <option key='new' value=''>create a new character</option>
      {sheets.map(
        ({ node: { id, name } }) =>
          <option key={id} value={id} >{name}</option>
      )}
    </FormControl>
  </FormGroup>
  <CharacterSheet initialValues={selectedSheet} />
</div>

SheetSelector.propTypes = {
  selectSheet: PropTypes.func.isRequired,
  selectedSheet: PropTypes.object.isRequired,
  sheets: PropTypes.array.isRequired
}

export default SheetSelector
