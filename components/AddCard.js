import React, { Component } from 'react'
import { 
    View,
    Text, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView, 
    AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions'

const ASYNC_KEY = 'MobileFlashcards:decks'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }
    save = (title, card) => {
     this.props.dispatch(addCardToDeck(title, card))
     this.props.navigation.navigate('Deck', { deck: title })
    }
    render() {
        const card = this.state
        const decks = this.props
        const {deck} = this.props.navigation.state.params
        return (
            <KeyboardAvoidingView behavior='padding' style={{margin: 30, alignContent: 'center'}}>
                <TextInput 
                  style={{height: 30, borderColor: 'gray', borderWidth: 1, padding: 5, marginBottom: 20}}
                  onChangeText={(question) => this.setState({question: question})}
                  value={card.question}
                  underlineColorAndroid='transparent'
                  placeholder='Enter question'
                  ref={input => { this.textInput = input }}
                />
                <TextInput 
                  style={{height: 30, borderColor: 'gray', borderWidth: 1, padding: 5, marginBottom: 20}}
                  onChangeText={(answer) => this.setState({answer: answer})}
                  value={card.answer}
                  underlineColorAndroid='transparent'
                  placeholder='Enter answer'
                  ref={input => { this.textInput = input }}
                />
                <TouchableOpacity onPress={(deckTitle, cardInfo) => this.save(deck, card)} style={{backgroundColor: 'black', padding: 10, margin: 10}}> 
                    <Text style={{fontSize: 25, color: 'white'}}>Create deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect (mapStateToProps) (AddCard)