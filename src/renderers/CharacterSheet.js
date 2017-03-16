import React, { PropTypes } from 'react'
import { Label, Image, Panel, Table, Well } from 'react-bootstrap'

const CharacterSheet = ({
  characs,
  description,
  gear,
  image,
  isPlayer,
  name
}) => <Panel header={name}>
  {isPlayer && <Label>Player sheet</Label>}
  <Well>{description}</Well>
  {image && <Image src={image} rounded />}
  <Panel header='Characteristics'>
    <Table>
      <tbody>
        {characs.map(charac => <tr key={charac.name}>
          <td>{charac.name}:</td>
          <td>{charac.value}</td>
        </tr>)}
      </tbody>
    </Table>
  </Panel>
  <Panel header='Gear'>
    <Table>
      <tbody>
        {gear.map(item => <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.image && <Image src={item.image} rounded width='50' />}</td>
          <td>{item.count}</td>
        </tr>)}
      </tbody>
    </Table>
  </Panel>
</Panel>

CharacterSheet.propTypes = {
  characs: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  gear: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  isPlayer: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
}

export default CharacterSheet
