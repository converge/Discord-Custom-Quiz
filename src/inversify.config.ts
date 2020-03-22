import 'reflect-metadata';
import { Container } from 'inversify';
import { Client } from 'discord.js';
import TYPES from './types';
import Bot from './bot';
import MessageResponder from './services/message-responder';
import PingFinder from './services/ping-finder';

require('dotenv').config();

const container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();

export default container;
