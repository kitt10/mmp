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
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px',
  overflowY: 'scroll'
})

const Admin = () => {

  const { style, gameLaunched } = useMainContext()
  const { scheduleLoaded } = useDataContext()

  return (
    <Page title='Admin - MMP 2022' description='9. ročník Memoriálu Martina Procházky (2022)'>
      <div css={componentS(style)}>
        {!gameLaunched && <Draw />}
        {gameLaunched && scheduleLoaded && 
          <Fragment>
            <SubmitBlock section={'A'} />
            <SubmitBlock section={'B'} />
            <SubmitBlock section={'Play-Off'} />
          </Fragment>
        }
      </div>
    </Page>
  )
}

export default Admin
