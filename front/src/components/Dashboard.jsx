import React, { useEffect, useState } from "react";
import Line from "./Line";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <Line></Line>
  );
};

export default Dashboard;
