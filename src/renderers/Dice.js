import React, { PropTypes } from 'react'
import { Label } from 'react-bootstrap'

const Dice = ({
  details,
  made,
  master,
  modifier,
  nbDices,
  nbSides,
  result
}) =>
    <div>
      <Label>Lancer les dés: {`${nbDices}D${nbSides}+${modifier}`}</Label>
        {
          (made || master) &&
            <div>
              <Label>Résultat: {result}</Label>
              <Label>Détails: {details}</Label>
            </div>
        }
    </div>

Dice.propTypes = {
  details: PropTypes.string,
  made: PropTypes.bool.isRequired,
  master: PropTypes.bool.isRequired,
  modifier: PropTypes.number.isRequired,
  nbDices: PropTypes.number.isRequired,
  nbSides: PropTypes.number.isRequired,
  result: PropTypes.number
}

export default Dice
