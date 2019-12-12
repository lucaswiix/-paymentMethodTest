import React, { useState, useEffect } from "react";

import { SelectorUser, Container, Wrapper, CenterContent, ContainerBox } from "./styles";

import users from "../../account_list";
import transactions from "../../transactions";

import PaymentList from "../../components/payers";
import SummaryData from "../../components/summary";
import Header from "../../components/header";
import Spinner from "../../components/spinner";

const Home = () => {
  const [payments, setPayments] = useState([]);
  const [owners,setOwners] = useState([]);
  const [residents, setResidets] = useState([]);
  const [bill, setBills] = useState({});

  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedResident, SetSelectedResident] = useState(null);
  useEffect(() => {
    setLoading(true);
    const ownersTransaction = transactions.filter(transaction => transaction.operation_id == 3 || transaction.operation_id == 4);
    
    const userOwners = users.filter(user => ownersTransaction.some(owner => owner.account_uuid == user.account_uuid));
    setOwners(userOwners);
    setTimeout(() => {
      setLoading(false);

    }, 1000);


  }, []);


  const handleChange = event => {
    setLoading(true);
    setPayments([]);
    setResidets([]);
    
    setSelectedUser(event.target.value);

    //Todas transações que ele o selecionado é proprietário
    let transacionsId = [];

    //Todos usuarios que alugaram ap dele
    let $residents = [];

    let dashboard = {
      total:0 ,
      billTax: 0,
      quantity: 0,
      liveHere:0
    }
    
    transactions.forEach(t => {
      if(t.account_uuid == event.target.value && t.operation_id == 3 && !transacionsId.includes(t.transaction_id)){
        transacionsId.push(t.transaction_id);
      }
    });
    
    transactions.forEach(t => {
      if(t.operation_id == 3 && transacionsId.includes(t.transaction_id)){
        dashboard.total += parseFloat(t.amount);       
        dashboard.quantity += 1;
      }
    });

    transactions.forEach(t => {
      if(t.operation_id == 4 && transacionsId.includes(t.transaction_id)){
        dashboard.total = dashboard.total - parseFloat(t.amount);   
        dashboard.liveHere += parseFloat(t.amount);
      }
    })

    transactions.forEach(t => {
      if(t.operation_id == 6 && transacionsId.includes(t.transaction_id)){
        dashboard.total = dashboard.total - parseFloat(t.amount);
        dashboard.billTax += parseFloat(t.amount);
      }
    });

    dashboard.billTax = dashboard.billTax.toFixed(2);
    dashboard.total = dashboard.total.toFixed(2);
    dashboard.liveHere = dashboard.liveHere.toFixed(2);
    setBills(dashboard);

    transacionsId.forEach(id => {
     const trank = transactions.filter(tran => {
        if((tran.operation_id == 2) && id == tran.transaction_id ){
          return true
        }else{
          return false
        }
      });
      if(trank.length > 0){
        users.forEach(user => {
          const hasUser = $residents.some(re => re.account_uuid == user.account_uuid);
          if(user.account_uuid == trank[0].account_uuid && !hasUser){
            $residents.push(user);
          }
        });
      }
    });


    setResidets($residents);
    setTimeout(() => {

      setLoading(false);
    }, 1000)

  };

  const handleResident = (e) => {
    const boletos = [];
    setPayments([]);
    let transactionsOfSelectedUser = [];
    
    transactions.forEach(tran => {
      if(tran.operation_id == 3 && tran.account_uuid == selectedUser && !transactionsOfSelectedUser.includes(tran.transaction_id)){
        transactionsOfSelectedUser.push(tran.transaction_id);
      }
    });

    transactionsOfSelectedUser.forEach(uuid => {
      let juststs = [];
      let allTransaction = {};
      transactions.forEach(tran => {
        if(tran.transaction_id === uuid 
          && tran.operation_id === 2 
          && tran.account_uuid === e.target.value          
          ){
            
            allTransaction.resident = tran;
          }
        });
        
        if(allTransaction.resident){
          transactions.forEach(tran => {
            if(tran && tran.transaction_id === allTransaction.resident.transaction_id
               && tran.operation_id == 4){
              allTransaction.livehere = tran;
            }
          });
        }       

        // console.log('allTransaction',allTransaction);
        if(!Object.keys(allTransaction).length < 1){
          boletos.push(allTransaction);
        }
    });

    console.log('allboletos', boletos);
    setPayments(boletos);
  };

  return (
    <>
    <Header />
    <Wrapper>
      <SelectorUser name="data" onChange={handleChange}>
      <option disabled selected >SELECIONE O PROPRIETÁRIO</option>
        {owners.length > 0 &&
          owners.map((user, i) => (
            <option key={i} value={user.account_uuid}>
              {user.client_name}
            </option>
          ))}
      </SelectorUser>
        
        <hr />
        {!loading ? (
          <>
          {selectedUser && (
            <ContainerBox>
            <SummaryData data={bill} />

            <h2>Locatário(s):</h2>

        <SelectorUser onChange={handleResident}>
      <option disabled selected value="underfined">SELECIONE O LOCATÁRIO</option>

            {residents.length > 0 && residents.map((user, i) => (
              <option key={i} value={user.account_uuid}>{user.client_name}</option>
            ))
              
            }
        </SelectorUser>
        
        
        <Container>
          {payments.length > 0 &&
            payments.map((r, i) => <PaymentList key={i} obj={r} />)}
        </Container>
            </ContainerBox>
          )}

        </>
        
        ) : (
          <CenterContent>
            <Spinner />
          </CenterContent>
        )}
    </Wrapper>
    </>

  );
};

export default Home;
