import { _getDecks } from './_data'
import { AsyncStorage } from 'react-native'
import { FLASHCARDS_KEY } from './helpers'

export function saveDeckTitle (title) {
  debugger
  try {
        AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify({
            [title]: {
                title: title,
                questions: []
            }
        }))
  } catch (error) {
        alert(error)
  }
}

export function addCardToDeck (title, card, state) {
  debugger
  try {
        AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify({
            [title]: {
                questions: [
                            ...state.concat(card)
                ]
            }
        }))
  } catch (error) {
        alert(error)
  }
}

export function getInitialData () {
  return Promise.all([
    _getDecks(),
  ]).then(([decks]) => ({
	decks,
  }))
}