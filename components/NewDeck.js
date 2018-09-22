import React, { Component } from 'react'
import { 
    View,
    Text, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView, 
    AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { createDeck } from '../actions'

const ASYNC_KEY = 'MobileFlashcards:decks'

class NewDeck extends Component {
    state = {
        title: ''
    }
    save = (title) => {
     this.props.dispatch(createDeck(title))
     this.saveToStore(title)
     this.props.navigation.navigate('Deck', {deck: title, cards: 0})
     this.textInput.clear()

    }
    saveToStore (title) {
        try {
            //await AsyncStorage.removeItem('@MobileCards')
           AsyncStorage.setItem('name', JSON.stringify(title))
        } catch (error) {
            alert(error)
        }
    }
    render() {
        const {title} = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={{flex: 1, margin: 30}}>
                <Text style={{alignContent: 'center'}}>Enter new deck title</Text>
                <TextInput 
                  style={{height: 30, borderColor: 'gray', borderWidth: 1, padding: 5}}
                  onChangeText={(title) => this.setState({title})}
                  value={title}
                  underlineColorAndroid='transparent'
                  placeholder='Enter title'
                  ref={input => { this.textInput = input }}
                />
                <TouchableOpacity onPress={(item) => this.save(title)} style={{backgroundColor: 'black', padding: 10, margin: 10}}> 
                    <Text style={{fontSize: 25, color: 'white', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>Create deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default connect () (NewDeck)