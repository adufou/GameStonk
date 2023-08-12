import Game from '@/models/Game';

interface Server {
    id: number;
    game: Game['id'];
    name: string;
}

export default Server;
