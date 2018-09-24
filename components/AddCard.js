import React, { Component } from 'react'
import { 
    Text, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { saveCard } from '../actions'
import { addCardToDeck } from '../utils/api'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }
    save = (title, card) => {
        const {decks} = this.props
        //debugger
        const state = decks[title].questions

        this.props.dispatch(saveCard(title, card))

        addCardToDeck(title, card, state)

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
                    <Text style={{fontSize: 25, color: 'white'}}>Add Card</Text>
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