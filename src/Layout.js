import React from "react";
import {Breadcrumb, Card, Dropdown} from 'react-bootstrap'
import {Link, Route, Routes} from "react-router-dom"
// import Survey from "./component/survey/Survey";
import Application from "./application/Application";
import VermontLogo from './shared/VermontLogo'
import Page404 from './Page404'
// MSAL Auth
import {SignInButton} from "./component/survey/SignInButton";
import {AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated} from "@azure/msal-react";
import {SignOutButton} from "./component/survey/SignOutButton";
import ProfileContent from "./component/survey/ProfileContent";

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
                                                   to={"/process"}>Review Surveys</Dropdown.Item>
                                    <Dropdown.Item as={Link} style={{textDecoration: "none"}} className="pr-3"
                                                   to={"/studentsearch"}>Student Search</Dropdown.Item>
                                    <Dropdown.Item as={Link} style={{textDecoration: "none"}} className="pr-3"
                                                   to={"/languagetable"}>ISO Languages</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <ProfileContent/>
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

                    <Route path="/" exact element={<Application/>}/>
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

