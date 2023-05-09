import {Tooltip} from "react-tippy";
import React from "react";
import Icon from "@mdi/react";
import {mdiCommentQuestion} from "@mdi/js";

const EnglishLearnerTooltip = () => {
    return (<Tooltip
        // options
        position="right"
        trigger="click"
        html={(
            <div className="col-5 card border-dark">
                <div className={'card-body'}>
                    <p>LEAs should submit HLSs to the VT-AOE using the HLS collection site only for students who have
                        been:</p>
                    <ol>
                        <li>Screened by EL Professionals for English Language Proficiency and identified as ELs;
                            and/or
                        </li>
                        <li>Identified as eligible to be counted under the “Immigrant Children and Youth” definition
                        </li>
                    </ol>
                    <p>It is possible to tick <b>yes</b> here, even if the LEA is unsure who did the initial
                        screening. The
                        name of the screener can be unknown, and the date screened can be the date the student
                        entered the receiving district.</p>
                </div>
            </div>
        )}
    >
        <Icon path={mdiCommentQuestion}
              size={1}
              color="#007bff"/>
    </Tooltip>);
}

export default EnglishLearnerTooltip;