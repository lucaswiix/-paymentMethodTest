import React from "react";

import styled from "styled-components";

export const Table = styled.table`
  background: #fff;
  border: solid 1px #ccc;
  padding: 20px;
  font-size: 18px;

  tr {
    height: 40px;
  }
`;

export const Td = styled.td`
  font-weight: bold;

  font-size: 18px;

  color: green;
`;

const SummaryHostage = ({ data }) => {
  return (
    <Table>
      <tbody>
        <tr>
          <td>Proprietário:</td>
          <td>R$ {data.fullCost.toFixed(2).replace(".", ",")}</td>
        </tr>
        <tr>
          <Td>Live Here:</Td>
          <Td>R$ {data.liveHere.toFixed(2).replace(".", ",")}</Td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SummaryHostage;
