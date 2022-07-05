import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import MainContext from '../context/MainContext'
import DataContext from '../context/DataContext'
import useMain from '../hooks/useMain'
import useData from '../hooks/useData'
import { useEffect } from 'react'
import { get } from '../fcn/http'
import { cfg } from '../config/config'

const checkIsLaunched = async (setGameLaunched: (l: boolean) => void, loadSchedule: () => void) => {
  await get(cfg.serverURL+'/islaunched/', true).then(async (data: any) => {
      setGameLaunched(data.launched)
      loadSchedule()
  }).catch(() => {
      console.log('Unable to fetch isLaunched data.')
      setGameLaunched(false)
  })
}

const MainApp = ({ Component, pageProps }: AppProps) => {

  const mainContext = useMain()
  const dataContext = useData()

  useEffect(() => {
    checkIsLaunched(mainContext.setGameLaunched, dataContext.loadSchedule)
  }, [])

  return (
    <MainContext.Provider value={mainContext}>
      <DataContext.Provider value={dataContext}>
        <Global styles={mainContext.style.globalStyle} />
        <Component {...pageProps} />
      </DataContext.Provider>
    </MainContext.Provider>
  )
}

export default MainApp
