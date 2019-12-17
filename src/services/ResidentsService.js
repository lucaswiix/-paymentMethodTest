import transactions from '../transactions';

import { getTransactionsIdByUserId } from './OwnersService';

export const getBalanceByOwnerIdAndResidentId = async (ownerId, residentId) => {
    const slips = await getSlipsByOwnerIdAndResidentId(ownerId, residentId);

    return new Promise(resolve => {

    let summaryHostageOBJ = {
        fullCost: 0,
        liveHere: 0
      };
      slips.forEach(bol => {
        summaryHostageOBJ.fullCost += parseFloat(bol.resident.amount);
        summaryHostageOBJ.liveHere += parseFloat(bol.livehere.amount);
      });
      
      resolve(summaryHostageOBJ);
    });

}

export const getSlipsByOwnerIdAndResidentId = async (ownerId, residentId) => {
    const transactionsId = await getTransactionsIdByUserId(ownerId);
    return new Promise(resolve => {
        const slips = [];

    transactionsId.forEach(uuid => {
        let allTransaction = {};
        transactions.forEach(tran => {
          if (
            tran.transaction_id === uuid &&
            tran.operation_id === 2 &&
            tran.account_uuid === residentId
          ) {
            allTransaction.resident = tran;
          }
        });
  
        if (allTransaction.resident) {
          transactions.forEach(tran => {
            if (
              tran &&
              tran.transaction_id === allTransaction.resident.transaction_id &&
              tran.operation_id === 4
            ) {
              allTransaction.livehere = tran;
            }
          });
        }
  
        // console.log('allTransaction',allTransaction);
        if (!Object.keys(allTransaction).length < 1) {
          slips.push(allTransaction);
        }
      });
    
      resolve(slips);

    });
}

