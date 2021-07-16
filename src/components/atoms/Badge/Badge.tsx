import React from 'react'

import './Badge.scss';

type BadgeProps = {
    value: number
}

function Badge( { value = 0 }: BadgeProps) :JSX.Element {
    return (
        <>
            <span data-test="badge" id="quantityBadge" className="quantityBadge">{ value }</span>
        </>
    )
}

export default Badge;
