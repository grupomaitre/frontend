import { api } from '../../../config';

import io from 'socket.io-client';

export const socketTest = io(api.API_URL_SOCKET)
