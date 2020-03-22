import { Message } from 'discord.js';
import * as schema from './schema.json';

let quizActive = false;
let randomQuestion;
let question;


const showRandomQuestion = (): string => {
  randomQuestion = Math.floor(Math.random() * Object.keys(schema).length) + 1;
  question = schema[randomQuestion].question;
  const answer1 = schema[randomQuestion].choices[1];
  const answer2 = schema[randomQuestion].choices[2];
  // active quiz
  quizActive = true;
  return `Pergunta: ${question}1. ${answer1}\n2. ${answer2}`;
};

const checkAnswer = (message: Message): void => {
  if (quizActive && message.content === schema[randomQuestion].answer) {
    message.reply('correto!');
  }
};

export { showRandomQuestion, checkAnswer };
