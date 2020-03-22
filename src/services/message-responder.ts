import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import PingFinder from './ping-finder';
import TYPES from '../types';

@injectable()
class MessageResponder {
  private pingFinder: PingFinder;

  constructor(@inject(TYPES.PingFinder) pingFinder: PingFinder) {
    this.pingFinder = pingFinder;
  }

  handle(message: Message): Promise<Message | Message[]> {
    if (this.pingFinder.isPing(message.content)) {
      return message.reply('pong!');
    }

    return Promise.reject();
  }
}

export default MessageResponder;
