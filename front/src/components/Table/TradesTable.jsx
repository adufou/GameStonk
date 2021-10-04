import React, { useState, useEffect, Fragment } from 'react';
import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Badge
} from '@windmill/react-ui'
import {getUser} from "../../service/userService";
import {getRealizedTrades} from "../../service/tradeService";

const TradesTable = () => {
    const [userId, setUserId] = useState(0);
    const [realizedTrades, setRealizedTrades] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:4000/login');
        } else {
            getRealizedTrades()
                .then(res => res.json())
                .then(data => {
                    generateRealizedSellsFromTrades(data)
                    console.log(realizedTrades)
                })
        }
    }, [])

    function generateRealizedSellsFromTrades(trades) {
        const realized = []

        trades.map(trade => {
            const tradeId = trade.id
            const itemName = trade.buyTransaction.itemPrice.item.itemBank.name
            const volume = trade.buyTransaction.volume
            const buyPrice = trade.buyTransaction.itemPrice.price
            const sellPrice = trade.sellTransaction.itemPrice.price

            const realizedTrade = {
                tradeId: tradeId,
                itemName: itemName,
                volume: volume,
                buyPrice: buyPrice,
                sellPrice: sellPrice
            }

            realized.push(realizedTrade)
        })

        console.log(realized)
        setRealizedTrades(realized)
    }

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Volume</TableCell>
                        <TableCell>Prix d'achat</TableCell>
                        <TableCell>Prix de revente</TableCell>
                        <TableCell>Performance</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {realizedTrades.map(trade => (
                        <TableRow >
                            <TableCell>
                                <div className="flex items-center text-sm">
                                    <span className="font-semibold ml-2">
                                        {trade.itemName}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm">
                                    {trade.volume}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span>
                                    {trade.buyPrice}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span>
                                    {trade.sellPrice}
                                </span>
                            </TableCell>
                            <TableCell>
                                {trade.buyPrice <= trade.sellPrice ? (
                                    <Badge type="success">
                                        +{ (((trade.sellPrice - trade.buyPrice) / trade.buyPrice) * 100).toFixed(2) }%
                                    </Badge>
                                ) : (
                                    <Badge type="danger">
                                        { (((trade.sellPrice - trade.buyPrice) / trade.buyPrice) * 100).toFixed(2) }%
                                    </Badge>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default TradesTable;
