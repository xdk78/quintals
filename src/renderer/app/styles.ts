import styled, { css } from 'styled-components'

const fonts = {
  robotoRegular: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
  robotoMedium: require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
  robotoLight: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
}

export const style = css`
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${fonts.robotoRegular}) format('truetype');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${fonts.robotoMedium}) format('truetype');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url(${fonts.robotoLight}) format('truetype');
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background: #202020;
    color: #fff;
    overflow: hidden;
    user-select: none;
  }

`
export const AppWrapper = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
