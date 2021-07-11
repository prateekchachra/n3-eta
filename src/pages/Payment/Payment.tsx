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



const Payment = () :JSX.Element => {

    const history = useHistory();

    const [paymentOption, setPaymentOption] = useState('');
    const [amount, setAmount] = useState('100');
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [refundId, setRefundId] = useState('');

    const {formatMessage} = useIntl();
    const paymentHandler = (e: MouseEvent) => {
        e.preventDefault();
    
        
        const options = {
          key: process.env.REACT_API_RAZORPAY_TEST_KEY_ID,
          //key_secret: process.env.REACT_API_RAZORPAY_TEST_KEY_SECRET,
          amount: parseInt(amount)*100,
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
                <Form className="paymentCardForm">
                  <Form.Group controlId="form.CardNumber">
                    <Form.Control type="number" placeholder={formatMessage({id: 'card_no'})} />
                </Form.Group>
                <Form.Group controlId="form.Name">
                    <Form.Control type="text" placeholder={formatMessage({id: 'name'})} />
                </Form.Group>
                <Row>
                  <Col>
                      <Form.Control type="date" placeholder="MM/YY" />
                    </Col>
                    <Col>
                      <Form.Control type="number" placeholder="CVV" />
                    </Col>
               </Row>
                </Form>
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
                            buttonLabel={formatMessage({id: 'buy_now'})} onButtonClick={() => setShowConfirmModal(true)} />
                        </div>
                    </Col>
                </Row>
            </div>
        </PageTemplate>);
}
export default Payment;