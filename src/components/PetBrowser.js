import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  render() {
    const pets = this.props.pets.map(pet => 
      <Pet
      pet={pet}
      key={pet.id}
      onAdoptPet={this.props.onAdoptPet}
      isAdopted={pet.isAdopted}
      />
    )
    return <div className="ui cards">{pets}</div>
  }
}

export default PetBrowser
