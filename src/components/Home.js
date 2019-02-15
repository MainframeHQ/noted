// @flow

import React, { Component } from 'react'
import styled from 'styled-components/native'

import LeftNav from './LeftNav'
import MainArea from './MainArea'

type Props = {
  apiVersion: string,
}

const Root = styled.View`
  width: 100vw;
  height: 100vh;
  flex: 1;
  flex-direction: row;
`

class Home extends Component<Props> {
  render() {
    return (
      <Root>
        <LeftNav />
        <MainArea />
      </Root>
    )
  }
}

export default Home
