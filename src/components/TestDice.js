import React, { PropTypes } from 'react'
import { Label, ListGroupItem } from 'react-bootstrap'

import RichTextDisplay from './RichTextDisplay'

const TestDice = ({
  details,
  made,
  master,
  modifier,
  nbDices,
  nbSides,
  result,
  text
}) =>
  <ListGroupItem active={made}>
    <RichTextDisplay rawContent={text} />
    <Label>Lancer les dés: {`${nbDices}D${nbSides}+${modifier}`}</Label>
    {
      (made || master) &&
        <div>
          <Label>Résultat: {result}</Label>
          <Label>Détails: {details}</Label>
        </div>
    }
  </ListGroupItem>

TestDice.propTypes = {
  details: PropTypes.string.isRequired,
  made: PropTypes.bool.isRequired,
  master: PropTypes.bool.isRequired,
  modifier: PropTypes.number.isRequired,
  nbDices: PropTypes.number.isRequired,
  nbSides: PropTypes.number.isRequired,
  result: PropTypes.number.isRequired,
  text: PropTypes.object.isRequired
}

export default TestDice
