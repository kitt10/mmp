import { useEffect, useState } from 'react'
import { DataContextI, defaultLastMatchInd, defaultPlayer, defaultTeam, DrawI, PlayerI, PlayersI, ScheduleI, TeamI, TeamsI } from '../context/DataContext'
import { get } from '../fcn/http'
import { cfg } from '../config/config'

export const useData = () => {

    const [scheduleLoaded, setScheduleLoaded] = useState(false)
    const [schedule, setSchedule] = useState({} as ScheduleI)
    const [groups, setGroups] = useState([] as string[])
    const [lastMatchInd, setLastMatchInd] = useState(defaultLastMatchInd)
    const [teamsM, setTeamsM] = useState({} as TeamsI)
    const [sortedTeams, setSortedTeams] = useState({})
    const [playersM, setPlayersM] = useState({} as PlayersI)

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
        const teams: TeamsI = Object.fromEntries(groups.filter((g: string) => !g.includes('P')).map((g: string) => [g, {}])) as TeamsI
        const players: PlayersI = {} as PlayersI

        // Init
        for (let [group, sch] of Object.entries(schedule)) {
            if (group.includes('P')) {
                continue
            }

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
                            name: name.split('-')[0],
                            team: teams[group][match.teamHome]}
                    }
                }
                
                for (let name of Object.keys(match.pointsAway)) {
                    if (!Object.keys(players).includes(name)) {
                        players[name] = {...defaultPlayer,
                            name: name.split('-')[0],
                            team: teams[group][match.teamAway]}
                    }
                }

                console.log('Players:', players)
            }
        }

        // Stats
        for (let [group, sch] of Object.entries(schedule)) {
            for (let [nb, match] of Object.entries(sch)) {
                if (match.finished) {
                    if (!group.includes('P')) {
                        teams[group][match.teamHome].goalsPlus += match.scoreHome
                        teams[group][match.teamHome].goalsMinus += match.scoreAway
                        teams[group][match.teamHome].goalsDiff = teams[group][match.teamHome].goalsPlus - teams[group][match.teamHome].goalsMinus
                        teams[group][match.teamHome].matches += 1
                        teams[group][match.teamHome].points += match.scoreHome > match.scoreAway ? 3 : match.scoreHome == match.scoreAway ? 1 : 0

                        teams[group][match.teamAway].goalsPlus += match.scoreAway
                        teams[group][match.teamAway].goalsMinus += match.scoreHome
                        teams[group][match.teamAway].goalsDiff = teams[group][match.teamAway].goalsPlus - teams[group][match.teamAway].goalsMinus
                        teams[group][match.teamAway].matches += 1
                        teams[group][match.teamAway].points += match.scoreAway > match.scoreHome ? 3 : match.scoreAway == match.scoreHome ? 1 : 0

                        if (match.scoreHome > match.scoreAway) {
                            teams[group][match.teamHome].scalps.push(match.teamAway)
                        } else if (match.scoreAway > match.scoreHome) {
                            teams[group][match.teamAway].scalps.push(match.teamHome)
                        }
                    }

                    for (let name of Object.keys(match.pointsHome)) {
                        players[name].goals += match.pointsHome[name].goals
                        players[name].assists += match.pointsHome[name].assists
                    }

                    for (let name of Object.keys(match.pointsAway)) {
                        players[name].goals += match.pointsAway[name].goals
                        players[name].assists += match.pointsAway[name].assists
                    }
                }
            }
        }

        for (let player of Object.values(players)) {
            player.points = player.goals + player.assists
            player.meanPoints = player.points / player.team.matches
        }

        // Play-Off

        setTeamsM(teams)
        setPlayersM(players)
    }

    useEffect(() => {
        if (Object.keys(schedule).length > 0) {
            setGroups(Object.keys(schedule))
            setScheduleLoaded(true)
        } else {
            setScheduleLoaded(false)
        }
    }, [schedule])

    useEffect(() => {
        if (scheduleLoaded && groups.length > 0) {
            computeStats()
        }
    }, [groups, scheduleLoaded])

    useEffect(() => {
        // Sort groups
        let tmp = {} as {[k: string]: any}

        for (let g of groups) {
            if (!g.includes('P')) {
                tmp[g] = Object.values(teamsM[g]).sort((t1: TeamI, t2: TeamI) => {
                    // points
                    if (t1.points > t2.points) {
                        return -1
                    } else if (t1.points == t2.points) {
                        // head to head
                        if (t1.scalps.includes(t2.name)) {
                            return -1
                        } else if (t2.scalps.includes(t1.name)) {
                            return 1
                        } else {
                            // score
                            if (t1.goalsDiff > t2.goalsDiff) {
                                return -1
                            } else if (t1.goalsDiff < t2.goalsDiff) {
                                return 1
                            } else {
                                // goals scored
                                return t1.goalsPlus > t2.goalsPlus ? -1 : 1
                            }
                        }
                    } else {
                        return 1
                    }
                })
            }
        }

        setSortedTeams(tmp)

    }, [teamsM])

    const dataContext: DataContextI = {
        scheduleLoaded,
        schedule,
        groups,
        loadSchedule,
        lastMatchInd,
        teams: teamsM,
        sortedTeams,
        players: playersM
    }

    return dataContext
}

export default useData
