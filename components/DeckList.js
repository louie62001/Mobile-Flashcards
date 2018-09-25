import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
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
          <View style={styles.container}>
            {Object.keys(decks).map((deck) => {
                return (
                  <View key={deck} style={styles.decks}>
                    <TouchableOpacity onPress={() => this.details(deck, decks[deck].questions.length)}>
                      <Text style={styles.deckTitle}>{decks[deck].title}</Text>
                    </TouchableOpacity>
                    {Object.keys(decks[deck]).length > 0 
                    ? <Text style={styles.cardCount}>
                        {Object.keys(decks[deck].questions).length} card(s)
                      </Text>
                    : <Text style={styles.cardCount}>0 cards</Text> 
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

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#92a4ac'
  },
  decks: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  deckTitle: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold'
  },
  cardCount: {
    color: '#fff',
    fontSize: 15
  }
})

export default connect(mapStateToProps) (DeckList)