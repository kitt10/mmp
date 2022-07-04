import { useEffect, useState } from 'react'
import { DataContextI, defaultLastMatchInd, DrawI, lastMatchIndI, ScheduleI } from '../context/DataContext'
import { get } from '../fcn/http'
import { cfg } from '../config/config'

export const useData = () => {

    const [scheduleLoaded, setScheduleLoaded] = useState(false)
    const [schedule, setSchedule] = useState({} as ScheduleI)
    const [lastMatchInd, setLastMatchInd] = useState(defaultLastMatchInd)

    const loadSchedule = async () => {
        await get(cfg.serverURL+'/schedule/', true).then(async (data: any) => {
            setSchedule(data.schedule)
        }).catch(() => {
            console.log('Unable to fetch schedule data.')
            setSchedule({} as ScheduleI)
        })
    }

    useEffect(() => {
        if (Object.keys(schedule).includes('A') && Object.keys(schedule).includes('B') && Object.keys(schedule).includes('P')) {
            setScheduleLoaded(true)
        } else {
            setScheduleLoaded(false)
        }
    }, [schedule])

    const dataContext: DataContextI = {
        scheduleLoaded: scheduleLoaded,
        schedule: schedule,
        loadSchedule: loadSchedule,
        lastMatchInd: lastMatchInd
    }

    return dataContext
}

export default useData
