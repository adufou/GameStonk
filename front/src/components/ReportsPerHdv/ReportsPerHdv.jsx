import React, { useState, useEffect, Fragment } from 'react';
import {Card, CardBody, Input, Label, Button, TableRow, Table, TableCell, TableBody, TableHeader} from '@windmill/react-ui'
import {getHoldingAssets} from "../../service/tradeService";
import TableCellItemBankReport from "./TableCellItemBankReport";
import {getUser} from "../../service/userService";

const ReportsPerHdv = () => {
    const [holdingsPerHdv, setHoldingPerHdv] = useState([])
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        // On set userId et userEmail
        getUser()
            .then(res => res.json())
            .then(data => {
                setUserId(data.pk)
            });

        getHoldingAssets()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                generateHoldindsPerHdv(data);
            })
    }, [])

    function generateHoldindsPerHdv(holdings) {
        const itemBankIdsAdded = []
        const holdingsPerHdvTemp = []

        holdings.map(holding => {
            const itemBank = holding.buyTransaction.itemPrice.item.itemBank

            const itemBankId = itemBank.id
            const itemBankHdvId = itemBank.hdv.id

            const itemBankHdvName = itemBank.hdv.name

            if (!itemBankIdsAdded.includes(id => id === itemBankId)) {
                itemBankIdsAdded.push(itemBankId);

                if (holdingsPerHdvTemp[itemBankHdvId] === undefined) {
                    holdingsPerHdvTemp[itemBankHdvId] = {
                        name: itemBankHdvName,
                        itemBanks: []
                    };
                }

                holdingsPerHdvTemp[itemBankHdvId].itemBanks.push(itemBank)
            }
        })

        console.log(holdingsPerHdvTemp)
        setHoldingPerHdv(holdingsPerHdvTemp)
    }

    // function removeItemBank(itemBankId) {
    //     const newHoldings = holdingsPerHdv;
    //
    //     console.log(newHoldings)
    //
    //     for (let i = 0; i < newHoldings.length; i++) {
    //         if (newHoldings[i] !== undefined) {
    //             for (let j = 0; j < newHoldings[i].itemBanks.length; j++) {
    //                 if (newHoldings[i].itemBanks[j].id === itemBankId) {
    //                     newHoldings[i].itemBanks.splice(j, 1);
    //                     break
    //                 }
    //             }
    //         }
    //     }
    //
    //     console.log(newHoldings)
    //     setHoldingPerHdv(newHoldings)
    // }

    return (
        <Fragment>
            <Card className="m-2">
                <CardBody>
                    {holdingsPerHdv.map(hdv => (
                        <div>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">{hdv.name}</p>
                            <Label>
                                <span>Mettre 0 au prix quand la quantité n'est pas disponible a l'achat</span>
                            </Label>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell>x1</TableCell>
                                        <TableCell>x10</TableCell>
                                        <TableCell>x100</TableCell>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {hdv.itemBanks.map(itemBank => (
                                        <TableRow>
                                            <TableCellItemBankReport userId={userId} itemBank={itemBank}/>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ))}
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default ReportsPerHdv;
