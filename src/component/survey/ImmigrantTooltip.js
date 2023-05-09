import {Tooltip} from "react-tippy";
import React from "react";
import Icon from "@mdi/react";
import {mdiCommentQuestion} from "@mdi/js";

const ImmigrantTooltip = () => {
    return (<Tooltip
        // options
        position="right"
        trigger="click"
        html={(
            <div className="col-5 card border-dark">
                <div className={'card-body'}><p>Under ESSA, the term '<em>immigrant children and youth</em>' means
                    individuals who:</p>
                    <ol type={'A'}>
                        <li>are aged 3 through 21;</li>
                        <li>were not born in any State (including Puerto Rico); and</li>
                        <li>have not been attending one or more schools in any one or more States for more than 3 full
                            academic years.
                        </li>
                    </ol>
                </div>
            </div>
        )}
    >
        <Icon path={mdiCommentQuestion}
              size={1}
              color="#007bff"/>
    </Tooltip>);
}

export default ImmigrantTooltip;