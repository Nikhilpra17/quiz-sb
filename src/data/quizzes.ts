/**
 * Simulates an asynchronous API call to retrieve quizzes.
 * Please don't modify this in your submission. :)
 */
export const getQuizzes = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      title: 'Basics of HTML',
      questions: [
        {
          text: 'Which element is used for a top-level heading?',
          correctAnswer: 'h1',
          incorrectAnswers: ['div', 'h0', 'p'],
        },
        {
          text: 'Which element is used for a page break?',
          correctAnswer: 'br',
          incorrectAnswers: ['div', 'break', 'p'],
        },
        {
          text: 'Which markup makes a link?',
          correctAnswer: "<a href='/cats' />",
          incorrectAnswers: [
            "<href a='/cats' />",
            "<a src='/cats' />",
            "<link href='/cats' />",
          ],
        },
        {
          text: 'Which markup correctly creates an image?',
          correctAnswer: "<img src='cat.jpg' />",
          incorrectAnswers: [
            "<src img='cat.jpg' />",
            '<img>cat.jpg</img>',
            '<src>cat.jpg</img>',
          ],
        },
      ],
    },
    {
      title: 'Basics of CSS',
      questions: [
        {
          text: 'Which markup correctly assigns an HTML element a CSS class?',
          correctAnswer: "<div class='cat'>hi</div>",
          incorrectAnswers: [
            "<div className='cat'>hi</div>",
            "<div>hi</div className='cat'>",
            "<div class='cat'>hi</div class='cat'>",
          ],
        },
        {
          text:
            'Which markup is CSS that sets all cat classes to have pink font?',
          correctAnswer: '.cat { color: pink; }',
          incorrectAnswers: [
            'cat { color: pink; }',
            '<cat> color: pink; </cat>',
          ],
        },
      ],
    },
  ];
};

/**
 * Simulates an asynchronous API call to retrieve quizzes.
 * Ignore this method unless you choose to take on Delighter C.
 * Please also don't modify this in your submission. :)
 */
export const getMoreQuizzes = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      title: 'Basics of JS',
      questions: [
        {
          text: 'Which declaration creates a variable in block scope?',
          correctAnswer: 'let power = 9001;',
          incorrectAnswers: [
            'var power = 9001;',
            'power = 9001;',
            'int power = 9001;',
          ],
        },
        {
          text: 'Which of the following is correct?',
          correctAnswer:
            'JavaScript is used in browsers, servers, and other applications.',
          incorrectAnswers: [
            'JavaScript is a universally respected and loved language.',
            'JavaScript is a completed language and will no longer change.',
            'JavaScript includes a syntax for declaring variable types.',
          ],
        },
      ],
    },
    {
      title: 'JavaScript Network Requests',
      questions: [
        {
          text: 'What is the purpose of an XMLHTTPRequest?',
          correctAnswer: 'To send an asynchronous request to a web endpoint',
          incorrectAnswers: [
            'To fetch XML from a local HTTP server.',
            'To receive a file input from the user.',
          ],
        },
        {
          text: 'Which API generally supersedes XMLHTTPRequest?',
          correctAnswer: 'fetch',
          incorrectAnswers: ['get', 'curl', 'async/await'],
        },
      ],
    },
  ];
};
