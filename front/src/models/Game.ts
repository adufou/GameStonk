import Server from './Server';

interface Game {
    id: number;
    name: string;
    servers: Server[];
}

export default Game;
