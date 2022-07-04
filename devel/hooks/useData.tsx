import { useState } from 'react'
import { DataContextI } from '../context/DataContext'

export const useData = () => {

    const [dataLoaded, setDataLoaded] = useState(false)

    const loadData = async () => {

    }

    const dataContext: DataContextI = {
        dataLoaded: dataLoaded,
        loadData: loadData
    }

    return dataContext
}

export default useData
