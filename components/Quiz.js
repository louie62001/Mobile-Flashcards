import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification } from '../utils/helpers'

function CorrectButton ({ onPress }) {
 //debugger
 return (
     <View>
        <TouchableOpacity 
          style={{backgroundColor: 'black', padding: 10, margin: 10}}
          onPress={onPress}>
            <Text style={{ color: 'white'}}>Correct</Text>
        </TouchableOpacity>
    </View>
 )
}

function IncorrectButton ({ onPress }) {
    return (
        <View>
        <TouchableOpacity 
          style={{backgroundColor: 'black', padding: 10, margin: 10}}
          onPress={onPress}>
            <Text style={{ color: 'white'}}>Incorrect</Text>
        </TouchableOpacity>
        </View>
    )
}

class Quiz extends Component {
    state = {
        questionCount: 1,
        index: 0,
        showQuestion: true,
        showAnswer: false,
        score: 0
    }
    clearReminder() {
        clearLocalNotification()
    }
    correct(index, questionCount, score) {
        //debugger
        const {questions} = this.props
        this.setState((state) => {
            return {
            ...state,
            index: index + 1,
            questionCount: questionCount + 1,
            score: score + 1
            }
        })
        this.clearReminder()
    }
    incorrect(index, questionCount) {
        //debugger
        const {questions} = this.props
        this.setState((state) => {
            return {
            ...state,
            index: index + 1,
            questionCount: questionCount + 1
            }
        })
        this.clearReminder()
    }
    reset() {
        this.setState(() => {
            return {
                questionCount: 1,
                index: 0,
                showQuestion: true,
                showAnswer: false,
                score: 0
            }
        })
    }
    render() {
        const {questions, navigation} = this.props
        const {questionCount, index, showAnswer, showQuestion, score} = this.state
        return (
            <View style={{flex: 1, marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                {questionCount <= questions.length && (
                    <Text style={{margin: 50}}>Question {questionCount} of {questions.length}</Text>
                )}
                {showAnswer === true && (
                    <View style={{flex: 1, marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 30}}>Answer: {'' + questions[index].answer}</Text>
                        <Text style={{fontWeight: 'bold', color: 'red', marginTop: 10, marginBottom: 10}} onPress={(counter) => this.setState({showAnswer: !showAnswer, showQuestion: !showQuestion})}>View Question</Text>
                        <CorrectButton onPress={() => this.correct(index, questionCount, score)} />
                        <IncorrectButton onPress={() => this.incorrect(index, questionCount)} />
                    </View>
                )}
                {showQuestion !== false && (
                    questionCount <= questions.length
                    ? <View style={{flex: 1, marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 30}}>{questions[index].question}</Text>
                        <Text style={{fontWeight: 'bold', color: 'red', marginTop: 10, marginBottom: 10}} 
                          onPress={() => this.setState({showAnswer: !showAnswer, showQuestion: !showQuestion})}>
                          View Answer</Text>
                        <CorrectButton onPress={() => this.correct(index, questionCount, score)} />
                        <IncorrectButton onPress={() => this.incorrect(index, questionCount)} />
                      </View>
                    : <View style={{flex: 1, marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>Score: {score}</Text>
                        <TouchableOpacity   
                          style={{backgroundColor: 'black', padding: 10, margin: 10}}
                          onPress={() => this.reset()}>
                            <Text style={{color: 'white'}}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={{backgroundColor: 'black', padding: 10, margin: 10}}
                          onPress={() => navigation.goBack()}>
                            <Text style={{color: 'white'}}>Return To Deck</Text>
                        </TouchableOpacity>
                      </View>
                )}
            </View>
        )
    }
}

function mapStateToProps(decks, { navigation }) {
 //debugger
    const deck = navigation.state.params.deck
    const questions = decks[deck].questions
    return {
        questions
    }
}

export default connect (mapStateToProps)(Quiz)