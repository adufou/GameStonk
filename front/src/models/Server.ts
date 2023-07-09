import Game from './Game';

interface Server {
    id: number;
    gameId: Game['id'];
    name: string;
}

export default Server;
