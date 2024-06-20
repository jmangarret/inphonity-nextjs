import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const initializeEcho = (preRegisterId) => {
  window.Pusher = Pusher;

  return new Echo({
    broadcaster: 'pusher',
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: process.env.NEXT_PUBLIC_PUSHER_AUTH_ENDPOINT,
    forceTLS: true,
    auth: {
      headers: {
        'X-Pre-Register-ID': preRegisterId
      },
    }
  });
};

export default initializeEcho;
