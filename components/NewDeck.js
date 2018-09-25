import React, { Component } from 'react'
import { 
    Text, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView,
    StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { createDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

class NewDeck extends Component {
    state = {
        title: ''
    }
    save = (title) => {
        this.props.dispatch(createDeck(title))
        //debugger
        
        saveDeckTitle(title)

        this.props.navigation.navigate('Deck', {deck: title, cards: 0})
     
        this.textInput.clear()
    }
    render() {
        const {title} = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.text}>Enter new deck title:</Text>
                <TextInput 
                  style={styles.input}
                  onChangeText={(title) => this.setState({title})}
                  value={title}
                  underlineColorAndroid='transparent'
                  placeholder='Enter title'
                  ref={input => { this.textInput = input }}
                />
                <TouchableOpacity 
                  disabled={title === '' ? true : false }
                  onPress={() => this.save(title)} 
                  style={title === '' ? styles.disabled : styles.button}> 
                    <Text style={styles.buttonText}>Create deck</Text>
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
    disabled: {
        backgroundColor: '#ccc',
        padding: 10, 
        margin: 10,
        borderRadius: 15,
        opacity: .2
    },
    text: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20
    }
})

export default connect () (NewDeck)