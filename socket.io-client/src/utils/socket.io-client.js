import io from 'socket.io-client';
import URL from '../configs/url';
const socket = io(URL);
export default socket;