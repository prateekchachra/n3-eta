import React, { MouseEvent, ReactNode, useState } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';
import { Row,Col } from 'react-bootstrap';
import './Payment.scss'


import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';
import OptionWrapper from '../../components/molecules/OptionWrapper/OptionWrapper';



const Payment = () :JSX.Element => {

    const history = useHistory();
    const [paymentOption, setPaymentOption] = useState('Card');
    const [amount, setAmount] = useState('270');
    const [refundId, setRefundId] = useState('');

    const paymentHandler = (e: MouseEvent) => {
        e.preventDefault();
    
        const options = {
          key_id: process.env.REACT_API_RAZORPAY_TEST_KEY_ID,
          key_secret: process.env.REACT_API_RAZORPAY_TEST_KEY_SECRET,
          amount: parseInt(amount)*100,
          name: 'Payments',
          description: 'Donate yourself some time',
    
          handler(response:any) {
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
    return (
        <PageTemplate>
            <div className="bodyComponent">
                <Row>
                    <Col sm={6}>
                        <OptionWrapper>
                            <Row>
                                <Col sm={6}>
                                    <OptionWrapper clickable onOptionClick={() => setPaymentOption('Card')}>
                                        <span className="paymentOption">Card</span>
                                    </OptionWrapper>
                                    <OptionWrapper clickable onOptionClick={() => setPaymentOption('Cash On Delivery')}>
                                        <span className="paymentOption">Cash On Delivery</span>
                                    </OptionWrapper>
                                    <OptionWrapper clickable onOptionClick={paymentHandler}>
                                        <span className="paymentOption" >RazorPay</span>
                                    </OptionWrapper>
                                </Col>
                                <Col sm={8}>
                                </Col>
                             </Row>
                         </OptionWrapper>
                          
                    </Col>
                    <Col sm={6}>
                        <div className="paymentRow">
                            <PriceSummary 
                            buttonLabel="Buy Now" onButtonClick={() => console.log('payment modal')} />
                        </div>
                    </Col>
                </Row>
            </div>
        </PageTemplate>);
}
export default Payment;