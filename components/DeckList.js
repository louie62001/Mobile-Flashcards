import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'
//import { createBottomTabNavigator } from 'react-navigation'
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
//            let deck = await AsyncStorage.getItem('@MobileCards')
//            alert(deck)
//           console.log('from promise', deck)
//            this.setState(JSON.parse(deck))
//            this.forceUpdate()
//          }
//            catch (error) {
//              {alert(error)}
//            }
      //this.removeItem('@MobileCards')
//  }
  async removeItem(key) {
    try {
      let remove = await AsyncStorage.removeItem(key)
      console.log('item removed?', remove)
    } catch (error) {
      alert(error)
    }
  }
  details = (deck) => {
    const decks = this.state
    debugger
    return (
      <Deck deck={decks[deck]} />
    )
  }
  render() {
      const { decks } = this.props
      debugger
      //dispatch(receiveDecks)
      //console.log('entries: ', this.props.dispatch(receiveDecks))

      return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          
            {Object.keys(decks).map((deck) => {
                return (
                  <View key={deck} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => this.details(deck)}>
                      {/*<Text style={{fontSize: 25}}>{decks[deck].title}</Text>*/}
                      <Deck deck={decks[deck]} />
                    </TouchableOpacity>
                    {Object.keys(decks[deck]).length > 0 
                    ? <Text style={{alignItems: 'center', justifyContent: 'center'}}>
                        {Object.keys(decks[deck].questions).length} cards
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
  debugger
  return {
    decks
  }
}

export default connect(mapStateToProps) (DeckList)