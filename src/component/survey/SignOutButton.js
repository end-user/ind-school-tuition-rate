import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import axios from 'axios'

function handleLogout(instance) {
	axios.defaults.headers["Authorization"].delete()
	localStorage.removeItem("msalIdToken")

	instance.logoutRedirect().catch(e => {
		console.error(e);
	});
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
	const { instance } = useMsal();

	return (
		<Button variant="small" className="ml-auto" onClick={() => handleLogout(instance)}>Sign out</Button>
	);
}