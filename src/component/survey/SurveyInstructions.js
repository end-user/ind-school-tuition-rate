import React from "react";

export default () => {
    return (
        <div className="m-4">
            <h5>
                <b>Home Language Survey for all identified EL and Immigrant students from PreK – 12</b>
            </h5>
            <a href="#instructions" data-toggle="collapse">Instructions</a>
            <ol id="instructions" className="collapse">
                <li>The fields below should be completed for any student that a qualified LEA staff person has
                    identified is an English Learner (EL) and/or an “Eligible Immigrant.” Please do not complete this
                    online form for any student who is determined to be neither an EL nor an “Eligible Immigrant.”
                </li>
                <li>Only qualified LEA staff designated by the LEA to submit Home Language Surveys (HLSs) of identified
                    ELs and “Eligible Immigrants” should access the HLS collection site. Designated staff should ensure
                    that all information submitted is accurate and that all fields are complete. Parents/guardians and
                    students should never access the HLS collection site.
                </li>
                <li>All fields indicated as required must be completed in order to submit a record.
                </li>
                <li>Multiple languages may be entered from the dropdown menus in the Family Information section.
                </li>
                <li>If the parent(s) has indicated on their “paper” HLS survey a language that does not appear in the
                    dropdown menus, please select that specific language from the dropdown menu in the final Family
                    Information question. Then, please reach out to Stephanie Vogel for guidance regarding which broader
                    language group that specific language belongs to, in order to respond to the other questions in the
                    Family Information section.
                </li>
                <li>LEA staff should contact Stephanie Vogel (<a
                    href={'mailto:Stephanie.Vogel@vermont.gov'}>Stephanie.Vogel@vermont.gov</a>) with questions or concerns
                    about the process described above.
                </li>
            </ol>
        </div>
    )
}