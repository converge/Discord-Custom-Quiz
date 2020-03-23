import { Message } from 'discord.js';
import * as schema from './schema.json';

let randomQuestion;
let question;

/**
 * Shuffle a question from Schema(JSON)
 */
const showRandomQuestion = (): string => {
  randomQuestion = Math.floor(Math.random() * Object.keys(schema).length) + 1;
  question = schema[randomQuestion].question;
  const answer1 = schema[randomQuestion].choices[1];
  const answer2 = schema[randomQuestion].choices[2];
  return `Pergunta: ${question}1. ${answer1}\n2. ${answer2}`;
};

/**
 * Assess if the answer is correct
 * @param message
 */
const checkAnswer = (message: Message): boolean => {
  if (message.content === schema[randomQuestion].answer) {
    message.reply('correto!');
    return true;
  }
  return false;
};

export { showRandomQuestion, checkAnswer };
