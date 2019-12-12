import styled from "styled-components";

export const PaidBox = styled.div`
  /* height: 200px; */
  /* width: 75px; */

  margin-bottom: 8px;
  box-shadow: 0 5px 5px #e7e7e7;
  border-radius: 5px;
  margin-bottom: 8px;

  /* width:33%; */

  background-color: #fff;
`;

export const PaidDate = styled.div`
  display: flexbox;
  height: 30px;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #85ddcb;
  font-weight: bold;
  text-align: center;
`;

export const PaidBody = styled.div`
  flex-direction: column;
  padding: 10px;
  text-align: right;
`;

export const PaidValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const PaidFixed = styled.div`
  font-size: 14px;
`;

export const PaidLive = styled.div`
  font-size: 14px;
  color: green;
  font-weight: 500;
`;

export const FullPrice = styled.p`
  margin: 5px;
  font-size: 18px;
  text-decoration: underline;
`;
export const WithoutLivehere = styled.p`
  margin: 0;
  font-size: 14px;
  color: #848d95;
`;
export const LivehereTax = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  color: green;
`;
