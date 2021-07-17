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
    const dispatch = useDispatch();

    const userState = useSelector<RootState, RootState["userState"]>((state: RootState) => state.userState);
    
    const {user} = userState;
    
    const defaultAddressFromUser = user.addresses && user.addresses.length ? 
    user.addresses.filter(item => item.default)[0] : null;
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(defaultAddressFromUser);
    

    const onAddAddressClick = () => setShowAddAddress(true);
    const onHideAddressModal = () => setShowAddAddress(false);

    const onProceedClick = () => {
        if(selectedAddress === null){
            toast(formatMessage({id: 'select_address'}), {type: 'error'})
        }
        else history.push('/payment')
    }
    const onAddAddressSuccessClick = (address: AddressType) => {
        let indexOfAdd = -1;
        user.addresses.map((item, index) => {
            if(item.name === address.name){
                indexOfAdd = index;
                return;
            }
        });

        if(indexOfAdd === -1){   
            onHideAddressModal();
            dispatch(saveAddressToUser(address));
            setSelectedAddress(address);
            toast(formatMessage({id: 'added_address'}), {
                type: 'success'
            })
        }
        else {
            toast(formatMessage({id: 'exists_address'}), {
                type: 'error'
            })
        }
    }
    const {formatMessage} = useIntl();


    const renderAddresses = ():JSX.Element => {
        if(!user.addresses.length){
            return(<span className="noAddresssesMessage"><FormattedMessage id='no_addresses'/></span>)
        }
        else{
            return (<div className="checkoutAddressWrapper">
            {user.addresses.map((item,index) =>
            {
                const isSelected = item.name === selectedAddress?.name;
                return (<Address 
                    key={item.name} 
                    showSelect
                    radioSelected={isSelected}
                    address={item} 
                    onSelectRadioClick={() => setSelectedAddress(item)}
                    />)
                }
            )
            
            }
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
                        buttonLabel={formatMessage({id: 'proceed_to_payment'})} onButtonClick={onProceedClick} />
                    </div>
                </Col>
                </Row>
               
            </div>
        </PageTemplate>);
}
export default Checkout;