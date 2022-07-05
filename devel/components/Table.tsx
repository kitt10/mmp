import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { TeamI, useDataContext } from '../context/DataContext'
import { points2text, rKey } from '../fcn/format'


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
    textAlign: 'center',
    fontSize: '15px'
})

const tableS = (style: StyleI) => css({
    width: '100%',
    'td': {
        fontSize: '12px'
    },
    'th': {
        fontWeight: 'bold',
        fontSize: '11px',
        paddingBottom: '10px'
    }
})

const tdCenterS = (style: StyleI) => css({
    textAlign: 'center'
})

const tableLineS = (upPosition: boolean, style: StyleI) => css({
    color: upPosition ? 'darkblue' : 'black'
})

interface TableI {
    group: string
}

const Table: React.FunctionComponent<TableI> = ({ group }) => {

    const { style } = useMainContext()
    const { teams } = useDataContext()

    const [thisGroupTeams, setThisGroupTeams] = useState([] as TeamI[])
    
    useEffect(() => {
        setThisGroupTeams(Object.values(teams[group]).sort((t1: TeamI, t2: TeamI) => {
            if (t1.points > t2.points) {
                return -1
            } else if (t1.points == t2.points) {
                return t1.goalsDiff > t2.goalsDiff ? -1 : 1
            } else {
                return 1
            }
        }))
    }, [])

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Tabulka - skupina {group}
            </div>
            <table css={tableS(style)}>
                <tbody>
                    <tr>
                        <th>{'#'}</th>
                        <th>{'tým'}</th>
                        <th>{'zápasy'}</th>
                        <th>{'skóre'}</th>
                        <th>{'body'}</th>
                    </tr>
                    {thisGroupTeams.map((team: TeamI, ind: number) => 
                        <tr key={rKey()} css={tableLineS(ind <= 3, style)}>
                            <td css={tdCenterS(style)}>
                                {ind+1}
                            </td>
                            <td>
                                {team.name}
                            </td>
                            <td css={tdCenterS(style)}>
                                {team.matches}
                            </td>
                            <td css={tdCenterS(style)}>
                                {team.goalsPlus+':'+team.goalsMinus}
                            </td>
                            <td css={[tdCenterS(style), {'fontWeight': 'bold'}]}>
                                {team.points}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table