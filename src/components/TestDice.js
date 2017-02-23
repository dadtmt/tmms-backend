import React, { PropTypes } from 'react'
import { Label, ListGroupItem } from 'react-bootstrap'

import RichTextDisplay from './RichTextDisplay'

const TestDice = ({ details, modifier, nbDices, nbSides, result, text }) =>
  <ListGroupItem active={result !== null}>
    <RichTextDisplay rawContent={text} />
    <Label>Lancer les dés: {`${nbDices}D${nbSides}+${modifier}`}</Label>
    {
      result &&
        <div>
          <Label>Résultat: {result}</Label>
          <Label>Détails: {details}</Label>
        </div>
    }
  </ListGroupItem>

TestDice.propTypes = {
  details: PropTypes.string,
  modifier: PropTypes.number.isRequired,
  nbDices: PropTypes.number.isRequired,
  nbSides: PropTypes.number.isRequired,
  result: PropTypes.number,
  text: PropTypes.object.isRequired
}

export default TestDice
