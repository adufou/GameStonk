import React, { useState, useEffect, Fragment } from 'react';
import Select from '../Select/Select'
import {getItemBank, postItemBank} from "../../service/itemBankService";
import {getUser} from "../../service/userService";
import {postItem} from "../../service/itemService";
import {postItemPrice} from "../../service/itemPriceService";
import {postTransaction} from "../../service/transactionService";
import {getUnrealizedTrades, postTrade} from "../../service/tradeService";

const Companion = () => {
    const [loading, setLoading] = useState(true);

    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState(0);
    const [itemBank, setItemBank] = useState([]);
    const [assets, setAssets] = useState([]);

    const [newItemBankName, setNewItemBankName] = useState('');
    const [volume, setVolume] = useState(1);
    const [price, setPrice] = useState(1);
    const [selectedItemBank, setSelectedItemBank] = useState(null);

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
                        setSelectedItemBank(bank[0])
                })

            // On set assets ( = unrealized trades)
            getUnrealizedTrades()
                .then(res => res.json())
                .then(data => data.map(trade => {
                    console.log(trade)
                    const volume = trade.buyTransaction.volume
                    const price = trade.buyTransaction.itemPrice.price
                    const name = trade.buyTransaction.itemPrice.item.itemBank.name
                    console.log({volume, price, name})
                }) )
        }
    }, []);

    function onHandlePriceChange (e) {
        const oldPrice = price;
        const priceStr = e.target.value;
        const regexp = /^[0-9b]+$/

        if (priceStr !== '') {
            if (regexp.test(priceStr)) {
                console.log(priceStr);
                setPrice(Number(priceStr));
            }
            else {
                console.log(oldPrice);
                setPrice(oldPrice);
            }
        }
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
                itemBank.push({
                    "value": data.id,
                    "text": data.name
                })
                setItemBank(itemBank)
                setNewItemBankName('')
                // setSelectedItemBank(data.id)
            })
    }

    function newTradeBuy() {
        // New item
        postItem(selectedItemBank.value)
            .then(res => res.json())

        // New item price
            .then(data => {
                const now = new Date(Date.now()).toISOString();
                return postItemPrice(data.id, price, now)
            })
            .then(res => res.json())

        // New transaction
            .then(data => {
                return postTransaction(userId, data.id, volume)
            })
            .then(res => res.json())

        // New trade
            .then(data => {
                return postTrade(userId, data.id, null)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
                    <Select values={itemBank} selected={selectedItemBank} callback={setSelectedItemBank}/>

                    <p>Volume</p>
                    <Select values={volumeBank} selected={volume} callback={setVolume}/>

                    <p>Prix total</p>
                    <input type="number" value={price} onChange={onHandlePriceChange}/>

                    <button onClick={newTradeBuy}>Confirmer l'achat</button>

                    <h4>Valider vente</h4>

                    <p>Ventes non réalisées</p>
                </Fragment>
            )}
        </div>
    );
};

export default Companion;
