import ServerModel from '@/models/server.model';

interface GameModel {
    id: number;
    name: string;
    servers: ServerModel[];
}

export default GameModel;
