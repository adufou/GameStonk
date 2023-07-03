import React, { useEffect } from 'react';
import ServerCard from './ServerCard';

const Server = ({ server }) => {
    return (
        <div>
            <ServerCard server={server}/>
        </div>
    );
};

export default Server;
