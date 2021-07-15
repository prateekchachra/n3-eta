import React, { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PageTemplate from '../../components/templates/PageTemplate';
import { RootState } from '../../store';
import { avatar } from '../../assets/images';
import {FormattedMessage, useIntl} from 'react-intl'
import Order, { OrderItem, OrderType } from '../../components/organisms/Order/Order';
import './Profile.scss'
import { Col, Row, Table } from 'react-bootstrap';
import Address, {  AddressType } from '../../components/organisms/Address/Address';
import Card, { CardType } from '../../components/organisms/Card/Card';
import { toast } from 'react-toastify';
import { deleteAddress, deleteCard, setAddressAsDefault, setCardAsDefault } from '../../redux/user/UserActions';


const Profile = () :JSX.Element => {

    const userState = useSelector<RootState, RootState["userState"]>((state: RootState) => state.userState);

    const {user} = userState;
    const {formatMessage} = useIntl();
    
    const {addresses, orders, cards} = user;
    console.log(addresses)
    const dispatch = useDispatch();

    const onSetAddressDefault = (item: AddressType) => {

            dispatch(setAddressAsDefault(item));
            toast(formatMessage({id: 'set_default_add'}),{
                type: 'success'
            })
        }
    const onSetCardDefault = (item: CardType) => {
            dispatch(setCardAsDefault(item));
            toast(formatMessage({id: 'set_default_card'}),{
                type: 'success'
            })
        }
    const onAddressDelete = (item: AddressType) => {
            dispatch(deleteAddress(item));
            toast(formatMessage({id: 'delete_add'}),{
                type: 'success'
            })
        }
    const onCardDelete = (item: CardType) => {
             dispatch(deleteCard(item));
            toast(formatMessage({id: 'delete_card'}),{
                type: 'success'
            })
        }
    const renderOrders = () => {
        return(
            <div className="profileFieldWrapper">
                <span className="profileLabel"><FormattedMessage id="my_orders"/></span>
                {orders && orders.length > 0 ? 
                (<Table bordered className="profileOrderTable">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="s_no"/></th>
                            <th><FormattedMessage id="items"/></th>
                            <th><FormattedMessage id="total"/></th>
                        </tr>
                    </thead>
                    <tbody>
                       {orders.map((item, index) => {
                        return (<Order key={index.toString()}
                        orderNumber={index + 1}
                        order={item}/>)
                    })}
                    </tbody>
                </Table>) : <span><FormattedMessage id="no_orders"/></span>}  
            </div>
        )
    }
    const renderAddresses = () => {
        return(
            <div className="profileFieldWrapper">
                <span className="profileLabel"><FormattedMessage id="saved_add"/></span>
                <div className="profileAddRow">
                    {addresses && addresses.length > 0 ?
                    addresses.map((item, index) => {
                        return (<Address key={index.toString()}
                        showSetDefault={!item.default}
                        onDefaultRadioClick={() => onSetAddressDefault(item)}
                        onDeleteClick={() => onAddressDelete(item)}
                        address={item}/>)
                    }) : <FormattedMessage id="no_addresses"/>}
                </div>
                
            </div>
        )
    }
    const renderSavedPaymentMethods = () => {
        return(
            <div className="profileFieldWrapper">
                <span className="profileLabel"><FormattedMessage id="pay_methods"/></span>
                <div className="profileAddRow">
                    {cards && cards.length > 0 ?
                    cards.map((item, index) => {
                        return (<Card key={index.toString()}
                        showSetDefault={!item.default}
                        onDefaultRadioClick={() => onSetCardDefault(item)}
                        onDeleteClick={() => onCardDelete(item)}
                        card={item}/>)
                    }) : <FormattedMessage id="no_cards"/>}
                </div>
            </div>
        )
    }
    return (
        <PageTemplate>
            <div className="profileContainer">
                <div className="profileImageContainer">
                    <img src={user.profileImage ? user.profileImage : avatar}  className="profileImage"/>
                    <span className="profileText">{user.name}</span>
                </div>
                <Row className="profileDetailsRow">
                    <Col sm={6}>
                        <span className="profileText"><FormattedMessage id="email"/>:- {user.email ? user.email : formatMessage({id: 'not_provided'})}</span>
                    </Col>
                    <Col sm={6}>
                        <span className="profileText"><FormattedMessage id="phone"/>:- {user.phone ? user.phone : formatMessage({id: 'not_provided'})}</span>
                    </Col>
                </Row>
                {renderOrders()}
                {renderAddresses()}
                {renderSavedPaymentMethods()}
            </div>
        </PageTemplate>);
}
export default Profile;