import R from 'ramda'
import React from 'react'
import { branch, renderComponent } from 'recompose'

import SheetSelector from './SheetSelectorWithData'
import Dice from './Dice'

const BaseComponent = () => <div />

const mayRenderDice = branch(
  R.propEq('type', 'dice'),
  renderComponent(Dice)
)

const mayRenderCharacterSheet = branch(
  R.propEq('type', 'characterSheet'),
  renderComponent(SheetSelector)
)

export default R.pipe(mayRenderCharacterSheet, mayRenderDice)(BaseComponent)
