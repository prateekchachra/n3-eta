import React, { useState } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';
import { Row,Col } from 'react-bootstrap';
import './Checkout.scss'

import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';
import Button from '../../components/molecules/button/Button';
import Address from '../../components/organisms/Address/Address';
import AddAddressModal from '../../components/organisms/AddAddressModal/AddAddressModal';
import { FormattedMessage, useIntl } from 'react-intl';

const USER_ADDRESSES = [
    {
        name:'Harsh',
        phone:'8587856661',
        pin:'110034',
        addressDetail:'E-109, Renusagar, Anpara',
        locality: 'Anpara',
        city:'Sonebhadra',
        state:'U.P.',
        typeOfAddress: 'Home'
    },
    {
        name:'Prateek',
        phone:'8587856661',
        pin:'110034',
        addressDetail:'E-109, Renusagar, Anpara',
        locality: 'Anpara',
        city:'Sonebhadra',
        state:'U.P.',
        typeOfAddress: 'Home'
    },
]
const Checkout = () :JSX.Element => {

    const history = useHistory();
    const [showAddAddress, setShowAddAddress] = useState(false);

    const onAddAddressClick = () => setShowAddAddress(true);

    const onHideAddressModal = () => setShowAddAddress(false);
    const {formatMessage} = useIntl();
    const renderAddresses = ():JSX.Element => {
        if(!USER_ADDRESSES.length){
            return(<span className=""><FormattedMessage id='no_addresses'/></span>)
        }
        else{
            return (<>
            {USER_ADDRESSES.map((item,index) =>
             (<Address 
            key={item.name} 
            showSelect
            address={item} 
            onRemoveClick={() => console.log('remove')}
            />))}
            </>)
        }
    }
    return (
        <PageTemplate>
            <div className="bodyComponent">
            <AddAddressModal
            show={showAddAddress}
            onHide={onHideAddressModal}
            />
            <Row>
                <Col sm={6} className="addressColumn">
                    {renderAddresses()}
                <Button type="contained" primary label={formatMessage({id: 'add_address'})}
                 onClick={onAddAddressClick} />
                </Col>
                <Col sm={6}>
                   
                    <div className="checkoutRow">
                    <span className="checkoutTitle"><FormattedMessage id='bill_info'/></span>
                    <span className="checkoutDescription"><FormattedMessage id='enter_details'/></span>
                        <PriceSummary 
                        
                        buttonLabel={formatMessage({id: 'buy_now'})} onButtonClick={() => history.push('payment')} />
                    </div>
                </Col>
                </Row>
               
            </div>
        </PageTemplate>);
}
export default Checkout;