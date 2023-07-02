import App from "src/components/App/App";
import React from "react";
import ReactDOM from "react-dom";

import './index.css'
import {Windmill} from "@windmill/react-ui";
import StoreProviders from "./stores/StoreProvider";

ReactDOM.render(
    <Windmill usePreferences>
        <StoreProviders>
            <App />
        </StoreProviders>
    </Windmill>,
    document.getElementById("root")
);
