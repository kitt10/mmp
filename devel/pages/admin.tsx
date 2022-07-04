import { css } from '@emotion/react'
import { Fragment } from 'react'
import Page from '../components/core/Page'
import Draw from '../components/Draw'
import { useMainContext, StyleI } from '../context/MainContext'

const componentS = (style: StyleI) => css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px'
})

const Admin = () => {

  const { style, gameLaunched } = useMainContext()

  return (
    <Page title='Admin - MMP 2022' description='9. ročník Memoriálu Martina Procházky (2022)'>
      <div css={componentS(style)}>
        {!gameLaunched && <Draw />}
        {gameLaunched && 
          <Fragment>
            
          </Fragment>
        }
      </div>
    </Page>
  )
}

export default Admin
