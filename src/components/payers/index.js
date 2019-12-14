import React from "react";

import {
  PaidBox,
  PaidDate,
  PaidBody,
  FullPrice,
  WithoutLivehere,
  LivehereTax
} from "./styles";

import moment from "moment";

const PaymentList = ({ obj }) => {
  return (
    <PaidBox>
      <PaidDate>
        {moment(obj.resident.credit_date)
          .format("MMM YY")
          .toUpperCase()}
      </PaidDate>
      <PaidBody>
        <FullPrice>R$ {parseFloat(obj.resident.amount).toFixed(2).replace('.', ',')}</FullPrice>
        <WithoutLivehere>
          R${" "}
          {(
            parseFloat(obj.resident.amount) - parseFloat(obj.livehere.amount)
          ).toFixed(2).replace('.', ',')}
        </WithoutLivehere>
        <LivehereTax>
          R$ {parseFloat(obj.livehere.amount).toFixed(2).replace('.', ',')}
        </LivehereTax>
      </PaidBody>
    </PaidBox>
  );
};

export default PaymentList;
