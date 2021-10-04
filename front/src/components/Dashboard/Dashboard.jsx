import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardBody, Input, Label, Button } from '@windmill/react-ui'
import TradesTable from '../Table/TradesTable'

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:4000/login');
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
                  <TradesTable/>
                </CardBody>
              </Card>
            </Fragment>
        )}
      </div>
  );
};

export default Dashboard;
