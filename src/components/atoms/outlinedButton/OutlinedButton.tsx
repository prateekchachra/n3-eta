import React from 'react';

import './outlinedButton.scss';

type outlinedButtonProps = {
    label: string,
    onClick: any,
}

const OutlinedButton = ({label, onClick = () => {console.log('clicked')}} : outlinedButtonProps) => {

    return (
        <button className="buttonOutlined" onClick={onClick}>{label}</button>
    )

}

export default OutlinedButton;