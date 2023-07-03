import React, { useState } from 'react';
import Server from './Server';
import { Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody } from '@windmill/react-ui'
import { GrAdd, GrSubtract } from 'react-icons/gr'
import ConfigIcon from "../Icon/ConfigIcon";
import GameCard from './GameCard';


const Game = ({ game }) => {
    return (
        <div>
            <GameCard game={game} />
            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell className='flex place-content-between'>
                                <span>
                                    SERVERS
                                </span>
                                <div>
                                    <Button size="small" layout="link">
                                        <ConfigIcon>
                                            <GrAdd/>
                                        </ConfigIcon>
                                    </Button>
                                    <Button size="small" layout="link">
                                        <ConfigIcon>
                                            <GrSubtract />
                                        </ConfigIcon>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {game.servers?.map((server) => {
                        return (
                            <TableRow key={server.name}>
                                <TableCell>
                                    <Server server={server} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Game;
