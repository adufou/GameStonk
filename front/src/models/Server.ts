import Game from './Game';

interface Server {
    id: number;
    game: Game['id'];
    name: string;
}

export default Server;
