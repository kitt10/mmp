import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { defaultPlayer, PlayerI, useDataContext } from '../context/DataContext'
import { rKey, round2 } from '../fcn/format'


const componentS = (style: StyleI) => css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    alignItems: 'center',
    overflowY: 'scroll'
})

const titleS = (style: StyleI) => css({
    width: '100%',
    backgroundColor: style.colors.dark,
    color: style.colors.blond,
    paddingTop: '7px',
    paddingBottom: '7px',
    fontVariant: 'small-caps',
    textAlign: 'center',
    fontSize: '15px',
    position: 'fixed',
    zIndex: 1000
})

const tdCenterS = (style: StyleI) => css({
    textAlign: 'center',
    zIndex: 100
})

const tableS = (style: StyleI) => css({
    width: '100%',
    height: 'calc(100% - 30px)',
    position: 'relative',
    marginTop: '30px',
    'td': {
        fontSize: '9px'
    },
    'th': {
        fontWeight: 'bold',
        fontSize: '10px',
        paddingBottom: '10px',
        position: 'sticky',
        top: '35px',
        zIndex: 500,
        backgroundColor: '#eee'
    }
})

const Scorers: React.FunctionComponent = () => {

    const { style } = useMainContext()
    const { players } = useDataContext()

    const [scorers, setScorers] = useState([] as PlayerI[])
    
    useEffect(() => {
        setScorers(Object.values(players).sort((p1: PlayerI, p2: PlayerI) => {
            if (p1.points > p2.points) {
                return -1
            } else if (p1.points == p2.points) {
                return p1.meanPoints > p2.meanPoints ? -1 : 1
            } else {
                return 1
            }
        }))
    }, [])

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Kanadské bodování
            </div>
            <table css={tableS(style)}>
                <tbody>
                    <tr>
                        <th>{'#'}</th>
                        <th>{'kanonýr'}</th>
                        <th>{'body'}</th>
                        <th>{'góly'}</th>
                        <th>{'áčka'}</th>
                        <th>{'zápasy'}</th>
                        <th>{'mean'}</th>
                    </tr>
                    {scorers.map((player: PlayerI, ind: number) => 
                        <tr key={rKey()}>
                            <td css={tdCenterS(style)}>
                                {ind+1}
                            </td>
                            <td>
                                {player.name}
                            </td>
                            <td css={[tdCenterS(style), {'fontWeight': 'bold'}]}>
                                {player.points}
                            </td>
                            <td css={tdCenterS(style)}>
                                {player.goals}
                            </td>
                            <td css={tdCenterS(style)}>
                                {player.assists}
                            </td>
                            <td css={tdCenterS(style)}>
                                {player.team.matches}
                            </td>
                            <td css={tdCenterS(style)}>
                                {round2(player.meanPoints)}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Scorers