import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import TYPES from './types';
import MessageResponder from './services/message-responder';
import { showRandomQuestion, checkAnswer } from './engine';

@injectable()
class Bot {
  private messageResponder: MessageResponder;

  private client: Client;

  private running = false;

  private readonly token: string;

  constructor(@inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.MessageResponder) messageResponder: MessageResponder) {
    this.client = client;
    this.token = token;
    this.messageResponder = messageResponder;
  }

  public sleepAndNext(ms: number): Promise<string> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public stop(): void {
    this.running = false;
  }

  public listen(): Promise<string> {
    this.client.once('ready', () => {
      console.log('Connected!');
    });

    this.client.on('message', async (message: Message) => {
      // todo: use code injection later
      // this.messageResponder.handle(message)
      //   .then(() => console.log('response sent'))
      //   .catch((error) => console.log('Error', error));

      if (message.content.search('!start') >= 0 && !this.running) {
        message.reply('');
        message.react('🥰');
        message.reply(showRandomQuestion());
        this.running = true;
      }

      if (message.content.search('^[0-9]*$') >= 0 && !this.running) {
        if (checkAnswer(message)) {
          message.reply('Próxima pergunta em 10 segundos...');
          await this.sleepAndNext(10000);
          message.reply(showRandomQuestion());
        }
      }

      // todo: only admin can stop
      if (message.content.search('!stop') >= 0 && this.running) {
        message.reply('Quiz encerrado!');
        this.running = false;
      }
    });

    return this.client.login(this.token);
  }
}

export default Bot;
