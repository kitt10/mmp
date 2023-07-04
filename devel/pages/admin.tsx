import { css } from '@emotion/react'
import { Fragment } from 'react'
import Page from '../components/core/Page'
import Draw from '../components/Draw'
import SubmitBlock from '../components/SubmitBlock'
import { useDataContext } from '../context/DataContext'
import { useMainContext, StyleI } from '../context/MainContext'

const componentS = (style: StyleI) => css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  overflowY: 'scroll'
})

const Admin = () => {

  const { style, gameLaunched } = useMainContext()
  const { scheduleLoaded } = useDataContext()

  return (
    <Page title='Admin - MMP 2023' description='10. ročník Memoriálu Martina Procházky (2023)'>
      <div css={componentS(style)}>
        {!gameLaunched && <Draw />}
        {gameLaunched && scheduleLoaded && 
          <Fragment>
            <SubmitBlock group={'A'} />
            <SubmitBlock group={'B'} />
            <SubmitBlock group={'C'} />
            <SubmitBlock group={'D'} />
            <SubmitBlock group={'P1'} />
            <SubmitBlock group={'P2'} />
          </Fragment>
        }
      </div>
    </Page>
  )
}

export default Admin
