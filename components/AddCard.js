import React, { Component } from 'react'
import { 
    Text, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView,
    StyleSheet } from 'react-native'
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
        const {deck} = this.props.navigation.state.params
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.text}>Enter new card information:</Text>
                <TextInput 
                  style={styles.input}
                  onChangeText={(question) => this.setState({question: question})}
                  value={card.question}
                  underlineColorAndroid='transparent'
                  placeholder='Enter question'
                  ref={input => { this.textInput = input }}
                />
                <TextInput 
                  style={styles.input}
                  onChangeText={(answer) => this.setState({answer: answer})}
                  value={card.answer}
                  underlineColorAndroid='transparent'
                  placeholder='Enter answer'
                  ref={input => { this.textInput = input }}
                />
                <TouchableOpacity 
                  disabled={card.question === '' || card.answer === '' ? true : false} 
                  onPress={() => this.save(deck, card)} 
                  style={card.question === '' || card.answer === '' ? styles.disabled : styles.button}> 
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#92a4ac'
    },
    input: {
        width: 250,
        height: 30, 
        borderBottomWidth: 1, 
        borderColor: '#fff',
        padding: 5, 
        marginBottom: 20
    },
    button: {
        backgroundColor: '#444d47',
        padding: 10, 
        margin: 10,
        borderRadius: 15
    },
    buttonText: {
        fontSize: 25, 
        color: '#fff', 
    },
    text: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20
    },
    disabled: {
        backgroundColor: '#ccc',
        padding: 10, 
        margin: 10,
        borderRadius: 15,
        opacity: .2
    },
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect (mapStateToProps) (AddCard)