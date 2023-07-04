import { useEffect, useState } from 'react'
import { DataContextI, defaultLastMatchInd, defaultPlayer, defaultTeam, DrawI, PlayerI, PlayersI, ScheduleI, ScheduleItemI, TeamI, TeamsI } from '../context/DataContext'
import { get } from '../fcn/http'
import { cfg } from '../config/config'
import { MainContextI } from '../context/MainContext'

export const useData = (mainContext: MainContextI) => {

    const [scheduleLoaded, setScheduleLoaded] = useState(false)
    const [schedule, setSchedule] = useState({} as ScheduleI)
    const [groups, setGroups] = useState([] as string[])
    const [lastMatchInd, setLastMatchInd] = useState(defaultLastMatchInd)
    const [teamsM, setTeamsM] = useState({} as TeamsI)
    const [sortedTeams, setSortedTeams] = useState({} as {[g: string]: TeamI[]})
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
        const teams: TeamsI = Object.fromEntries(groups.map((g: string) => [g, {}])) as TeamsI
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
                        try {
                            players[name] = {...defaultPlayer,
                                name: name.split('-')[0],
                                team: teams[group][match.teamHome]}
                        } catch (e) {
                            players[name] = {...defaultPlayer,
                                name: name.split('-')[0],
                                team: {...defaultTeam,
                                    name: match.teamHome}}
                        }
                    }
                }
                
                for (let name of Object.keys(match.pointsAway)) {
                    if (!Object.keys(players).includes(name)) {
                        try {
                            players[name] = {...defaultPlayer,
                                name: name.split('-')[0],
                                team: teams[group][match.teamAway]}
                        } catch (e) {
                            players[name] = {...defaultPlayer,
                                name: name.split('-')[0],
                                team: {...defaultTeam,
                                    name: match.teamAway}}
                        }
                    }
                }

                console.log('Players:', players)
            }
        }

        // Stats
        for (let [group, sch] of Object.entries(schedule)) {
            for (let [nb, match] of Object.entries(sch)) {
                if (match.finished) {
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

                    for (let name of Object.keys(match.pointsHome)) {
                        players[name].goals += match.pointsHome[name].goals
                        players[name].assists += match.pointsHome[name].assists
                    }

                    for (let name of Object.keys(match.pointsAway)) {
                        players[name].goals += match.pointsAway[name].goals
                        players[name].assists += match.pointsAway[name].assists
                    }

                    for (let [playerID, player] of Object.entries(players)) {
                        if (playerID.includes('-'+match.teamHome) || playerID.includes('-'+match.teamAway)) {
                            player.matches += 1
                        }
                    }
                }
            }
        }

        for (let player of Object.values(players)) {
            player.points = player.goals + player.assists
            player.meanPoints = player.points / player.matches
        }

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

    const groupFinished = (g: string) => {
        for (let m of Object.values(schedule[g])) {
            if (!m.finished) {
                return false
            }
        }
        return true
    }

    useEffect(() => {
        // Play-Off

        if (Object.keys(sortedTeams).length > 0) {
            // Round of 16
            for (let g of groups.filter((gg: string) => !gg.includes('P'))) {
                if (g in sortedTeams && groupFinished(g)) {
                    for (let pg of ['P1', 'P2']) {
                        for (let m of Object.values(schedule[pg]).filter((m: ScheduleItemI) => m.id.includes('Osm'))) {
                            let matchToBeSent = {...m}
                            let doSend = false
                            
                            if (m.teamHome.includes(g)) {
                                try {
                                    matchToBeSent['teamHome'] = sortedTeams[g][+m.teamHome.substring(1,2)-1].name
                                } catch (e) {
                                    matchToBeSent['teamHome'] = '<free-to-go>'
                                }
                                doSend = true
                            }
    
                            if (m.teamAway.includes(g)) {
                                try {
                                    matchToBeSent['teamAway'] = sortedTeams[g][+m.teamAway.substring(1,2)-1].name
                                } catch (e) {
                                    matchToBeSent['teamAway'] = '<free-to-go>'
                                }
                                doSend = true
                            }
    
                            mainContext.updateSchedule(
                                pg,
                                matchToBeSent.nb,
                                matchToBeSent
                            )
                        }
                    }
                }
            }
        }

        // Round of 8

        if (scheduleLoaded) {
            // Osm.1 finished
            if (schedule['P1']['1'].finished && schedule['P1']['5'].teamHome == '?') {
                let teamWin = schedule['P1']['1'].scoreHome > schedule['P1']['1'].scoreAway ? schedule['P1']['1'].teamHome : schedule['P1']['1'].teamAway
                mainContext.updateSchedule(
                    'P1',
                    5,
                    {...schedule['P1']['5'], teamHome: teamWin}
                )
            }

            // Osm.2 finished
            if (schedule['P1']['2'].finished && schedule['P1']['6'].teamHome == '?') {
                let teamWin = schedule['P1']['2'].scoreHome > schedule['P1']['2'].scoreAway ? schedule['P1']['2'].teamHome : schedule['P1']['2'].teamAway
                mainContext.updateSchedule(
                    'P1',
                    6,
                    {...schedule['P1']['6'], teamHome: teamWin}
                )
            }

            // Osm.3 finished
            if (schedule['P2']['1'].finished && schedule['P1']['5'].teamHome == '?') {
                let teamWin = schedule['P2']['1'].scoreHome > schedule['P2']['1'].scoreAway ? schedule['P2']['1'].teamHome : schedule['P2']['1'].teamAway
                mainContext.updateSchedule(
                    'P2',
                    5,
                    {...schedule['P2']['5'], teamHome: teamWin}
                )
            }

            // Osm.4 finished
            if (schedule['P2']['2'].finished && schedule['P2']['6'].teamHome == '?') {
                let teamWin = schedule['P2']['2'].scoreHome > schedule['P2']['2'].scoreAway ? schedule['P2']['2'].teamHome : schedule['P2']['2'].teamAway
                mainContext.updateSchedule(
                    'P2',
                    6,
                    {...schedule['P2']['6'], teamHome: teamWin}
                )
            }

            // Osm.5 finished
            if (schedule['P1']['3'].finished && schedule['P2']['6'].teamAway == '?') {
                let teamWin = schedule['P1']['3'].scoreHome > schedule['P1']['3'].scoreAway ? schedule['P1']['3'].teamHome : schedule['P1']['3'].teamAway
                mainContext.updateSchedule(
                    'P2',
                    6,
                    {...schedule['P2']['6'], teamAway: teamWin}
                )
            }

            // Osm.6 finished
            if (schedule['P1']['4'].finished && schedule['P2']['5'].teamAway == '?') {
                let teamWin = schedule['P1']['4'].scoreHome > schedule['P1']['4'].scoreAway ? schedule['P1']['4'].teamHome : schedule['P1']['4'].teamAway
                mainContext.updateSchedule(
                    'P2',
                    5,
                    {...schedule['P2']['5'], teamAway: teamWin}
                )
            }

            // Osm.7 finished
            if (schedule['P2']['3'].finished && schedule['P1']['6'].teamAway == '?') {
                let teamWin = schedule['P2']['3'].scoreHome > schedule['P2']['3'].scoreAway ? schedule['P2']['3'].teamHome : schedule['P2']['3'].teamAway
                mainContext.updateSchedule(
                    'P1',
                    6,
                    {...schedule['P1']['6'], teamAway: teamWin}
                )
            }

            // Osm.6 finished
            if (schedule['P2']['4'].finished && schedule['P1']['5'].teamAway == '?') {
                let teamWin = schedule['P2']['4'].scoreHome > schedule['P2']['4'].scoreAway ? schedule['P2']['4'].teamHome : schedule['P2']['4'].teamAway
                mainContext.updateSchedule(
                    'P1',
                    5,
                    {...schedule['P1']['5'], teamAway: teamWin}
                )
            }

            // Čtv.1 finished
            if (schedule['P1']['5'].finished && schedule['P1']['7'].teamHome == '?') {
                let teamWin = schedule['P1']['5'].scoreHome > schedule['P1']['5'].scoreAway ? schedule['P1']['5'].teamHome : schedule['P1']['5'].teamAway
                mainContext.updateSchedule(
                    'P1',
                    7,
                    {...schedule['P1']['7'], teamHome: teamWin}
                )
            }

            // Čtv.2 finished
            if (schedule['P1']['6'].finished && schedule['P2']['7'].teamHome == '?') {
                let teamWin = schedule['P1']['6'].scoreHome > schedule['P1']['6'].scoreAway ? schedule['P1']['6'].teamHome : schedule['P1']['6'].teamAway
                mainContext.updateSchedule(
                    'P2',
                    7,
                    {...schedule['P2']['7'], teamHome: teamWin}
                )
            }

            // Čtv.3 finished
            if (schedule['P2']['5'].finished && schedule['P1']['7'].teamAway == '?') {
                let teamWin = schedule['P2']['5'].scoreHome > schedule['P2']['5'].scoreAway ? schedule['P2']['5'].teamHome : schedule['P2']['5'].teamAway
                mainContext.updateSchedule(
                    'P1',
                    7,
                    {...schedule['P1']['7'], teamAway: teamWin}
                )
            }

            // Čtv.4 finished
            if (schedule['P2']['6'].finished && schedule['P2']['7'].teamAway == '?') {
                let teamWin = schedule['P2']['6'].scoreHome > schedule['P2']['6'].scoreAway ? schedule['P2']['6'].teamHome : schedule['P2']['6'].teamAway
                mainContext.updateSchedule(
                    'P2',
                    7,
                    {...schedule['P2']['7'], teamAway: teamWin}
                )
            }

            // Sem.1 finished
            if (schedule['P1']['7'].finished) {
                let teamWin = schedule['P1']['7'].scoreHome > schedule['P1']['7'].scoreAway ? schedule['P1']['7'].teamHome : schedule['P1']['7'].teamAway
                let teamLost = schedule['P1']['7'].scoreHome < schedule['P1']['7'].scoreAway ? schedule['P1']['7'].teamHome : schedule['P1']['7'].teamAway
                if (schedule['P1']['9'].teamHome == '?') {
                    mainContext.updateSchedule(
                        'P1',
                        9,
                        {...schedule['P1']['9'], teamHome: teamWin}
                    )
                }

                if (schedule['P1']['8'].teamHome == '?') {
                    mainContext.updateSchedule(
                        'P1',
                        8,
                        {...schedule['P1']['8'], teamHome: teamLost}
                    )
                }
            }

            // Sem.2 finished
            if (schedule['P2']['7'].finished) {
                let teamWin = schedule['P2']['7'].scoreHome > schedule['P2']['7'].scoreAway ? schedule['P2']['7'].teamHome : schedule['P2']['7'].teamAway
                let teamLost = schedule['P2']['7'].scoreHome < schedule['P2']['7'].scoreAway ? schedule['P2']['7'].teamHome : schedule['P2']['7'].teamAway
                if (schedule['P1']['9'].teamAway == '?') {
                    mainContext.updateSchedule(
                        'P1',
                        9,
                        {...schedule['P1']['9'], teamAway: teamWin}
                    )
                }

                if (schedule['P1']['8'].teamAway == '?') {
                    mainContext.updateSchedule(
                        'P1',
                        8,
                        {...schedule['P1']['8'], teamAway: teamLost}
                    )
                }
            }
        }

    }, [sortedTeams])

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
