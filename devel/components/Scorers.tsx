import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { PlayerI, useDataContext } from '../context/DataContext'
import { rKey, round2, maxNChars } from '../fcn/format'


const componentS = (style: StyleI) => css({
    width: '100%',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
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

const contentS = (style: StyleI) => css({
    width: '100%',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    alignItems: 'center',
    overflowY: 'auto'
})

const tdCenterS = (style: StyleI) => css({
    textAlign: 'center',
    zIndex: 100
})

const tableS = (style: StyleI) => css({
    width: '100%',
    position: 'relative',
    'td': {
        fontSize: '10px',
        whiteSpace: 'nowrap'
    },
    'th': {
        fontWeight: 'bold',
        fontSize: '10px',
        paddingBottom: '10px',
        position: 'sticky',
        top: 0,
        zIndex: 500,
        backgroundColor: '#eee',
        width: '1%',
        paddingLeft: '7px',
        paddingRight: '5px'
    }
})

const Scorers: React.FunctionComponent = () => {

    const { style } = useMainContext()
    const { players } = useDataContext()

    const [scorers, setScorers] = useState([] as PlayerI[])
    
    useEffect(() => {
        setScorers(Object.values(players).sort((p1: PlayerI, p2: PlayerI) => {
            // points
            if (p1.points > p2.points) {
                return -1
            } else if (p1.points == p2.points) {
                // mean points
                if (p1.meanPoints > p2.meanPoints) {
                    return -1
                } else if (p1.meanPoints < p2.meanPoints) {
                    return  1
                } else {
                    // goals
                    if (p1.goals > p2.goals) {
                        return -1
                    } else if (p1.goals < p2.goals) {
                        return  1
                    } else {
                        return p1.name.localeCompare(p2.name)
                    }

                }
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
            <div css={contentS(style)}>
                <table css={tableS(style)}>
                    <tbody>
                        <tr>
                            <th>{'#'}</th>
                            <th>{'kanonýr'}</th>
                            <th>{'tým'}</th>
                            <th>{'body'}</th>
                            <th>{'góly'}</th>
                            <th>{'asistence'}</th>
                            <th>{'zápasy'}</th>
                            <th>{'mean'}</th>
                        </tr>
                        {scorers.map((player: PlayerI, ind: number) => 
                            <tr key={rKey()}>
                                <td css={tdCenterS(style)}>
                                    {ind+1}
                                </td>
                                <td css={{'width': '100%'}}>
                                    {maxNChars(player.name, 20)}
                                </td>
                                <td css={tdCenterS(style)}>
                                    {maxNChars(player.team.name, 15)}
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
                                    {player.matches}
                                </td>
                                <td css={tdCenterS(style)}>
                                    {round2(player.meanPoints)}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Scorers