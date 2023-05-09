import React from "react";
import { Link } from "react-router-dom";

export default () => {
    return (
        <div>
            <ul id="student-search-instructions" className="collapse alert-info mb-1">
                <li style={{ listStyleType: "none" }} >
                    Fill out at least one of the following fields with information relating to the student(s) you are looking for, and click "Search"
                </li>
            </ul>
        </div >
    )
}