import React, { useState, useEffect } from "react";

import {
  SelectorUser,
  SubContainerBox,
  Container,
  Wrapper,
  CenterContent,
  ContainerBox
} from "./styles";

import PaymentList from "../../components/payers";
import SummaryData from "../../components/summary";
import Header from "../../components/header";
import Spinner from "../../components/spinner";
import SummaryHostage from "../../components/summaryHostage";

import services from "../../services";

const Home = () => {
  
  const [payments, setPayments] = useState([]);
  const [owners, setOwners] = useState([]);
  const [residents, setResidets] = useState([]);
  const [bill, setBills] = useState({});

  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [summaryHostage, setSummaryHostage] = useState(null);

  const getOwners = async () => setOwners(await services.owners.getAll());

  useEffect(() => {
    setLoading(true);
    getOwners();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const reset = async () => {
    setPayments([]);
      
    setSummaryHostage(null);
  };

  const handleOwner = async event => {
    const userId = event.target.value;
    setLoading(true);
    reset();

    setSelectedUser(userId);

    setResidets(await services.owners.getResidentsByUserId(userId));
    setBills(await services.owners.getBalanceByUserId(userId));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleResident = async e => {
    const ownerHostage = selectedUser;
    const residentHostage = e.target.value;
    reset();
    setPayments(
      await services.residents.getSlipsByOwnerIdAndResidentId(
        ownerHostage,
        residentHostage
      )
    );

    setSummaryHostage(
      await services.residents.getBalanceByOwnerIdAndResidentId(
        ownerHostage,
        residentHostage
      )
    );
  };

  return (
    <>
      <Header />
      <Wrapper>
        <SelectorUser
          defaultValue={"DEFAULT"}
          name="data"
          onChange={handleOwner}
        >
          <option disabled value="DEFAULT">
            SELECIONE O PROPRIETÁRIO
          </option>
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

                <SelectorUser
                  defaultValue={"DEFAULT"}
                  onChange={handleResident}
                >
                  <option disabled value="DEFAULT">
                    SELECIONE O LOCATÁRIO
                  </option>

                  {residents.length > 0 &&
                    residents.map((user, i) => (
                      <option key={i} value={user.account_uuid}>
                        {user.client_name}
                      </option>
                    ))}
                </SelectorUser>
                <SubContainerBox>
                  {summaryHostage && <SummaryHostage data={summaryHostage} />}
                  <Container>
                    {payments.length > 0 &&
                      payments.map((r, i) => <PaymentList key={i} obj={r} />)}
                  </Container>
                </SubContainerBox>
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
