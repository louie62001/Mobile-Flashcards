import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { compose, createStore } from 'redux'
import { Provider, AsyncStorage } from 'react-redux'
//import { persistStore, autorehydrate } from 'redux-persist'
import reducer from './reducers'
import middleware from './middleware'
import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList
  }, 
  NewDeck: {
    screen: NewDeck
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
      navigationOptions: {
       header: null 
      }
  },
  Deck: {
    screen: Deck,
  },
  AddCard: {
    screen: AddCard,
      navigationOptions: {
        headerTitle: 'Add Card'
      }
  },
  Quiz: {
    screen: Quiz,
      navigationOptions: {
        headerTitle: 'Quiz'
      }
  }
})

class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    //const store = createStore(reducer, compose(middleware, autorehydrate()))
    //persistStore(store, { storage: AsyncStorage})
    return (
      <Provider store={createStore(reducer, middleware)}>
        <MainNavigator />
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