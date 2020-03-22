import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import TYPES from './types';
import MessageResponder from './services/message-responder';
import { showRandomQuestion, checkAnswer } from './engine/index';

@injectable()
class Bot {
  private client: Client;

  private readonly token: string;

  private messageResponder: MessageResponder;

  constructor(@inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.MessageResponder) messageResponder: MessageResponder) {
    this.client = client;
    this.token = token;
    this.messageResponder = messageResponder;
  }

  public listen(): Promise<string> {
    this.client.once('ready', () => {
      console.log('Connected!');
    });

    this.client.on('message', (message: Message) => {

      // todo: use code injection later
      // this.messageResponder.handle(message)
      //   .then(() => console.log('response sent'))
      //   .catch((error) => console.log('Error', error));

      if (message.content.search('!q') >= 0) {
        message.reply(showRandomQuestion());
        // message.react('🥰');
      }

      if (message.content.search('^[0-9]*$') >= 0) {
        checkAnswer(message);
      }
    });

    return this.client.login(this.token);
  }
}

export default Bot;
