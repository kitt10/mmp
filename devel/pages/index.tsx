import { Fragment } from 'react'
import { css } from '@emotion/react'
import Page from '../components/core/Page'
import { StyleI, useMainContext } from '../context/MainContext'
import Overview from '../components/Overview'
import { useDataContext } from '../context/DataContext'

const notLaunchedMessageS = (style: StyleI) => css({
  width: '100%',
  marginTop: '100px',
  fontSize: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

const logoS = (style: StyleI) => css({
  width: '500px',
  height: 'auto',
  marginTop: '50px'
})

const Home = () => {

  const { style, gameLaunched } = useMainContext()
  const { schedule } = useDataContext()

  const scheduleLoaded = Object.keys(schedule).includes('A') && Object.keys(schedule).includes('B') && Object.keys(schedule).includes('P')

  return (
    <Page title='MMP 2022' description='9. ročník Memoriálu Martina Procházky (2022)'>
      {gameLaunched && scheduleLoaded &&
        <Overview />
      }
      {!gameLaunched && scheduleLoaded &&
        <div css={notLaunchedMessageS(style)}>
          {'Turnaj ještě nebyl zahájen. \xa0\xa0\xa0 Čekáme na losování. \xa0\xa0\xa0 Máš formu?'}
          <img css={logoS(style)} src='img/logo.png' />
        </div>
      }
    </Page>
  )
}

export default Home
