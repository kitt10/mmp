import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { TeamI, useDataContext } from '../context/DataContext'
import { rKey } from '../fcn/format'


const componentS = (style: StyleI) => css({
    width: 'calc(100% - 2px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10px',
    borderLeft: '2px solid black',
    borderRight: '2px solid black',
    borderBottom: '2px solid black'
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
    const { sortedTeams } = useDataContext()

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
                    {sortedTeams[group].map((team: TeamI, ind: number) => 
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