import ReactDOM from 'react-dom/client'
import Layout from "./Layout";
import './styles/additionalStyles.css';
import {BrowserRouter} from 'react-router-dom';
import {MsalProvider} from "@azure/msal-react";
import {msalConfig} from "./authConfig";
import {PublicClientApplication} from "@azure/msal-browser";
import axios from 'axios'

const msalInstance = new PublicClientApplication(msalConfig);
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

if (localStorage.getItem("msalIdToken") != null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("msalIdToken")}`
}
console.log('found ',document.getElementById('content'))
ReactDOM.createRoot(document.getElementById('content')!).render(
    <MsalProvider instance={msalInstance}>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </MsalProvider>);

