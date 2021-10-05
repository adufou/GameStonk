import React, { useState, useEffect } from 'react';
import {getItemBankReports} from "../../service/itemBankService";

import { ResponsiveLine } from '@nivo/line'

const ItemBankChart = () => {
    const [chartReportsData, setChartReportsData] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:4000/login');
        } else {
            getItemBankReports(1)
                .then(res => res.json())
                .then(data => {
                    const reportsVolOne = [];
                    const reportsVolTen = [];
                    const reportsVolHundred = [];

                    console.log(data)
                    data.map(report => {
                        const date = new Date(report.itemPrice.time)
                        const bundlePrice = report.itemPrice.price;
                        const volume = report.volume;
                        const price = bundlePrice / volume;

                        const r = {
                            'x': date,
                            'y': price
                        };

                        switch (volume) {
                            case 1:
                                reportsVolOne.push(r)
                                break;
                            case 10:
                                reportsVolTen.push(r)
                                break;
                            case 100:
                                reportsVolHundred.push(r)
                                break;
                        }
                    })

                    const reportsData = [
                        {
                            'id': 'x1',
                            'data': reportsVolOne
                        },
                        {
                            'id': 'x10',
                            'data': reportsVolTen
                        },
                        {
                            'id': 'x100',
                            'data': reportsVolHundred
                        }
                    ]

                    console.log(reportsData)
                    setChartReportsData(reportsData)
                });
        }
    }, []);

    return (
        <div style={{height: 20 + 'rem'}}>
            <ResponsiveLine
                data={chartReportsData}

                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%d"
                }}
                xFormat="time:%Y-%m-%d"
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false
                }}
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "count",
                    legendOffset: -40,
                    legendPosition: "middle"
                }}
                axisBottom={{
                    format: "%b %d",
                    //tickValues: "every 2 days",
                    // tickRotation: -90,
                    legend: "time scale",
                    legendOffset: -12
                }}
                colors={{ scheme: "nivo" }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}

export default ItemBankChart;
