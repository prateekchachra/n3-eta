import React from 'react'
import './Footer.scss';
import { FormattedMessage } from "react-intl";

const Header = () :JSX.Element => {

    return (
        <footer className="footerContainer">
            <span><FormattedMessage id="policies_description"/></span>
            <span><FormattedMessage id="visit_us"/></span>
        </footer>
    )
}

export default Header;
