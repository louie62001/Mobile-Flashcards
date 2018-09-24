import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions'

class DeckList extends Component {
    componentDidMount() {
      this.props.dispatch( handleInitialData() )
    }
  details = (deck, cards) => {
    this.props.navigation.navigate('Deck', {deck, cards})
  }
  render() {
      //debugger
      const { decks } = this.props
      
      return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {Object.keys(decks).map((deck) => {
                return (
                  <View key={deck} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => this.details(deck, decks[deck].questions.length)}>
                      <Text style={{fontSize: 25}}>{decks[deck].title}</Text>
                    </TouchableOpacity>
                    {Object.keys(decks[deck]).length > 0 
                    ? <Text style={{alignItems: 'center', justifyContent: 'center'}}>
                        {Object.keys(decks[deck].questions).length} card(s)
                      </Text>
                    : <Text style={{alignItems: 'center', justifyContent: 'center'}}>0 cards</Text> 
                    }  
                  </View>
                )
              })}
          </View>
      )
  }
}

function mapStateToProps (decks) {
  //debugger
  return {
    decks,
  }
}

export default connect(mapStateToProps) (DeckList)