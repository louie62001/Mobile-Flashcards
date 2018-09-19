import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { handleInitialData } from './actions'
import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import middleware from './middleware'

const Navigator = createBottomTabNavigator({
  DeckList: {
    screen: DeckList
  }, 
  NewDeck: {
    screen: NewDeck
  }
})

class App extends React.Component {

  render() {
    //debugger
    return (
      <Provider store={createStore(reducer, middleware)}>
        <Navigator />
      </Provider>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})