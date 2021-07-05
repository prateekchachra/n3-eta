import React, { MouseEventHandler } from 'react';

import './ContainedButton.scss';



export type ContainedButtonProps = {
    label: string,
    onClick: MouseEventHandler,
    primary?: boolean,
    secondary?: boolean
}

//useMemo to store the classname


const ContainedButton = (props: ContainedButtonProps) : JSX.Element => {
    const {label, onClick, primary, secondary} = props;
    return(
        <button className={`buttonContained ${primary ? 'button-primary' : ''} ${secondary ? 'button-secondary' : ''}`} onClick={onClick}>{label}</button>
    )
}

export default ContainedButton;
