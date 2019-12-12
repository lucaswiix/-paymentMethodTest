import React, {useEffect, useState} from "react";

import { PaidBox, PaidDate, PaidBody, FullPrice, WithoutLivehere, LivehereTax } from "./styles";

import moment from "moment";

const PaymentList = ({ obj }) => {

  useEffect(()=>{
    console.log('objdata', obj);
  }, [])

  return (    
    <PaidBox>
      <PaidDate>
        {moment(obj.resident.credit_date).format('MMM YY').toUpperCase()}
        </PaidDate>
        <PaidBody>
         <FullPrice>R$ {parseFloat(obj.resident.amount).toFixed(2) }</FullPrice>
         <WithoutLivehere>R$ {(parseFloat(obj.resident.amount) - parseFloat(obj.livehere.amount)).toFixed(2)}</WithoutLivehere>
         <LivehereTax>R$ {parseFloat(obj.livehere.amount).toFixed(2)}</LivehereTax>
        </PaidBody>

    </PaidBox>
  );
};

export default PaymentList;
