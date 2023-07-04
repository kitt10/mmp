import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { defaultTeam, TeamI, useDataContext } from '../context/DataContext'


const componentS = (style: StyleI) => css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

const titleS = (style: StyleI) => css({
    width: '100%',
    backgroundColor: style.colors.dark,
    color: style.colors.blond,
    paddingTop: '7px',
    paddingBottom: '7px',
    fontVariant: 'small-caps',
    textAlign: 'center'
})

const tableS = (style: StyleI) => css({
    width: '100%',
    'td': {
        fontSize: '11px',
        lineHeight: '2em'
    }
})

const tdCenterS = (style: StyleI) => css({
    textAlign: 'center'
})

const PlayOff: React.FunctionComponent = () => {

    const { style } = useMainContext()
    const { schedule, teams } = useDataContext()

    const [f, setF] = useState(false)
    const [tableA, setTableA] = useState([] as TeamI[])
    const [tableB, setTableB] = useState([] as TeamI[])

    let S1 = 'S1'
    let S2 = 'S2'
    let RD = 'o 3. místo'
    let FIN = 'Finále'

    const groupsFinished = () => {
        for (let m of Object.values(schedule['A'])) {
            if (!m.finished) {
                return false
            }
        }
        for (let m of Object.values(schedule['B'])) {
            if (!m.finished) {
                return false
            }
        }
        return true
    }

    useEffect(() => {
        setF(groupsFinished())
    }, [])

    useEffect(() => {
        if (f) {
            setTableA(Object.values(teams['A']).sort((t1: TeamI, t2: TeamI) => {
                if (t1.points > t2.points) {
                    return -1
                } else if (t1.points == t2.points) {
                    return t1.goalsDiff > t2.goalsDiff ? -1 : 1
                } else {
                    return 1
                }
            }))

            setTableB(Object.values(teams['B']).sort((t1: TeamI, t2: TeamI) => {
                if (t1.points > t2.points) {
                    return -1
                } else if (t1.points == t2.points) {
                    return t1.goalsDiff > t2.goalsDiff ? -1 : 1
                } else {
                    return 1
                }
            }))
        }
    }, [f])

    useEffect(() => {
        if (schedule['P'][1].finished && schedule['P'][2].finished) {
            let home = schedule['P'][1].scoreHome > schedule['P'][1].scoreAway ? schedule['P'][1].teamHome : schedule['P'][1].teamAway
            let away = schedule['P'][2].scoreHome > schedule['P'][2].scoreAway ? schedule['P'][2].teamHome : schedule['P'][2].teamAway
            S1 = home+' - '+away
        }
    }, [schedule])

    useEffect(() => {
        if (schedule['P'][3].finished && schedule['P'][4].finished) {
            let home = schedule['P'][3].scoreHome > schedule['P'][3].scoreAway ? schedule['P'][3].teamHome : schedule['P'][3].teamAway
            let away = schedule['P'][4].scoreHome > schedule['P'][4].scoreAway ? schedule['P'][4].teamHome : schedule['P'][4].teamAway
            S2 = home+' - '+away
        }
    }, [schedule])

    useEffect(() => {
        if (schedule['P'][5].finished && schedule['P'][6].finished) {
            let home = schedule['P'][5].scoreHome < schedule['P'][5].scoreAway ? schedule['P'][5].teamHome : schedule['P'][5].teamAway
            let away = schedule['P'][6].scoreHome < schedule['P'][6].scoreAway ? schedule['P'][6].teamHome : schedule['P'][6].teamAway
            RD = home+' - '+away

            let home2 = schedule['P'][5].scoreHome > schedule['P'][5].scoreAway ? schedule['P'][5].teamHome : schedule['P'][5].teamAway
            let away2 = schedule['P'][6].scoreHome > schedule['P'][6].scoreAway ? schedule['P'][6].teamHome : schedule['P'][6].teamAway
            FIN = home2+' - '+away2
        }
    }, [schedule])

    const tablesLoaded: boolean = tableA.length > 0 && tableB.length > 0

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Play-Off
            </div>
            {tablesLoaded && <table css={tableS(style)}>
                <tbody>
                    <tr>
                        <td css={tdCenterS(style)}>
                            {f && tableA[0].name+' - '+tableB[3].name}
                            {!f && 'A1xB4'}
                        </td>
                        <td css={tdCenterS(style)}>
                            {f && tableB[1].name+' - '+tableA[2].name}
                            {!f && 'A3xB2'}
                        </td>
                        <td css={tdCenterS(style)}>
                            {f && tableB[0].name+' - '+tableA[3].name}
                            {!f && 'B1xA4'}
                        </td>
                        <td css={tdCenterS(style)}>
                            {f && tableB[2].name+' - '+tableA[1].name}
                            {!f && 'B3xA2'}
                        </td>
                    </tr>
                    <tr>
                        <td css={tdCenterS(style)}>
                            {f && schedule['P'][1].finished && schedule['P'][1].scoreHome+':'+schedule['P'][1].scoreAway}
                            {!f && '-:-'}
                        </td>
                        <td css={tdCenterS(style)}>
                            {f && schedule['P'][2].finished && schedule['P'][2].scoreHome+':'+schedule['P'][2].scoreAway}
                            {!f && '-:-'}
                        </td>
                        <td css={tdCenterS(style)}>
                            {f && schedule['P'][3].finished && schedule['P'][3].scoreHome+':'+schedule['P'][3].scoreAway}
                            {!f && '-:-'}
                        </td>
                        <td css={tdCenterS(style)}>
                            {f && schedule['P'][4].finished && schedule['P'][4].scoreHome+':'+schedule['P'][4].scoreAway}
                            {!f && '-:-'}
                        </td>
                    </tr>
                    <tr>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && S1}
                            {!f && 'A1/B4xB2/A3'}
                        </td>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && S2}
                            {!f && 'B1/A4xB3/A2'}
                        </td>
                    </tr>
                    <tr>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && schedule['P'][5].finished && schedule['P'][5].scoreHome+':'+schedule['P'][5].scoreAway}
                            {!f && '-:-'}
                        </td>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && schedule['P'][6].finished && schedule['P'][6].scoreHome+':'+schedule['P'][6].scoreAway}
                            {!f && '-:-'}
                        </td>
                    </tr>
                    <tr>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && RD}
                            {!f && 'o 3. místo'}
                        </td>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && FIN}
                            {!f && 'finále'}
                        </td>
                    </tr>
                    <tr>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && schedule['P'][7].finished && schedule['P'][7].scoreHome+':'+schedule['P'][7].scoreAway}
                            {!f && '-:-'}
                        </td>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && schedule['P'][8].finished && schedule['P'][8].scoreHome+':'+schedule['P'][8].scoreAway}
                            {!f && '-:-'}
                        </td>
                    </tr>
                </tbody>
            </table>}
        </div>
    )
}

export default PlayOff