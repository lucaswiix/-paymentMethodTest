import styled from "styled-components";

export const SelectorUser = styled.select.attrs(props => ({
  onChange: props.onChange
}))`
  width: 100%;
  height: 50px;
  border: none;
  background-color: transparent;
  border: solid 1px #eee;
  margin: 20px;
`;
