import styled from "styled-components";

export const SelectorUser = styled.select.attrs(props => ({
  value: props.value,
  defaultValue: props.defaultValue,
  onChange: props.onChange
}))`
  padding-left: 10px;
  width: 100%;
  height: 50px;
  border: none;
  background-color: transparent;
  border: solid 1px #eee;
  margin: 20px;
`;

export const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: -webkit-min-content;
  grid-template-rows: min-content;
  grid-column-gap: 1%;
  width: 100%;

  @media (max-width: 400px) {
    grid-template-columns: 1fr !important;
  }
`;

export const Wrapper = styled.div`
  padding: 20px 20% 0px 20%;
`;

export const CenterContent = styled.div`
  display: flexbox;
  margin-top: 30px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const ContainerBox = styled.div`
  width: 100%;
  padding: 20px 50px 0px 50px;

  @media (max-width: 600px) {
    padding: 0px;
  }
`;

export const SubContainerBox = styled.div`
  padding: 0px 20px 0px 20px;
`;
