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

const SummaryHostage = ({ data }) => {
  return (
    <Table>
      <tbody>
        <tr>
          <td>Proprietário:</td>
          <td>R$ {data.fullCost.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Live Here:</td>
          <td>R$ {data.liveHere.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SummaryHostage;
