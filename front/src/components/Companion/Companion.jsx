import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardBody, Input, Label, Button } from '@windmill/react-ui'

import SelectWrapper from '../SelectWrapper/SelectWrapper'
import {getItemBank, postItemBank} from "../../service/itemBankService";
import {getUser} from "../../service/userService";
import {postItem} from "../../service/itemService";
import {postItemPrice} from "../../service/itemPriceService";
import {postTransaction} from "../../service/transactionService";
import {getUnrealizedTrades, updateTrade, postTrade, getHoldingAssets} from "../../service/tradeService";
import {getHdvBank, postHdvBank} from "../../service/hdvBankService"
import redirect from '../../tools/redirect';

const Companion = () => {
    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState(0);
    const [hdvBank, setHdvBank] = useState([]);
    const [itemBank, setItemBank] = useState([]);
    const [userHoldingAssets, setUserHoldingAssets] = useState([]);
    const [userUnrealizedSells, setUserUnrealizedSells] = useState([]);

    const [newHdvBankName, setNewHdvBankName] = useState('');
    const [newItemBankName, setNewItemBankName] = useState('');
    const [selectedVolume, setSelectedVolume] = useState(1);
    const [buyPrice, setBuyPrice] = useState(1);
    const [sellPrice, setSellPrice] = useState(1);
    const [selectedHdvBank, setSelectedHdvBank] = useState(0);
    const [selectedItemBank, setSelectedItemBank] = useState(0);
    const [selectedUserHoldingAsset, setSelectedUserHoldingAsset] = useState(0)
    const [selectedUserUnrealizedSell, setSelectedUserUnrealizedSell] = useState(0)

    const volumeBank = [
        {'value': 1, 'text': 'x1'},
        {'value': 10, 'text': 'x10'},
        {'value': 100, 'text': 'x100'}
    ];

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            redirect('login');
        } else {
            // On set userId et userEmail
            getUser()
                .then(res => res.json())
                .then(data => {
                    setUserId(data.pk)
                });

            // On set hdvBank et selectedHdvBank
            getHdvBank()
                .then(res => res.json())
                .then(data => {
                    let bank = []
                    data.map(item => {
                        bank.push({
                            'value': item.id,
                            'text': item.name
                        });
                    })
                    setHdvBank(bank);
                    if (bank.length > 0)
                        setSelectedHdvBank(bank[0].value)
                })

            // On set itemBank et selectedItemBank
            getItemBank()
                .then(res => res.json())
                .then(data => {
                    let bank = [];
                    data.map(item => {
                        bank.push({
                            'value': item.id,
                            'text': item.name
                        });
                    })
                    setItemBank(bank);
                    if (bank.length > 0)
                        setSelectedItemBank(bank[0].value)
                })

            // On set holding assets
            getHoldingAssets()
                .then(res => res.json())
                .then(data => {
                    generateHoldingAssetsFromTrades(data)
                })

            // On set unrealized sells
            getUnrealizedTrades()
                .then(res => res.json())
                .then(data => {
                    generateUnrealizedSellsFromTrades(data)
                })

            // End loading
            setLoading(false);
        }
    }, []);

    function onHandleBuyPriceChange (e) {
        const oldPrice = buyPrice;
        const priceStr = e.target.value;
        const regexp = /^[0-9b]+$/

        if (priceStr !== '') {
            if (regexp.test(priceStr)) {
                console.log(priceStr);
                setBuyPrice(Number(priceStr));
            }
            else {
                console.log(oldPrice);
                setBuyPrice(oldPrice);
            }
        }
    }

    function onHandleSellPriceChange (e) {
        const oldPrice = sellPrice;
        const priceStr = e.target.value;
        const regexp = /^[0-9b]+$/

        if (priceStr !== '') {
            if (regexp.test(priceStr)) {
                console.log(priceStr);
                setSellPrice(Number(priceStr));
            }
            else {
                console.log(oldPrice);
                setSellPrice(oldPrice);
            }
        }
    }

    function onHandleSelectedItemBank(e) {
        setSelectedItemBank(Number(e))
    }

    function addHdv() {
        if (newHdvBankName === '')
            return

        const body = JSON.stringify({
            "name": newHdvBankName
        });

        postHdvBank(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const newHdv = {
                    "value": data.id,
                    "text": data.name
                };
                setHdvBank([...hdvBank, newHdv])
                setNewHdvBankName('')
                setSelectedHdvBank(Number(data.id))
            })
    }

    function addItem() {
        if (newItemBankName === '')
            return

        console.log(selectedItemBank)

        const body = JSON.stringify({
            "name": newItemBankName,
            "hdv": selectedHdvBank,
            "itemBank": selectedItemBank,
        });

        postItemBank(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const newItem = {
                    "value": data.id,
                    "text": data.name
                };
                setItemBank([...itemBank, newItem])
                setNewItemBankName('')
                setSelectedItemBank(Number(data.id))
            })
    }

    function generateHoldingAssetsFromTrades(trades) {
        const assets = []

        trades.map(trade => {
            const volume = trade.buyTransaction.volume
            const price = trade.buyTransaction.itemPrice.price
            const name = trade.buyTransaction.itemPrice.item.itemBank.name

            const assetTitle = '[' + volume + '] ' + name + ' | Acheté ' + price + 'K';

            const item = trade.buyTransaction.itemPrice.item.id
            const transaction = trade.buyTransaction.id
            const sellOrderPrice = trade.sellOrderPrice

            const asset = {
                'value': trade.id,
                'text': assetTitle,
                'item': item,
                'volume': volume,
                'transaction': transaction,
                'sellOrderPrice': sellOrderPrice
            }
            assets.push(asset)
        })

        console.log(assets)
        setUserHoldingAssets(assets)

        if (assets.length === 0)
            setSelectedUserHoldingAsset(0)
        else
            setSelectedUserHoldingAsset(assets[0].value)
    }

    function generateUnrealizedSellsFromTrades(trades) {
        const unrealizedSells = []

        trades.map(trade => {
            const volume = trade.buyTransaction.volume
            const buyPrice = trade.buyTransaction.itemPrice.price
            const sellPrice = trade.sellOrderPrice
            const name = trade.buyTransaction.itemPrice.item.itemBank.name

            const assetTitle = '[' + volume + '] ' + name + ' | Acheté ' + buyPrice + 'K | Prix de vente ' + sellPrice + 'K';

            const item = trade.buyTransaction.itemPrice.item.id
            const transaction = trade.buyTransaction.id
            const sellOrderPrice = trade.sellOrderPrice

            const asset = {
                'value': trade.id,
                'text': assetTitle,
                'item': item,
                'volume': volume,
                'transaction': transaction,
                'sellOrderPrice': sellOrderPrice
            }
            unrealizedSells.push(asset)
        })

        console.log(unrealizedSells)
        setUserUnrealizedSells(unrealizedSells)

        if (unrealizedSells.length === 0)
            setSelectedUserUnrealizedSell(0)
        else
            setSelectedUserUnrealizedSell(unrealizedSells[0].value)
    }

    function newTradeBuy() {
        if (selectedItemBank === 0)
            return

        // New item
        postItem(selectedItemBank)
            .then(res => res.json())

        // New item price
            .then(data => {
                const now = new Date(Date.now()).toISOString();
                return postItemPrice(data.id, buyPrice, now)
            })
            .then(res => res.json())

        // New transaction
            .then(data => {
                return postTransaction(userId, data.id, selectedVolume)
            })
            .then(res => res.json())

        // New trade
            .then(data => {
                return postTrade(userId, data.id, null)
            })
            .then(res => res.json())
        // Reload User Holding Assets from DB
            .then(() => {
                // addAssetFromTrade(data.id);
                return getHoldingAssets()
            })
            .then(res => res.json())
            .then(data => {
                generateHoldingAssetsFromTrades(data)
            })
    }

    function newTradeSell() {
        // Get item
        console.log(userUnrealizedSells)
        console.log(selectedUserUnrealizedSell)

        if (selectedUserUnrealizedSell === 0)
            return

        const correspondingAsset = userUnrealizedSells.find(asset => asset.value === Number(selectedUserUnrealizedSell))

        // New item price for this item
        const now = new Date(Date.now()).toISOString();
        postItemPrice(correspondingAsset.item, correspondingAsset.sellOrderPrice, now)
            .then(res => res.json())

        // Create sell transaction
            .then(data => {
                return postTransaction(userId, data.id, correspondingAsset.volume)
            })
            .then(res => res.json())
        // Link sell transaction to trade
            .then(data => {
                const user = userId;
                const buyTransaction = correspondingAsset.transaction;
                const sellTransaction = data.id;
                const trade = selectedUserUnrealizedSell;
                const sellOrderPrice = correspondingAsset.sellOrderPrice;

                return updateTrade(user, buyTransaction, sellTransaction, sellOrderPrice, trade)
            })
            .then(res => res.json())
        // Reload User Assets from DB
            .then(() => {
                // addAssetFromTrade(data.id);
                return getUnrealizedTrades()
            })
            .then(res => res.json())
            .then(data => {
                generateUnrealizedSellsFromTrades(data)
            })
    }

    function newSellOrder() {
        if (selectedUserHoldingAsset === 0)
            return

        const correspondingAsset = userHoldingAssets.find(asset => asset.value === Number(selectedUserHoldingAsset))

        // Update Trade sell order price
        const user = userId;
        const trade = selectedUserHoldingAsset;
        const buyTransaction = correspondingAsset.transaction;
        const sellOrderPrice = sellPrice;
        updateTrade(user, buyTransaction, null, sellOrderPrice, trade)
            .then(res => res.json())
        // Reload User Holding Assets from DB
            .then(() => {
                return getHoldingAssets()
            })
            .then(res => res.json())
            .then(data => {
                generateHoldingAssetsFromTrades(data)
            })
        // Reload User Unrealized Trades from DB
            .then(() => {
                return getUnrealizedTrades()
            })
            .then(res => res.json())
            .then(data => {
                generateUnrealizedSellsFromTrades(data)
            })
    }

    function deleteSellOrder() {
        if (selectedUserUnrealizedSell === 0)
            return

        const correspondingAsset = userUnrealizedSells.find(asset => asset.value === Number(selectedUserUnrealizedSell))

        // Update Trade sell order price
        const user = userId;
        const trade = selectedUserUnrealizedSell;
        const buyTransaction = correspondingAsset.transaction;
        const sellOrderPrice = null;
        updateTrade(user, buyTransaction, null, sellOrderPrice, trade)
            .then(res => res.json())
            // Reload User Holding Assets from DB
            .then(() => {
                return getHoldingAssets()
            })
            .then(res => res.json())
            .then(data => {
                generateHoldingAssetsFromTrades(data)
            })
            // Reload User Unrealized Trades from DB
            .then(() => {
                return getUnrealizedTrades()
            })
            .then(res => res.json())
            .then(data => {
                generateUnrealizedSellsFromTrades(data)
            })
    }

    return (
        <div>
            {loading === false && (
                <Fragment>
                    <Card className="m-2">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Banque des HdV</p>
                            <Label className="mb-4">
                                <p>Vous pouvez ici ajouter un Hôtel de Vente à la banque des hôtels de vente</p>
                                <p>Vous pourrez ensuite lier un item (ex: du Fer) à cet HdV (ex: Mineur)</p>
                                <p>Cette banque ne permet pas de différencier les différentes instances d'un HdV (Bonta/Brakmar/Astrub)</p>
                            </Label>

                            <Label>
                                <span>Nom de l'HdV à ajouter</span>
                                <Input className="mt-1" value={newHdvBankName} onChange={e => setNewHdvBankName(e.target.value)}/>
                            </Label>

                            <Button className="mt-2" onClick={addHdv}>Ajouter</Button>
                        </CardBody>
                    </Card>

                    <Card className="m-2">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Banque d'item</p>

                            <Label className="mb-4">
                                <p>Vous pouvez ici ajouter un item à la banque des items</p>
                                <p>[ item ] désigne un 'type' d'item, comme du Fer</p>
                                <p>Chaque item doit être lié à un Hôtel de Vente</p>
                                <p>Si l'HdV correspondant n'est pas dans la liste, l'ajouter dans la banque des HdV</p>
                            </Label>

                            <Label>
                                <span>Nom de l'item à ajouter</span>
                                <Input className="mt-1" value={newItemBankName} onChange={e => setNewItemBankName(e.target.value)}/>
                            </Label>

                            <Label>
                                <span>Hôtel de vente correspondant</span>
                                <SelectWrapper values={hdvBank} selected={selectedHdvBank} callback={setSelectedHdvBank}/>
                            </Label>

                            <Button className="mt-2" onClick={addItem}>Ajouter</Button>
                        </CardBody>
                    </Card>

                    <Card className="m-2">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Nouvel achat</p>

                            <Label className="mb-4">
                                <p>Vous pouvez ici entrer un achat que vous venez d'effectuer en jeu</p>
                                <p>Veuillez spécifier l'item acheté, le volume, ainsi que le prix total</p>
                                <p>Ex: x10 Fer pour 400k -> Fer | x10 | 400</p>
                                <p>En cas d'achat de plusieurs stack, confirmer l'achat stack par stack, le prix total reste le prix d'UN stack</p>
                                <p>Dans Stonkofus, un stack correspond à un stack de 1, de 10 ou de 100 d'un item. Un asset (voir plus bas) correspond/est lié à un stack</p>
                            </Label>

                            <Label>
                                <span>Item</span>
                                <SelectWrapper values={itemBank} selected={selectedItemBank} callback={onHandleSelectedItemBank}/>
                            </Label>

                            <Label>
                                <span>Volume</span>
                                <SelectWrapper values={volumeBank} selected={selectedVolume} callback={setSelectedVolume}/>
                            </Label>

                            <Label>
                                <span>Prix total</span>
                                <Input className="mt-1" type="number" value={buyPrice} onChange={onHandleBuyPriceChange}/>
                            </Label>

                            <Button className="mt-2" onClick={newTradeBuy}>Confirmer l'achat</Button>
                        </CardBody>
                    </Card>

                    <Card className="m-2">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Placer un ordre de vente</p>

                            <Label className="mb-4">
                                <p>Vous pouvez ici entrer un ordre de vente que vous venez d'effectuer en jeu</p>
                                <p>Un ordre de vente est le fait de déposer un objet ou stack d'objets en hdv pour le vendre</p>
                                <p>
                                    Vous devez choisir parmis vos assets, c'est à dire les objets que vous avez precedemment acheté et
                                    entré dans Stonkofus, un stack d'objet correspondant (item et volume) à celui que vous mettez en vente.
                                </p>
                                <p>Vous ne pouvez bien entendu pas passer d'ordre de vente plus d'une fois pour un asset</p>
                                <p>Comme pour l'achat, le prix total de mise en vente correspond au prix d'UN stack</p>
                            </Label>

                            <Label>
                                <span>Asset à vendre</span>
                                <SelectWrapper values={userHoldingAssets} selected={selectedUserHoldingAsset} callback={setSelectedUserHoldingAsset}/>
                            </Label>

                            <Label>
                                <span>Prix total de mise en vente</span>
                                <Input className="mt-1" type="number" value={sellPrice} onChange={onHandleSellPriceChange}/>
                            </Label>

                            <Button className="mt-2" onClick={newSellOrder}>Confirmer la mise en vente</Button>
                        </CardBody>
                    </Card>

                    <Card className="m-2">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Gestion des ventes</p>

                            <Label className="mb-4">
                                <p>Vous pouvez ici gérer vos ordres de vente</p>
                                <p>Sélectionnez un ordre de vente précédemment placé, et confirmez ou annulez la vente</p>
                                <p>Si vous avez VENDU (reçu des K) -> Confirmez</p>
                                <p>Si vous avez RETIRE (pas reçu des K) -> Annulez</p>
                                <p>Suite à une annulation, l'asset sera de nouveau disponible pour placer un ordre de vente (et baisser le prix de 1000 à 999 pti batar)</p>
                            </Label>

                            <Label>
                                <span>Vente à confirmer ou annuler (Unrealized)</span>
                                <SelectWrapper values={userUnrealizedSells} selected={selectedUserUnrealizedSell} callback={setSelectedUserUnrealizedSell}/>
                            </Label>

                            <Button className="mt-2" onClick={newTradeSell}>Confirmer la vente</Button>
                            <Button className="mt-2 ml-2" onClick={deleteSellOrder}>Annuler la vente</Button>
                        </CardBody>
                    </Card>
                </Fragment>
            )}
        </div>
    );
};

export default Companion;
