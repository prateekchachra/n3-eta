import React, { MouseEventHandler }from 'react';

import './outlinedButton.scss';

export type OutlinedButtonProps = {
    label: string,
    onClick: MouseEventHandler,
}

const OutlinedButton = ({label, onClick} : OutlinedButtonProps): JSX.Element => {

    return (
        <button className="buttonOutlined" onClick={onClick}>{label}</button>
    )

}

export default OutlinedButton;