import { AsyncStorage } from 'react-native'
import { _getDecks } from './_data'

const DECK_KEY = 'mobileFlashcards:decks'

export function getInitialData () {
  return Promise.all([
      _getDecks(),
  ]).then(([decks]) => ({
	decks,
  }))
}

export function getDecks () {
    debugger
    return Promise.all([
        _getDecks()
    ]).then(([decks]) => ({
        decks
    }))
}

export function getDeck (id) {

}

export function saveTitle (title) {
    debugger
    AsyncStorage.setItem(DECK_KEY, title)
    .then((value) => {
        return value
    })
}

export function addCardToDeck (title, card) {

}