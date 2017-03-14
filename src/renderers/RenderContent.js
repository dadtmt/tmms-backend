import R from 'ramda'
import React from 'react'
import { branch, renderComponent } from 'recompose'

import CharacterSheet from './CharacterSheet'
import Dice from './Dice'

const BaseComponent = () => <div />

const mayRenderDice = branch(
  R.propEq('type', 'dice'),
  renderComponent(Dice)
)

const mayRenderCharacterSheet = branch(
  R.propEq('type', 'characterSheet'),
  renderComponent(CharacterSheet)
)

export default R.pipe(mayRenderCharacterSheet, mayRenderDice)(BaseComponent)
