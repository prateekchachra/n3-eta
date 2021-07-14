import React, { useState } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';
import { Row,Col } from 'react-bootstrap';
import './Checkout.scss'

import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';
import Button from '../../components/molecules/button/Button';
import Address, { AddressType } from '../../components/organisms/Address/Address';
import AddAddressModal from '../../components/organisms/modals/AddAddressModal/AddAddressModal';
import { FormattedMessage, useIntl } from 'react-intl';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveAddressToUser } from '../../redux/user/UserActions';

const Checkout = () :JSX.Element => {

    const history = useHistory();
    const [showAddAddress, setShowAddAddress] = useState(false);

    const userState = useSelector<RootState, RootState["userState"]>((state: RootState) => state.userState);

    const dispatch = useDispatch();

    const onAddAddressClick = () => setShowAddAddress(true);

    const onHideAddressModal = () => setShowAddAddress(false);

    const onAddAddressSuccessClick = (address: AddressType) => {
        
        dispatch(saveAddressToUser(address));
        toast('Address successfully added', {
            type: 'success'
        })
    }
    const {formatMessage} = useIntl();

    const {user} = userState;

    const renderAddresses = ():JSX.Element => {
        if(!user.addresses.length){
            return(<span className="noAddresssesMessage"><FormattedMessage id='no_addresses'/></span>)
        }
        else{
            return (<div className="checkoutAddressWrapper">
            {user.addresses.map((item,index) =>
             (<Address 
            key={item.name} 
            showSelect
            address={item} 
            onRemoveClick={() => console.log('remove')}
            />))}
            </div>)
        }
    }
    return (
        <PageTemplate>
            <div className="bodyComponent">
            <AddAddressModal
                show={showAddAddress}
                onHide={onHideAddressModal}
                onAddClick={onAddAddressSuccessClick}
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
                        buttonLabel={formatMessage({id: 'proceed_to_payment'})} onButtonClick={() => history.push('payment')} />
                    </div>
                </Col>
                </Row>
               
            </div>
        </PageTemplate>);
}
export default Checkout;