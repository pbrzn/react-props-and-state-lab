import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleFilterChange = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  handleFilterClick = () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
      .then(resp => resp.json())
      .then((json) => {
        let formData = this.state.pets.concat(json)
        this.setState({
          pets: formData
        })
      })
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(json => {
        let formData = this.state.pets.concat(json)
        this.setState({
          pets: formData
        })
      });
    }
  }

  handleAdoptPet = (id) => {
    let adaptedPets = [...this.state.pets];
    let pet = adaptedPets.find(pet => pet.id === id);
    pet.isAdopted = true;
    this.setState({
      pets: adaptedPets,
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleFilterChange} onFindPetsClick={this.handleFilterClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
