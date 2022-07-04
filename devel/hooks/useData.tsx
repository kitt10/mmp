import { useState } from 'react'
import { DataContextI, DrawI } from '../context/DataContext'
import key from '../public/data/key.json'

export const useData = () => {

    const [dataLoaded, setDataLoaded] = useState(false)
    const [draw, setDraw] = useState({} as DrawI)

    const loadData = async () => {

    }

    const loadDraw = async () => {

    }

    const dataContext: DataContextI = {
        dataLoaded: dataLoaded,
        loadData: loadData,
        key: key,
        draw: draw
    }

    return dataContext
}

export default useData
