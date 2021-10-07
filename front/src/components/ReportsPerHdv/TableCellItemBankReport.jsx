import {Button, Input, TableCell} from "@windmill/react-ui";
import React, {Fragment, useState} from "react";
import {postItemPrice} from "../../service/itemPriceService";
import {postItem} from "../../service/itemService";
import postReport from "../../service/reportService";


const TableCellItemBankReport = (props) => {
    const [priceOne, setPriceOne] = useState(0);
    const [priceTen, setPriceTen] = useState(0);
    const [priceHundred, setPriceHundred] = useState(0);
    const [hasReported, setHasReported] = useState(false);

    function onHandleBuyPriceOneChange (e) {
        changePrice(1, e)
    }

    function onHandleBuyPriceTenChange (e) {
        changePrice(10, e)
    }

    function onHandleBuyPriceHundredChange (e) {
        changePrice(100, e)
    }

    function changePrice(volume, e) {
        const priceStr = e.target.value;
        const regexp = /^[0-9b]+$/

        const oldPriceOne = priceOne;
        const oldPriceTen = priceTen;
        const oldPriceHundred = priceHundred;

        if (priceStr !== '') {
            if (regexp.test(priceStr)) {
                console.log(priceStr);
                switch (volume) {
                    case 1:
                        setPriceOne(Number(priceStr))
                        break
                    case 10:
                        setPriceTen(Number(priceStr))
                        break
                    case 100:
                        setPriceHundred(Number(priceStr))
                        break
                }
            }
            else {
                switch (volume) {
                    case 1:
                        setPriceOne(oldPriceOne)
                        break
                    case 10:
                        setPriceTen(oldPriceTen)
                        break
                    case 100:
                        setPriceHundred(oldPriceHundred)
                        break
                }
            }
        }
    }

    function report() {
        console.log('todo report')
        // On va poster 3 report pour 1 10 100, donc 3 itemprice à preparer
        // Limitation technique / à refaire (TODO) : on doit créer un item pour pouvoir faire des itemprice.

        if (priceOne === 0 && priceTen === 0 && priceHundred === 0) {
            return;
        }

        const userId = props.userId;
        const now = new Date(Date.now()).toISOString();

        // New item
        postItem(props.itemBank.id)
            .then(res => res.json())

            .then(data => {
                // ONE
                if (priceOne !== 0) {
                    // New item price
                    postItemPrice(data.id, priceOne, now)
                        .then(res => res.json())

                        // New report
                        .then(data => {
                            postReport(userId, data.id, 1)
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                })
                        })
                }

                // TEN
                if (priceTen !== 0) {
                    // New item price
                    postItemPrice(data.id, priceTen, now)
                        .then(res => res.json())

                        // New report
                        .then(data => {
                            postReport(userId, data.id, 10)
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                })
                        })
                }

                // HUNDRED
                if (priceHundred !== 0) {
                    // New item price
                    postItemPrice(data.id, priceHundred, now)
                        .then(res => res.json())

                        // New report
                        .then(data => {
                            postReport(userId, data.id, 100)
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                })
                        })
                }
            })


        setHasReported(true);
    }

    return (
        <Fragment>
            <TableCell>
                <span className="text-sm">
                    {props.itemBank.name}
                </span>
            </TableCell>
            <TableCell>
                <Input className="mt-1" type="number" value={priceOne} onChange={onHandleBuyPriceOneChange}/>
            </TableCell>
            <TableCell>
                <Input className="mt-1" type="number" value={priceTen} onChange={onHandleBuyPriceTenChange}/>
            </TableCell>
            <TableCell>
                <Input className="mt-1" type="number" value={priceHundred} onChange={onHandleBuyPriceHundredChange}/>
            </TableCell>
            <TableCell>
                { hasReported ? (
                    <Button disabled onClick={report}>Valider</Button>
                ) : (
                    <Button onClick={report}>Valider</Button>
                )}
            </TableCell>
        </Fragment>
    )
};

export default TableCellItemBankReport;
