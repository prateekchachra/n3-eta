import React from 'react'

import './Badge.scss';

type BadgeProps = {
    value: number
}

function Badge( { value }: BadgeProps) :JSX.Element {
    return (
        <>
            <span className="quantityBadge">{ value }</span>
        </>
    )
}

export default Badge;
