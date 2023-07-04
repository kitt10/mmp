import React from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { ScheduleItemI, useDataContext } from '../context/DataContext'
import { maxNChars, points2text, rKey } from '../fcn/format'


const componentS = (style: StyleI) => css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    alignItems: 'left'
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
        fontSize: '11px',
        width: '1%',
        whiteSpace: 'nowrap'
    },
    'tr td:last-child': {
        width: '100%',
        fontSize: '9px',
    }
})

const tdPadS = (style: StyleI, left: string, right: string, top: string) => css({
    paddingLeft: left,
    paddingRight: right,
    paddingTop: top
})

const splitTdS = (style: StyleI) => css({
    height: '1px',
    backgroundColor: '#ddd'
})

const pointsS = (style: StyleI) => css({
    fontWeight: 'normal',
    color: 'darkgray',
    width: '100%',
    whiteSpace: 'pre-wrap'
})

interface ScheduleI {
    playground: string
    groups: string[]
}

const Schedule: React.FunctionComponent<ScheduleI> = ({ playground, groups }) => {

    const { style } = useMainContext()
    const { schedule } = useDataContext()

    const titleGroups: string = 'skupina '+groups[0]+(groups.length > 2 ? ', '+groups[1] : '')

    const maxMatches = Math.max(...groups.map((g: string) => Object.keys(schedule[g]).length))
    const listOfStringIDs: string[] = Array.from(Array(maxMatches).keys()).map((num: number) => ''+(num+1))

    const matchesGroupPhase = [] as any[]
    const matchesPlayOff = [] as any[]
    for (let nbStr of listOfStringIDs) {
        for (let g of groups.filter((g: string) => nbStr in schedule[g])) {
            if (g.includes('P')) {
                matchesPlayOff.push([g, schedule[g][nbStr]])
            } else {
                matchesGroupPhase.push([g, schedule[g][nbStr]])
            }
        }

    }

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Rozpis - hřiště {playground} ({titleGroups})
            </div>
            <table css={tableS(style)}>
                <tbody>
                    {matchesGroupPhase.map(([g, match]: [string, ScheduleItemI]) => 
                        <tr key={rKey()} css={{'fontWeight': match.finished ? 'bold' : 'normal'}}>
                            <td css={tdPadS(style, '10px', '20px', '0px')}>
                                {g+'-'+match.nb+'.kolo'}
                            </td>
                            <td css={tdPadS(style, '0px', '20px', '0px')}>
                                {maxNChars(match.teamHome, 20)+' - '+maxNChars(match.teamAway, 20)}
                            </td>
                            <td css={tdPadS(style, '0px', '20px', '0px')}>
                                {match.finished ? match.scoreHome+':'+match.scoreAway : '-:-'}
                            </td>
                            <td css={[tdPadS(style, '0px', '10px', '0px'), pointsS(style)]}>
                                {match.finished ? points2text(match.pointsHome)+' - '+points2text(match.pointsAway) : ''}
                            </td>
                        </tr>
                    )}
                    <tr><td colSpan={4} css={splitTdS(style)}></td></tr>
                    {matchesPlayOff.map(([g, match]: [string, ScheduleItemI]) => 
                        <tr key={rKey()} css={{'fontWeight': match.finished ? 'bold' : 'normal'}}>
                            <td css={tdPadS(style, '10px', '20px', '3px')}>
                                {match.id}
                            </td>
                            <td css={tdPadS(style, '0px', '20px', '3px')}>
                            {maxNChars(match.teamHome, 20)+' - '+maxNChars(match.teamAway, 20)}
                            </td>
                            <td css={tdPadS(style, '0px', '20px', '3px')}>
                                {match.finished ? match.scoreHome+':'+match.scoreAway : '-:-'}
                            </td>
                            <td css={[tdPadS(style, '0px', '10px', '3px'), pointsS(style)]}>
                                {match.finished ? points2text(match.pointsHome)+' - '+points2text(match.pointsAway) : ''}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Schedule