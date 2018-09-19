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

class NewDeck extends Component {
    state = {
        title: {
            title: '',
            questions: []
        }
    }

    async componentDidMount() {
        try {
                let deck = await AsyncStorage.getItem('@MobileCards')
                alert(deck)
                console.log('from promise in new deck', deck)
                this.setState(JSON.parse(deck))
                this.forceUpdate()
            }
                catch (error) {
                {alert(error)}
                }
        //this.removeItem('@MobileCards')
    }
    saveTitle = (title) => {
    debugger
    this.props.dispatch(createDeck({
        [title]: {
        'title': title,
        questions: []
      }
    }))
    /*this.setState({
      [title]: {
        'title': title,
        questions: []
      }
    }, () => console.log('after: ', this.state))*/
    
     AsyncStorage.setItem('@MobileCards', JSON.stringify(this.state))
     this.props.navigation.navigate('DeckList', {params: this.state})
  }
    render() {
        const {title} = this.state
        const {onSubmit} = this.props
        return (
            <KeyboardAvoidingView behavior='padding'>
                <Text>Enter new deck title</Text>
                <TextInput 
                  style={{height: 30, borderColor: 'gray', borderWidth: 1, padding: 5}}
                  onChangeText={(title) => this.setState({title})}
                  value={title}
                  underlineColorAndroid='transparent'
                  placeholder='Enter title'
                  /*onSubmitEditing={(item) => this.setState({title: ''})}*/
                />
                <Text>{JSON.stringify(title)}</Text>
                <TouchableOpacity onPress={(item) => this.saveTitle(title)}> 
                    <Text style={{fontSize: 25}}>Create deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default connect () (NewDeck)