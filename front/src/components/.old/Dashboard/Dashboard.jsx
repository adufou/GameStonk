import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardBody, Input, Label, Button } from '@windmill/react-ui'
import TradesTable from '../Table/TradesTable'
import ItemBankChart from "../ItemBankChart/ItemBankChart";
import ItemBankChartGrid from "../ItemBankChartGrid/ItemBankChartGrid";
import redirect from '../../tools/redirect';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      redirect('login');
    } else {
      // End loading
      setLoading(false);
    }
  }, []);

  return (
      <div>
        {loading === false && (
            <Fragment>
              <Card className="m-2">
                <CardBody>
                  <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Vos trades</p>
                  <TradesTable/>
                </CardBody>
              </Card>

              <ItemBankChartGrid/>
              {/*<Card className="m-2">*/}
              {/*  <CardBody>*/}
              {/*    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Stocks</p>*/}
              {/*    */}
              {/*  </CardBody>*/}
              {/*</Card>*/}
            </Fragment>
        )}
      </div>
  );
};

export default Dashboard;