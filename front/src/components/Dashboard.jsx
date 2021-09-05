import React, { useEffect, useState } from "react";
import CandlestickCombo from "./CandlestickCombo";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <CandlestickCombo></CandlestickCombo>
  );
};

export default Dashboard;
