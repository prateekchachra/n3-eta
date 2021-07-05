import React, { MouseEventHandler }from 'react';

import './OutlinedButton.scss';

export type OutlinedButtonProps = {
    label: string,
    onClick: MouseEventHandler,
    primary?: boolean,
    secondary?: boolean
}

const OutlinedButton = ({label, onClick, primary, secondary} : OutlinedButtonProps): JSX.Element => {

    return (
        <button className={`buttonOutlined ${primary ? 'button-primary' : ''} ${secondary ? 'button-secondary' : ''}`} onClick={onClick}>{label}</button>
    )

}

export default OutlinedButton;
