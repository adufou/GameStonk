import App from "src/components/App/App";
import React from "react";
import ReactDOM from "react-dom";

import './index.css'
import {Windmill} from "@windmill/react-ui";
import GlobalStoreProvider from "./stores/GlobalStoreProvider";

ReactDOM.render(
    <Windmill usePreferences>
        <GlobalStoreProvider>
            <App />
        </GlobalStoreProvider>
    </Windmill>,
    document.getElementById("root")
);
