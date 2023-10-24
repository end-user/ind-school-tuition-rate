import {useMsal} from "@azure/msal-react";


export type UserPrincipal = {
    isStateEmployee: boolean,
    isSchoolHead: boolean,
    username: string,
    roles: string[]
}

const GetUserPrincipal = (): UserPrincipal => {
    const {accounts} = useMsal();
    const user = accounts[0];
    const roles = user.idTokenClaims?.roles || [];

    const _user = {
        username: user.username,
        roles: roles
    }
    return {
        username:"test",
        roles:["none"],
        isSchoolHead:false,
        isStateEmployee:true
    }
    return roles.includes("Admin") ? {
        ..._user,
        isStateEmployee: true,
        isSchoolHead: false
    } : {
        ..._user,
        isStateEmployee: false,
        isSchoolHead: true
    }

}
export default GetUserPrincipal;