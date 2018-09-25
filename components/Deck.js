import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
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
            <View style={styles.container}>
                <Text style={styles.deckTitle}>{deck}</Text>
                    <Text style={styles.cardText}>{cards} card(s)</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.addCard(deck, cards)}>
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={cards === 0 ? styles.disabled : styles.button} 
                  disabled={cards === 0 ? true : false}
                  onPress={() => this.quiz(deck, cards)}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#92a4ac'
    },
    deckTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff'
    },
    cardText: {
        fontSize: 20,
        marginBottom: 20,
        color: '#fff'
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
})

function mapStateToProps (decks, title) {
    const deckName = title.navigation.state.params.deck
    const cards = decks[deckName].questions.length
    return {
        cards
    }
}

export default connect (mapStateToProps) (Deck)