import React, {useState, useEffect, Fragment} from 'react';
import {getItemBank} from "../../service/itemBankService";
import ItemBankChart from "../ItemBankChart/ItemBankChart";
import {Card, CardBody} from "@windmill/react-ui";

const ItemBankChartGrid = () => {
    const [itemBankList, setItemBankList] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:4000/login');
        } else {
            const list = []

            getItemBank()
                .then(res => res.json())
                .then(data => {
                    data.map(itemBank => {
                        list.push(itemBank)
                    })

                    console.log({list})
                    setItemBankList(list);
                })
        }
    }, [])

    return (
        <Fragment>
            {/*<p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Stocks</p>*/}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {itemBankList.map(itemBank => (
                    <Card className="m-2">
                        <CardBody>
                            <p className="font-semibold text-gray-600 dark:text-gray-300">{itemBank.name}</p>
                            <ItemBankChart itemBankId={itemBank.id}/>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </Fragment>
    )
}

export default ItemBankChartGrid;
