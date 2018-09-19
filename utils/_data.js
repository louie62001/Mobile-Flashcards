let decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'React uses javascript?',
          answer: true
        },
        {
          question: 'hello world',
          answer: true
        }
      ]
    },
    Javascript: {
      title: 'Javascript',
      questions: [
        {
          question: 'Javasciprt is the same as java?',
          answer: false
        }
      ]
    }
  }

export function _getDecks () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...decks}), 1000)
  })
}