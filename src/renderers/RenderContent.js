import R from 'ramda'
import React from 'react'
import { branch, renderComponent } from 'recompose'

import Dice from './Dice'

const BaseComponent = () => <div />

const mayRenderDice = branch(
  R.propEq('type', 'dice'),
  renderComponent(Dice)
)

export default mayRenderDice(BaseComponent)
