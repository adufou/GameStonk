import React from 'react';
import Server from './Server';
import { Input, Label, Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody } from '@windmill/react-ui'

const Game = ({ game }) => {
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>{game.name}</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {game.servers?.map((server) => {
                        return (
                            <TableRow key={server.name}>
                                {/* <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell> */}
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
