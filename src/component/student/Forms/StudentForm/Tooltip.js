/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody, Alert } from 'reactstrap';


const Tooltip = ({ targetId, title, message }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <div>
            <div id={targetId} className="mr-2 btn btn-primary" size="sm" >?</div>

            <Popover className="alert-info" hover="true" placement="top" isOpen={popoverOpen} target={targetId} toggle={toggle}>
                <PopoverBody><Alert color="info">{message}</Alert></PopoverBody>
            </Popover>
        </div>
    );
}

export default Tooltip;