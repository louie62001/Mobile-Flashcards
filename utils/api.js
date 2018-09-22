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

export function getDeck (id) {

}

export function saveTitle (title) {
    //debugger
    //return AsyncStorage.mergeItem(DECK_KEY, title)
}

export function addCardToDeck (title, card) {

}