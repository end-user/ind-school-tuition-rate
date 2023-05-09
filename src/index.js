import React from 'react';
import Layout from "./Layout";
import './styles/additionalStyles.css';
import {BrowserRouter} from 'react-router-dom';
import {MsalProvider} from "@azure/msal-react";
import {msalConfig} from "./authConfig";
import {PublicClientApplication} from "@azure/msal-browser";
import axios from 'axios'
import {createRoot} from "react-dom/client";

const container = document.getElementById('content');
const root = createRoot(container);
const msalInstance = new PublicClientApplication(msalConfig);
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

if (localStorage.getItem("msalIdToken") != null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("msalIdToken")}`
}

root.render(
    <MsalProvider instance={msalInstance}>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </MsalProvider>);

