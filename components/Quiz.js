import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification } from '../utils/helpers'

function CorrectButton ({ onPress }) {
 //debugger
 return (
     <View>
        <TouchableOpacity 
          style={styles.button}
          onPress={onPress}>
            <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>
    </View>
 )
}

function IncorrectButton ({ onPress }) {
    return (
        <View>
        <TouchableOpacity 
          style={styles.button}
          onPress={onPress}>
            <Text style={styles.buttonText}>Incorrect</Text>
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

    correct(index, questionCount, score) {
        //debugger
        this.setState((state) => {
            return {
            ...state,
            index: index + 1,
            questionCount: questionCount + 1,
            score: score + 1,
            showAnswer: false,
            showQuestion: true
            }
        })
        clearLocalNotification()
    }
    incorrect(index, questionCount) {
        //debugger
        this.setState((state) => {
            return {
            ...state,
            index: index + 1,
            questionCount: questionCount + 1,
            showAnswer: false,
            showQuestion: true
            }
        })
        clearLocalNotification()
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
            <View style={styles.container}>
                {questionCount <= questions.length && (
                    <Text style={styles.questionCount}>{questionCount} of {questions.length}</Text>
                )}
                {showAnswer === true && (
                    <View style={styles.dataContainer}>
                        <Text style={styles.questionAnswerText}>{'' + questions[index].answer}</Text>
                        <Text style={styles.flipButtonText} 
                        onPress={() => this.setState({showAnswer: !showAnswer, showQuestion: !showQuestion})}>View Question</Text>
                        <CorrectButton onPress={() => this.correct(index, questionCount, score)} />
                        <IncorrectButton onPress={() => this.incorrect(index, questionCount)} />
                    </View>
                )}
                {showQuestion !== false && (
                    questionCount <= questions.length
                    ? <View style={styles.dataContainer}>
                        <Text style={styles.questionAnswerText} textAlign='center'>{questions[index].question}</Text>
                        <Text style={styles.flipButtonText} 
                          onPress={() => this.setState({showAnswer: !showAnswer, showQuestion: !showQuestion})}>
                          View Answer</Text>
                        <CorrectButton onPress={() => this.correct(index, questionCount, score)} />
                        <IncorrectButton onPress={() => this.incorrect(index, questionCount)} />
                      </View>
                    : <View style={[styles.dataContainer, {justifyContent: 'center'}]}>
                        <Text style={styles.score}>Score: {score}</Text>
                        <TouchableOpacity   
                          style={[styles.button, {width: 200}]}
                          onPress={() => this.reset()}>
                            <Text style={styles.buttonText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[styles.button, {width: 200}]}
                          onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Return To Deck</Text>
                        </TouchableOpacity>
                      </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: '#92a4ac'
    },
    questionCount: {
        flex: 1,
        textAlign: 'right',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        fontSize: 20,
        justifyContent: 'flex-start',
        color: '#fff'
    },
    dataContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    questionAnswerText: {
        fontSize: 30,
        textAlign: 'center',
        color: '#fff'
    },
    flipButtonText: {
        fontWeight: 'bold', 
        color: '#ffd820', 
        marginTop: 10, 
        marginBottom: 10,
        fontSize: 18
    },
    button: {
        backgroundColor: '#444d47',
        padding: 10, 
        margin: 10,
        borderRadius: 15,
        width: 120,
    },
    buttonText: {
        fontSize: 25, 
        color: '#fff', 
        textAlign: 'center'
    },
    score: {
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20,
        color: '#fff'
    }

})

function mapStateToProps(decks, { navigation }) {
 //debugger
    const deck = navigation.state.params.deck
    const questions = decks[deck].questions
    return {
        questions
    }
}

export default connect (mapStateToProps)(Quiz)