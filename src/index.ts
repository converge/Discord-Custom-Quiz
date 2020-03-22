import TYPES from './types';
import Bot from './bot';
import container from './inversify.config';


const bot = container.get<Bot>(TYPES.Bot);
bot.listen().then(() => {
  console.log('Logged in!');
}).catch((error) => {
  console.log('something went wrong! ', error);
});
