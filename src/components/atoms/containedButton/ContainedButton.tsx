import React, { MouseEventHandler } from 'react';

import './containedButton.scss';



export type ContainedButtonProps = {
    label: string,
    onClick: MouseEventHandler
}


const ContainedButton = ({label, onClick}: ContainedButtonProps) : JSX.Element => {
    return(
        <button className="buttonContained" onClick={onClick}>{label}</button>
    )
}

export default ContainedButton;