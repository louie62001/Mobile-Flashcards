import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'

export default class Deck extends Component {
    /*async componentDidMount() {
     try {
            let deck = await AsyncStorage.getItem('@MobileCards')
            debugger
            alert(deck)
            console.log('from promise', deck)
            this.setState(JSON.parse(deck))
          }
           catch (error) {
             {alert(error)}
           }
  }*/
    render() {
        const {deck} = this.props
        console.log('From deck page: ', deck)
        return (
            <View>
                <Text>{deck.title}</Text>
                <Text style={{justifyContent: 'center', alignContent: 'center'}}>Hello</Text>
            </View>
        )
    }
}