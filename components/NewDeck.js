import React, { Component } from 'react'
import { 
    Text, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { createDeck } from '../actions'
import { saveDeckTitle } from '../utils/api';

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