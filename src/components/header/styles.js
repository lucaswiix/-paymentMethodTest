import styled from 'styled-components';

export const Navbar = styled.div`
    height:45px;
    background-color:#fff;
    padding: 20px 0px 20px 0px;
    text-align:center;
    box-shadow: 0 5px 5px #e7e7e7;
`;

export const Logo = styled.img.attrs(props => ({
    src: props.src
}))`

`