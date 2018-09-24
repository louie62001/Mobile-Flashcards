import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const {deck} = navigation.state.params
        
        return {
            title: `${deck}`
        }        
    }

    addCard (deck, cards) {
        this.props.navigation.navigate('AddCard', {deck: deck, cards: cards})
    }

    quiz (deck, cards) {
        this.props.navigation.navigate('Quiz', {deck: deck, cards: cards})
    }

    render() {
        const {deck} = this.props.navigation.state.params
        const {cards} = this.props
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>{deck}</Text>
                    <Text>{cards} card(s)</Text>
                <TouchableOpacity style={{backgroundColor: 'black', padding: 10, margin: 10}}>
                    <Text style={{ color: 'white'}} onPress={() => this.addCard(deck, cards)}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'black', padding: 10, margin: 10}}>
                    <Text style={{ color: 'white'}} onPress={() => this.quiz(deck, cards)}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps (decks, title) {
    const deckName = title.navigation.state.params.deck
    const cards = decks[deckName].questions.length
    return {
        cards
    }
}

export default connect (mapStateToProps) (Deck)