import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import Button from "react-bootstrap/Button";



function handleLogin(instance) {
	instance.loginRedirect(loginRequest).catch(e => {
		console.error(e);
	})
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
	const { instance, accounts, inProgress } = useMsal();
	return (
		<Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance)}>Sign in</Button>
	);
}