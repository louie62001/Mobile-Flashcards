let decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'React uses javascript?',
          answer: true
        },
        {
          question: 'React is a newer version of angular?',
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
    },
    HTML: {
      title: 'HTML',
      questions: [
        {
          question: 'What does HTML stand for?',
          answer: 'HyperText Markup Language'
        },
        {
          question: 'HTML uses tags to build webpages?',
          answer: true
        }
      ]
    }
  }

export function _getDecks () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...decks}), 1000)
  })
}