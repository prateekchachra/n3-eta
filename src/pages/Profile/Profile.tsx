import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import PageTemplate from '../../components/templates/PageTemplate';
import { RootState } from '../../store';
import { avatar } from '../../assets/images';
import {FormattedMessage, useIntl} from 'react-intl'
import Order, { OrderItem, OrderType } from '../../components/organisms/Order/Order';
import './Profile.scss'
import { Col, Row, Table } from 'react-bootstrap';
import Address, {  AddressType } from '../../components/organisms/Address/Address';
import Card, { CardType } from '../../components/organisms/Card/Card';

const CARDS: CardType[] = [
    {
        cardNumber: '5151000051510000',
        name: 'Prateek',
        expiryDate: '02/24',
        cvv: 242,
        default: true,
    },
    {
        cardNumber: '5151000051510000',
        name: 'Binod',
        expiryDate: '08/26',
        cvv: 991
    },
];

const ITEMS_1: OrderItem[] = [
    {
        productName: "Men's shorts",
        productId: 2,
        size: 34,
        color: 'red', 
        quantity: 3,
    },
    {
        productName: "Men's jeans",
        productId: 3,
        size: 32,
        color: 'blue', 
        quantity: 2,
    },
];
const ITEMS_2: OrderItem[] = [
    {
        productName: "Men's shorts",
        productId: 2,
        size: 34,
        color: 'red', 
        quantity: 3,
    },
    {
        productName: "Men's jeans",
        productId: 3,
        size: 32,
        color: 'blue', 
        quantity: 2,
    },
];


const ORDERS: OrderType[] = [
    {
        items: ITEMS_1,
        total: '142'
    },
    {
        items: ITEMS_2,
        total: '272'
    },
];
const ADDRESSES: AddressType[] = [
    {
        name:'Harsh',
        phone:'8587856661',
        pin:'110034',
        addressDetail:'E-109, Renusagar, Anpara',
        locality: 'Anpara',
        city:'Sonebhadra',
        state:'U.P.',
        typeOfAddress: 'Home',
        default: true,
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
];


const Profile = () :JSX.Element => {

    const userState = useSelector<RootState, RootState["userState"]>((state: RootState) => state.userState);

    const {user} = userState;
    const {formatMessage} = useIntl();
    const onSetAddressDefault = (item: AddressType) => {
            console.log(item + 'made default')
        }
    const onSetCardDefault = (item: CardType) => {
            console.log(item + 'made default')
        }
    const renderOrders = () => {
        return(
            <div className="profileFieldWrapper">
                <span className="profileLabel"><FormattedMessage id="my_orders"/></span>
                <Table bordered className="profileOrderTable">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="s_no"/></th>
                            <th><FormattedMessage id="items"/></th>
                            <th><FormattedMessage id="total"/></th>
                        </tr>
                    </thead>
                    <tbody>
                       {ORDERS.map((item, index) => {
                        return (<Order key={index.toString()}
                        orderNumber={index + 1}
                        order={item}/>)
                    })}
                    </tbody>
                </Table>    
            </div>
        )
    }
    const renderAddresses = () => {
        return(
            <div className="profileFieldWrapper">
                <span className="profileLabel"><FormattedMessage id="saved_add"/></span>
                <div className="profileAddRow">
                    {ADDRESSES.map((item, index) => {
                        return (<Address key={index.toString()}
                        showSetDefault={!item.default}
                        onDefaultRadioClick={() => onSetAddressDefault(item)}
                        address={item}/>)
                    })}
                </div>
                
            </div>
        )
    }
    const renderSavedPaymentMethods = () => {
        return(
            <div className="profileFieldWrapper">
                <span className="profileLabel"><FormattedMessage id="pay_methods"/></span>
                <div className="profileAddRow">
                    {CARDS.map((item, index) => {
                        return (<Card key={index.toString()}
                        showSetDefault={!item.default}
                        onDefaultRadioClick={() => onSetCardDefault(item)}
                        card={item}/>)
                    })}
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