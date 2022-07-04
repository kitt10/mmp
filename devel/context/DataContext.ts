import { createContext, useContext } from 'react'

export interface DataContextI {
  dataLoaded: boolean
  loadData: () => void
}

const DataContext = createContext<DataContextI>({} as DataContextI)

export const useDataContext = () => {
  return useContext(DataContext)
}

export default DataContext
