import App from "src/components/App/App";
import React from "react";
import ReactDOM from "react-dom";

import './index.css'
import {Windmill} from "@windmill/react-ui";

ReactDOM.render(
    <Windmill usePreferences>
        <App />
    </Windmill>,
    document.getElementById("root")
);
