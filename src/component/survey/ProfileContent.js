import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import Button from "react-bootstrap/Button";
import axios from 'axios'


export default function ProfileContent() {
	const { instance, accounts, inProgress } = useMsal();
	const [accessToken, setAccessToken] = useState(null);
	const name = accounts[0] && accounts[0].name;

	useEffect(() => {
		RequestAccessToken()
	}, [accessToken])

	function RequestAccessToken() {
		const request = {
			...loginRequest,
			account: accounts[0]
		};

		// Silently acquires an access token which is then attached to a request for Microsoft Graph data
		instance.acquireTokenSilent(request).then((response) => {
			setAccessToken(response.idToken);
			localStorage.setItem("msalIdToken", response.idToken)
			axios.defaults.headers["Authorization"] = `Bearer ${response.idToken}`
		}).catch((e) => {
			instance.acquireTokenPopup(request).then((response) => {
				setAccessToken(response.accessToken);
			});
		});
	}

	return (
		<>
			{accessToken ?
				<p style={{ color: "green" }} className="text-center">Authenticated</p>
				:
				<div className="justify-content-center text-center alert-warning">
					<Button variant="alert-warning" className="justify-content-centertext-center alert-warning" style={{ textDecoration: "none" }} onClick={RequestAccessToken}>Authenticate</Button>
				</div>
			}
		</>
	);
};