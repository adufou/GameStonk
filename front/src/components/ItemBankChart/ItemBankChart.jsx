import React, { useState, useEffect } from 'react';
import {getItemBankReports} from "../../service/itemBankService";

import { ResponsiveLine } from '@nivo/line'

const ItemBankChart = (props) => {
    const [chartReportsData, setChartReportsData] = useState([])

    useEffect(() => {
        console.log('USE EFFECT ITEMBANKCHART')

        getItemBankReports(props.itemBankId)
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
        }, []);

    return (
        <div style={{height: 20 + 'rem'}}>
            <ResponsiveLine
                data={chartReportsData}

                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%d %H:%M:%S",
                    precision: "minute"
                }}
                xFormat="time:%Y-%m-%d %H:%M:%S"
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false
                }}
                axisTop={null}
                axisRight={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: '',
                    legend: '',
                    legendOffset: 0
                }}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: "",
                    legend: "",
                    legendOffset: 36,
                    legendPosition: "middle"
                }}
                // axisBottom={{
                //     orient: 'bottom',
                //     tickSize: 5,
                //     tickPadding: 5,
                //     tickRotation: 0,
                //     legend: 'transportation',
                //     legendOffset: 36,
                //     legendPosition: 'middle'
                // }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: '',
                    legend: '',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'red_yellow_blue' }}
                curve="linear"
                lineWidth={3}
                pointSize={4}
                pointColor={{ from: 'color', modifiers: [] }}
                pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 140,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 12,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
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
