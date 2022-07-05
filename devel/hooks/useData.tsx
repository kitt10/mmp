import { useEffect, useState } from 'react'
import { DataContextI, defaultLastMatchInd, defaultPlayer, defaultTeam, DrawI, PlayerI, PlayersI, ScheduleI, TeamI, TeamsI } from '../context/DataContext'
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

    const computeStats = () => {
        console.log('Computing stats...')
        const teams: TeamsI = {'A': {}, 'B': {}, 'P': {}} as TeamsI
        const players: PlayersI = {} as PlayersI

        // Init
        for (let [group, sch] of Object.entries(schedule)) {
            for (let [nb, match] of Object.entries(sch)) {
                if (!Object.keys(teams[group]).includes(match.teamHome)) {
                    teams[group][match.teamHome] = {...defaultTeam,
                        name: match.teamHome}
                }

                if (!Object.keys(teams[group]).includes(match.teamAway)) {
                    teams[group][match.teamAway] = {...defaultTeam,
                        name: match.teamAway}
                }

                for (let name of Object.keys(match.pointsHome)) {
                    if (!Object.keys(players).includes(name)) {
                        players[name] = {...defaultPlayer,
                            name: name,
                            team: teams[group][match.teamHome]}
                    }
                }
                
                for (let name of Object.keys(match.pointsAway)) {
                    if (!Object.keys(players).includes(name)) {
                        players[name] = {...defaultPlayer,
                            name: name,
                            team: teams[group][match.teamAway]}
                    }
                }
            }
        }

        console.log('teams:', teams)
        console.log('players:', players)

        // Stats
        for (let [group, sch] of Object.entries(schedule)) {
            for (let [nb, match] of Object.entries(sch)) {

            }
        }

    }

    useEffect(() => {
        if (Object.keys(schedule).includes('A') && Object.keys(schedule).includes('B') && Object.keys(schedule).includes('P')) {
            setScheduleLoaded(true)
            computeStats()
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
