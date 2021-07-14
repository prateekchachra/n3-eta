import React, { MouseEvent, useState } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';
import { Row,Col, Form } from 'react-bootstrap';
import './Payment.scss'

import ConfirmationModal from '../../components/organisms/modals/ConfirmationModal/ConfirmationModal';
import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';
import OptionWrapper from '../../components/molecules/OptionWrapper/OptionWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/organisms/Card/Card';
import { ChangeEvent } from 'react';
import { saveCardToUser, saveOrderToUser } from '../../redux/user/UserActions';
import { OrderItem } from '../../components/organisms/Order/Order';
import { resetCart } from '../../redux/cart/CartAction';



const Payment = () :JSX.Element => {

    const history = useHistory();

    const userState = useSelector<RootState, RootState["userState"]>((state: RootState) => state.userState);
    const cartState = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState);
    const calculateDiscountedPrice = (price: number, discountPercent: number) => (price - ((price * discountPercent) / 100));
   
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    
    const {user} = userState;
    const {cartItems} = cartState;

    let amount = 0;

    const orderMappedCartItems: OrderItem[] = cartItems.map((item, index) => {
        const {id, name, price, discountPercent, size, color, quantity} = item;
        const discountedPrice =  calculateDiscountedPrice(price, discountPercent);
        amount += discountedPrice * quantity;

        return { 
          productName: name,
          productId: id,
          size,
          color, 
          quantity}
      });

    const [paymentOption, setPaymentOption] = useState<string>('');
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [refundId, setRefundId] = useState<string>('');

    //For the card form

    const [cardNumber, setCardNumber] = useState<string>('')
    const [cardName, setCardName] = useState<string>('')
    const [expiryDate, setExpiryDate] = useState<string>('')
    const [cvv, setCvv] = useState<number>(0);

    
    const onCardNumberChange = (event: ChangeEvent) => {
      const {target} = event;
      setCardNumber((target as HTMLInputElement).value)
  }
    
    const onCardNameChange = (event: ChangeEvent) => {
      const {target} = event;
      setCardName((target as HTMLInputElement).value)
  }
    
    const onExpiryDateChange = (event: ChangeEvent) => {
      const {target} = event;
      setExpiryDate((target as HTMLInputElement).value)
  }
    
    const onCvvChange = (event: ChangeEvent) => {
      const {target} = event;
      setCvv(parseInt((target as HTMLInputElement).value))
  }
    
 

    const paymentHandler = (e: MouseEvent) => {
        e.preventDefault();
    
        
        const options = {
          key: process.env.REACT_API_RAZORPAY_TEST_KEY_ID,
          //key_secret: process.env.REACT_API_RAZORPAY_TEST_KEY_SECRET,
          amount: amount*100,
          name: 'Payments',
          order_id: '1234',
          description: 'Donate yourself some time',
          image: '',
          handler: function(response:any) {
            const paymentId = response.razorpay_payment_id;
            const url = process.env.REACT_API_RAZORPAY_URL+'/api/v1/rzp_capture/'+paymentId+'/'+amount;

            fetch(url, {
              method: 'get',
              headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
              }
            })
            .then(resp =>  resp.json())
            .then(function (data) {
              console.log('Request succeeded with JSON response', data);
              setRefundId(response.razorpay_payment_id);
            })
            .catch(function (error) {
              console.log('Request failed', error);
            });
          },
    
          prefill: {
            name: 'Prateek',
            email: 'prateek@live.com',
          },
          notes: {
            address: 'Goa,India',
          },
          theme: {
            color: '#9D50BB',
          },
        };
        const rzp1 = new (window as any).Razorpay(options);
    
        rzp1.open();
      }

      const onConfirmHide = () => setShowConfirmModal(false);
      const onConfirmClick = () => {

        dispatch(saveCardToUser({
            cardNumber,
            name: cardName,
            expiryDate,
            cvv,
            default: user.cards && user.cards.length > 0 ? false : true ,
        }))
        dispatch(saveOrderToUser({
          items: orderMappedCartItems,
          total: amount.toString()
        }))
        dispatch(resetCart());
        toast('Order confirmed! It will reach you in 2-3 business days',{
          type: 'success'
        });
        history.push('/')
      }
    
      const refundHandler =(e:MouseEvent) => {
        e.preventDefault();
        
        const url = process.env.REACT_API_RAZORPAY_URL+'/api/v1/rzp_refunds/'+refundId
        ;
        
        // Using my server endpoints to initiate the refund
        fetch(url, {
          method: 'get',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(resp =>  resp.json())
        .then(function (data) {
          console.log('Request succeeded with JSON response', data);
          alert("Refund Succeeded", )
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });
    
      }
      const renderOptionColumn = () => {
        switch(paymentOption){
          case 'Cash':
            return (
              <span className='descriptionText'><FormattedMessage id='cod_description' /></span>
            );
            case 'Card': 
              return (
                <>
                {user.cards && user.cards.length > 0 ? (
                  <>
                    {user.cards.map((item, index) => <Card key={index.toString()} card={item}/>)}
                  </>
                ) : null}
                  <Form className="paymentCardForm">
                    <Form.Group controlId="form.CardNumber">
                      <Form.Control type="number" onChange={onCardNumberChange} placeholder={formatMessage({id: 'card_no'})} />
                  </Form.Group>
                  <Form.Group controlId="form.Name">
                      <Form.Control type="text" onChange={onCardNameChange} placeholder={formatMessage({id: 'name'})} />
                  </Form.Group>
                  <Row>
                    <Col>
                        <Form.Control type="date" onChange={onExpiryDateChange} placeholder="DD/MM/YYYY" />
                      </Col>
                      <Col>
                        <Form.Control type="number" onChange={onCvvChange} placeholder="CVV" />
                      </Col>
                </Row>
                </Form>
                </>
              );
              default: return (<span className='descriptionText'><FormattedMessage id='no_method_description' /></span>)
        }
      }
      
    return (
        <PageTemplate>
            <div className="bodyComponent">
              <ConfirmationModal 
                 show={showConfirmModal}
                 onHide={onConfirmHide}
                 descriptionText={formatMessage({id: 'buy_confirmation'})}
                 label={formatMessage({id: 'buy_button_label'})}
                 onPressConfirm={onConfirmClick}
              
              />
                <Row>
                    <Col sm={6}>
                        <OptionWrapper>
                            <Row className="paymentRowOptions">
                                <Col sm={6}>
                                    <OptionWrapper clickable onOptionClick={() => setPaymentOption('Card')}>
                                        <span className="paymentOption"><FormattedMessage id='card' /></span>
                                    </OptionWrapper>
                                    <OptionWrapper clickable onOptionClick={() => setPaymentOption('Cash')}>
                                        <span className="paymentOption"><FormattedMessage id='cod' /></span>
                                    </OptionWrapper>
                                    <OptionWrapper clickable onOptionClick={paymentHandler}>
                                        <span className="paymentOption" ><FormattedMessage id='razorpay' /></span>
                                    </OptionWrapper>
                                </Col>
                                <Col sm={6}>
                                  {renderOptionColumn()}
                                </Col>
                             </Row>
                         </OptionWrapper>
                          
                    </Col>
                    <Col sm={6}>
                        <div className="paymentRowMain">
                            <PriceSummary 
                            buttonLabel={formatMessage({id: 'confirm_payment'})} onButtonClick={() => setShowConfirmModal(true)} />
                        </div>
                    </Col>
                </Row>
            </div>
        </PageTemplate>);
}
export default Payment;