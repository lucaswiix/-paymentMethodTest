import React from "react";
import { Table } from "./styles";

const SummaryData = ({ data }) => {
  return (
    <Table>
      <tbody>
        <tr>
          <td>Proprietário:</td>
          <td>R$ {data.total}</td>
        </tr>

        <tr>
          <td>Live here:</td>
          <td>R$ {data.liveHere}</td>
        </tr>
        <tr>
          <td>Taxa de boleto:</td>
          <td>R$ {data.billTax}</td>
        </tr>

        <tr>
          <td>Quantidade de transações:</td>
          <td>{data.quantity}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SummaryData;
