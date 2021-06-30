import React from 'react';
import TestUtils from 'react-dom/test-utils';

const Badge = require("./Badge").default;

test('Badge displays given number value', () => {
    const badgeSpanRef: React.RefObject<HTMLSpanElement> = React.createRef();

    //Render a Badge with number value
    TestUtils.renderIntoDocument(
        <Badge value="10" />
    );

    const spanNode = badgeSpanRef.current;
    
    //Test expected text content within <span> tag
    expect(spanNode?.textContent).toEqual(10);
})
