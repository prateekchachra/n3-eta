import React from 'react';

import './containedButton.scss';



type containedButtonProps = {
    label: string,
    onClick: any
}


const ContainedButton = ({label, onClick = () => {console.log('clicked')}}: containedButtonProps) => {
    return(
        <button className="buttonContained" onClick={onClick}>{label}</button>
    )
}

export default ContainedButton;