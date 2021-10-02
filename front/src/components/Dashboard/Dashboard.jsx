import React, { useState, useEffect, Fragment } from 'react';

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
              {/*<h1>Dashboard</h1>*/}
              {/*<h2>Hello</h2>*/}
              <p className='text-red-500'>Edit <code>src/App.js</code> and save to reload.</p>
            </Fragment>
        )}
      </div>
  );
};

export default Dashboard;
