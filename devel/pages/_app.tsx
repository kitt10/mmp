import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import MainContext from '../context/MainContext'
import DataContext from '../context/DataContext'
import useMain from '../hooks/useMain'
import useData from '../hooks/useData'
import { useEffect } from 'react'

const MainApp = ({ Component, pageProps }: AppProps) => {

  const mainContext = useMain()
  const dataContext = useData()

  useEffect(() => {
    if (!dataContext.dataLoaded) {
      dataContext.loadData()
    }
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
