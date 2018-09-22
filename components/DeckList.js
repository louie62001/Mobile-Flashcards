import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import Deck from './Deck'
import NewDeck from './NewDeck'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { handleInitialData } from '../actions'

class DeckList extends Component {
    componentDidMount() {
      this.props.dispatch( handleInitialData() )
    }

//  async componentDidMount() {
//      try {
//        //debugger
//            let deck = await AsyncStorage.getItem('@MobileCards')
//            alert(deck)
//            console.log('from decklist promise', deck)
//            this.setState(JSON.parse(deck))
//            this.forceUpdate()
//          }
//            catch (error) {
//              {alert(error)}
//              {alert('you threw an error')}
//            }
//       //this.removeItem('@MobileCards')
//  }
//   async removeItem(key) {
//     try {
//       let remove = await AsyncStorage.removeItem(key)
//       console.log('item removed?', remove)
//     } catch (error) {
//       alert(error)
//     }
//   }
  details = (deck, cards) => {
    this.props.navigation.navigate('Deck', {deck, cards})
  }
  render() {
      const { decks, value } = this.props
      console.log('value is', value)

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
  const value = AsyncStorage.getItem('name').then((value) => value)
  return {
    decks,
    value
  }
}

export default connect(mapStateToProps) (DeckList)