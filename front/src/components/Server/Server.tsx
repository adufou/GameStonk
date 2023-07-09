import React from 'react';
import ServerCard from './ServerCard';
import ServerModel from '../../models/Server';

interface ServerProps {
    server: ServerModel;
}

const Server = ({ server }: ServerProps): React.ReactElement => {
    return (
        <div>
            <ServerCard server={server} />
        </div>
    );
};

export default Server;
