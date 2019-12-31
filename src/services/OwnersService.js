import Transactions from "../transactions";
import Users from "../account_list";

export const getAll = () => {
  
  return new Promise(resolve => {
    const ownersTransaction = Transactions.filter(
      transaction =>
        transaction.operation_id === 3 || transaction.operation_id === 4
    );

    const userOwners = Users.filter(user =>
      ownersTransaction.some(owner => owner.account_uuid === user.account_uuid)
    );

    resolve(userOwners);
  });
};

export const getTransactionsIdByUserId = async userId => {
  return new Promise(resolve => {
    const transactionsId = [];

    Transactions.forEach(t => {
      if (
        t.account_uuid === userId &&
        t.operation_id === 3 &&
        !transactionsId.includes(t.transaction_id)
      ) {
        transactionsId.push(t.transaction_id);
      }
    });

    resolve(transactionsId);
  });
};

export const getResidentsByUserId = async userId => {
  return new Promise(async resolve => {
    const transactionsId = await getTransactionsIdByUserId(userId);
    const residents = [];

    transactionsId.forEach(id => {
      const trank = Transactions.filter(tran => {
        if (tran.operation_id === 2 && id === tran.transaction_id) {
          return true;
        } else {
          return false;
        }
      });
      if (trank.length > 0) {
        Users.forEach(user => {
          const hasUser = residents.some(
            re => re.account_uuid === user.account_uuid
          );
          if (user.account_uuid === trank[0].account_uuid && !hasUser) {
            residents.push(user);
          }
        });
      }
    });

    resolve(residents);
  });
};

export const getBalanceByUserId = async userId => {
  return new Promise(async resolve => {
    let dashboard = {
      total: 0,
      billTax: 0,
      quantity: 0,
      liveHere: 0
    };

    const transacionsId = await getTransactionsIdByUserId(userId);

    Transactions.forEach(t => {
      if (t.operation_id === 3 && transacionsId.includes(t.transaction_id)) {
        dashboard.total += parseFloat(t.amount);
        dashboard.quantity += 1;
      }
    });

    Transactions.forEach(t => {
      if (t.operation_id === 4 && transacionsId.includes(t.transaction_id)) {
        // dashboard.total = dashboard.total - parseFloat(t.amount);
        dashboard.liveHere += parseFloat(t.amount);
      }
    });

    Transactions.forEach(t => {
      if (t.operation_id === 6 && transacionsId.includes(t.transaction_id)) {
        // dashboard.total = dashboard.total - parseFloat(t.amount);
        dashboard.billTax += parseFloat(t.amount);
      }
    });

    dashboard.billTax = dashboard.billTax.toFixed(2);
    dashboard.total = dashboard.total.toFixed(2);
    dashboard.liveHere = dashboard.liveHere.toFixed(2);

    resolve(dashboard);
  });
};
