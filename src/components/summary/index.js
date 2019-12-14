import React from "react";
import { Table, Td } from "./styles";

const SummaryData = ({ data }) => {
  return (
    <Table>
      <tbody>
        <tr>
          <td>Proprietário:</td>
          <td>R$ {data.total.replace('.', ',')}</td>
        </tr>

        <tr>
          <Td>Live here:</Td>
          <Td>R$ {data.liveHere.replace('.', ',')}</Td>
        </tr>
        <tr>
          <Td>Taxa de boleto:</Td>
          <Td>R$ {data.billTax.replace('.', ',')}</Td>
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
