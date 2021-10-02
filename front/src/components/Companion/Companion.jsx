import React, { useState, useEffect, Fragment } from 'react';
import Select from '../Select/Select'
import {getItemBank, postItemBank} from "../../service/itemBankService";
import {getUser} from "../../service/userService";
import {postItem} from "../../service/itemService";
import {postItemPrice} from "../../service/itemPriceService";
import {postTransaction} from "../../service/transactionService";
import {getUnrealizedTrades, updateTrade, postTrade, getHoldingAssets} from "../../service/tradeService";

const Companion = () => {
    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState(0);
    const [itemBank, setItemBank] = useState([]);
    const [userHoldingAssets, setUserHoldingAssets] = useState([]);
    const [userUnrealizedSells, setUserUnrealizedSells] = useState([]);

    const [newItemBankName, setNewItemBankName] = useState('');
    const [selectedVolume, setSelectedVolume] = useState(1);
    const [buyPrice, setBuyPrice] = useState(1);
    const [sellPrice, setSellPrice] = useState(1);
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
            window.location.replace('http://localhost:4000/login');
        } else {
            // On set userId et userEmail
            getUser()
                .then(res => res.json())
                .then(data => {
                    setUserId(data.pk)
                });

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

    function addItem() {
        if (newItemBankName === '')
            return

        const body = JSON.stringify({
            "name": newItemBankName
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

            const assetTitle = '[' + volume + '] ' + name + ' | Acheté ' + price + 'k';

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

            const assetTitle = '[' + volume + '] ' + name + ' | Acheté ' + buyPrice + 'k | Prix de vente ' + sellPrice;

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

    // function addAssetFromTrade(id) {
    //     const itemName = itemBank.find(item => item.value === selectedItemBank).text
    //
    //     const assetTitle = '[' + selectedVolume + '] ' + itemName + ' | ' + buyPrice + 'k';
    //
    //     const asset = {
    //         'value': id,
    //         'text': assetTitle
    //     }
    //     setUserAssets([...userAssets, asset])
    //     setSelectedUserAsset(Number(id))
    // }

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
                    <h1>Companion</h1>

                    <h3>Banque d'item</h3>

                    <p>Ajouter un item à la banque des items</p>
                    <input value={newItemBankName} onChange={e => setNewItemBankName(e.target.value)}/>
                    <button onClick={addItem}>Ajouter</button>

                    <h3>Trade</h3>
                    <h4>Nouvel achat</h4>

                    <p>Item</p>
                    <Select values={itemBank} selected={selectedItemBank} callback={onHandleSelectedItemBank}/>

                    <p>Volume</p>
                    <Select values={volumeBank} selected={selectedVolume} callback={setSelectedVolume}/>

                    <p>Prix total</p>
                    <input type="number" value={buyPrice} onChange={onHandleBuyPriceChange}/>

                    <button onClick={newTradeBuy}>Confirmer l'achat</button>

                    <h4>Mettre en vente</h4>

                    <p>Asset à vendre (Holdings)</p>
                    <Select values={userHoldingAssets} selected={selectedUserHoldingAsset} callback={setSelectedUserHoldingAsset}/>

                    <p>Prix total de mise en vente</p>
                    <input type="number" value={sellPrice} onChange={onHandleSellPriceChange}/>

                    <button onClick={newSellOrder}>Confirmer la mise en vente</button>

                    <h4>Gestion des ventes</h4>

                    <p>Vente à confirmer ou annuler (Unrealized)</p>
                    <Select values={userUnrealizedSells} selected={selectedUserUnrealizedSell} callback={setSelectedUserUnrealizedSell}/>

                    <button onClick={newTradeSell}>Confirmer la vente</button>
                    <button onClick={deleteSellOrder}>Annuler la vente</button>
                </Fragment>
            )}
        </div>
    );
};

export default Companion;
