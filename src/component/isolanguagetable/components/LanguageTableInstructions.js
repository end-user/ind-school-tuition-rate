import React from "react";
import { Link } from "react-router-dom";

export default () => {
    return (
        <div>
            <ul id="language-table-instructions" className="collapse alert-info mb-1">
                <li style={{ listStyleType: "none" }} >For reporting reasons, the <Link to={"/"}>Home Language Survey</Link> provides a smaller list of languages form most language-specific questions.
                    To help with reporting accuracy, this table has been provided to provide "suggestions" based on the <bold>Primary Language (other than English).</bold>
                    <br />
                    <bold>For Example,</bold> when a user selects "Maay" as their primary language, "Cushitic Languages" will appear as a "suggested language" for selection in the following questions.
                </li>
            </ul>
        </div >
    )
}