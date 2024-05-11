import React from "react";
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import routers from "./router"
import { store, persist } from "./store"
import "./index.scss"
const container = createRoot(document.getElementById("root") as HTMLElement);

container.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persist} loading={null}>
                <RouterProvider router={routers} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
