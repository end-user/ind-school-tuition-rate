import {Breadcrumb, Dropdown} from 'react-bootstrap'
import {Link, Route, Routes} from "react-router-dom"
// import Survey from "./component/survey/Survey";
import Application from "./application/Application"
import VermontLogo from './shared/VermontLogo'
import Home from './Home'
// MSAL Auth
import {AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import Reapply from "./reapply/Reapply.tsx";
import SetCOLA from "./admin/SetCOLA.tsx";
import ReviewApplications from "./admin/ReviewApplications.tsx";
import AddUser from "./admin/AddUser.tsx";
import {SignInButton} from "./shared/SignInButton.tsx";
import {SignOutButton} from "./shared/SignOutButton.tsx";

const Layout = () => {
    // Authentication credentials on highest level component
    //const isAuthenticated = useIsAuthenticated()
    return (
        <div>
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <VermontLogo/>
                        <div className="offset-3 col align-self-end ">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="menu-dropdown">
                                    Menu
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} style={{textDecoration: "none"}} className="pr-3"
                                                   to={"/"}>Home</Dropdown.Item>
                                    <Dropdown.Item as={Link} style={{textDecoration: "none"}} className="pr-3"
                                                   to={"/apply"}>Apply</Dropdown.Item>

                                    <Dropdown.Divider/>
                                    {/*<ProfileContent/>*/}
                                    <Dropdown.Divider/>
                                    <Dropdown.Item as={Link} style={{textDecoration: "none"}} className="pr-3"
                                                   to={"#"}>
                                        <SignInButton/>
                                        <SignOutButton/>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <UnauthenticatedTemplate>
                            </UnauthenticatedTemplate>
                            <AuthenticatedTemplate>
                            </AuthenticatedTemplate>
                        </div>
                    </Breadcrumb>
                </div>
                <Routes>
                    <Route path="/"  element={<Home/>}/>
                    <Route path="/apply/:appId?" element={<Application/>}/>
                    <Route path="/reapply/:appId?" element={<Reapply/>}/>
                    <Route path="/admin">
                        <Route path="cola" element={<SetCOLA/>}/>
                        <Route path="review" element={<ReviewApplications/>}/>
                        <Route path="addUser" element={<AddUser/>}/>
                    </Route>
                </Routes>
                {/*<UnauthenticatedTemplate>*/}
                {/*    <Routes>*/}
                {/*        <Route path="/" exact element={<Application/>}/>*/}
                {/*        <Route path="/*" exact element={<Page404/>}/>*/}
                {/*    </Routes>*/}
                {/*</UnauthenticatedTemplate>*/}
                {/*<AuthenticatedTemplate>*/}
                {/*    <Routes>*/}
                {/*        <Route path="/" exact element={<Application/>}/>*/}
                {/*        /!*<Route path="/studentSearch"><StudentSearch/></Route>*!/*/}
                {/*        /!*<Route path="/process"><ProcessSurveys/></Route>*!/*/}
                {/*        /!*<Route path="/form/:id"><ProcessCrossReference/></Route>*!/*/}
                {/*        /!*<Route path="/student/:id"><StudentAndEdFusion/></Route>*!/*/}
                {/*        /!*<Route path="/languagetable"><LanguageTable/></Route>*!/*/}
                {/*    </Routes>*/}
                {/*</AuthenticatedTemplate>*/}
            </div>
        </div>
    )
}
export default Layout

