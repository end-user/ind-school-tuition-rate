import {useMsal} from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import {loginRequest} from "../authConfig.js";


function handleLogin(instance: any) {
    instance.loginRedirect(loginRequest).catch((e:any) => {
        console.error(e);
    })
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const {instance} = useMsal();
    return (
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance)}>Sign in</Button>
    );
}