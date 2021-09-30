import React, { useState, useEffect, Fragment } from 'react';
import Select from '../Select/Select'
import {getItemBank, postItemBank} from "../../service/itemBankService";
import {getUser} from "../../service/userService";
import {postItem} from "../../service/itemService";
import {postItemPrice} from "../../service/itemPriceService";
import {postTransaction} from "../../service/transactionService";
import {getUnrealizedTrades, updateTrade, postTrade} from "../../service/tradeService";

const Companion = () => {
    const [loading, setLoading] = useState(true);

    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState(0);
    const [itemBank, setItemBank] = useState([]);
    const [userAssets, setUserAssets] = useState([]);

    const [newItemBankName, setNewItemBankName] = useState('');
    const [selectedVolume, setSelectedVolume] = useState(1);
    const [buyPrice, setBuyPrice] = useState(1);
    const [sellPrice, setSellPrice] = useState(1);
    const [selectedItemBank, setSelectedItemBank] = useState(0);
    const [selectedUserAsset, setSelectedUserAsset] = useState(0)

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
                    setUserEmail(data.email);
                    setUserId(data.pk)
                    setLoading(false);
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

            // On set assets ( = unrealized trades)
            getUnrealizedTrades()
                .then(res => res.json())
                .then(data => {
                    generateAssetsFromTrades(data)
                })
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

    function generateAssetsFromTrades(trades) {
        const assets = []

        trades.map(trade => {
            const volume = trade.buyTransaction.volume
            const price = trade.buyTransaction.itemPrice.price
            const name = trade.buyTransaction.itemPrice.item.itemBank.name

            const assetTitle = '[' + volume + '] ' + name + ' | ' + price + 'k';

            const item = trade.buyTransaction.itemPrice.item.id
            const transaction = trade.buyTransaction.id

            const asset = {
                'value': trade.id,
                'text': assetTitle,
                'item': item,
                'volume': volume,
                'transaction': transaction
            }
            assets.push(asset)
        })

        console.log(assets)
        setUserAssets(assets)
        setSelectedUserAsset(assets[0].value)
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
        // Reload User Assets from DB
            .then(() => {
                // addAssetFromTrade(data.id);
                return getUnrealizedTrades()
            })
            .then(res => res.json())
            .then(data => {
                generateAssetsFromTrades(data)
            })
    }

    function newTradeSell() {
        // Get item
        console.log(userAssets)
        console.log(selectedUserAsset)

        const correspondingAsset = userAssets.find(asset => asset.value === Number(selectedUserAsset))

        // New item price for this item
        const now = new Date(Date.now()).toISOString();
        postItemPrice(correspondingAsset.item, sellPrice, now)
            .then(res => res.json())

        // Create sell transaction
            .then(data => {
                return postTransaction(userId, data.id, correspondingAsset.volume)
            })
            .then(res => res.json())
        // Link sell transaction to trade
            .then(data => {
                const user = data.user;
                const buyTransaction = correspondingAsset.transaction;
                const sellTransaction = data.id;
                const trade = selectedUserAsset;

                return updateTrade(user, buyTransaction, sellTransaction, trade)
            })
            .then(res => res.json())
        // Reload User Assets from DB
            .then(() => {
                // addAssetFromTrade(data.id);
                return getUnrealizedTrades()
            })
            .then(res => res.json())
            .then(data => {
                generateAssetsFromTrades(data)
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

                    <h4>Valider vente</h4>

                    <p>Vente à conclure</p>
                    <Select values={userAssets} selected={selectedUserAsset} callback={setSelectedUserAsset}/>

                    <p>Prix total</p>
                    <input type="number" value={sellPrice} onChange={onHandleSellPriceChange}/>

                    <button onClick={newTradeSell}>Confirmer la vente</button>
                </Fragment>
            )}
        </div>
    );
};

export default Companion;
