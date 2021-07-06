import React, { MouseEvent, useState } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';
import { Row,Col, Form } from 'react-bootstrap';
import './Payment.scss'


import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';
import OptionWrapper from '../../components/molecules/OptionWrapper/OptionWrapper';



const Payment = () :JSX.Element => {

    const history = useHistory();

    const [paymentOption, setPaymentOption] = useState('');
    const [amount, setAmount] = useState('100');
    const [refundId, setRefundId] = useState('');

    
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
              <span className='descriptionText'>Our delivery Executive will collect the cash at your doorstep.</span>
            );
            case 'Card': 
              return (
                <Form className="paymentCardForm">
                  <Form.Group controlId="form.CardNumber">
                    <Form.Control type="number" placeholder="Card Number" />
                </Form.Group>
                <Form.Group controlId="form.Name">
                    <Form.Control type="text" placeholder="Name" />
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
              default: return (<span className='descriptionText'>Please Select an option to pay</span>)
        }
      }
    return (
        <PageTemplate>
            <div className="bodyComponent">
                <Row>
                    <Col sm={6}>
                        <OptionWrapper>
                            <Row className="paymentRowOptions">
                                <Col sm={6}>
                                    <OptionWrapper clickable onOptionClick={() => setPaymentOption('Card')}>
                                        <span className="paymentOption">Card</span>
                                    </OptionWrapper>
                                    <OptionWrapper clickable onOptionClick={() => setPaymentOption('Cash')}>
                                        <span className="paymentOption">Cash On Delivery</span>
                                    </OptionWrapper>
                                    <OptionWrapper clickable onOptionClick={paymentHandler}>
                                        <span className="paymentOption" >RazorPay</span>
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
                            buttonLabel="Buy Now" onButtonClick={() => console.log('payment modal')} />
                        </div>
                    </Col>
                </Row>
            </div>
        </PageTemplate>);
}
export default Payment;