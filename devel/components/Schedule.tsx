import React from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { useDataContext } from '../context/DataContext'
import { points2text, rKey } from '../fcn/format'


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
        width: '100%'
    }
})

const tdPadS = (style: StyleI, left: string, right: string, top: string) => css({
    paddingLeft: left,
    paddingRight: right,
    paddingTop: top
})

const pointsS = (style: StyleI) => css({
    fontSize: '90%',
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

    const maxMatches = Math.max(...groups.map((g: string) => Object.keys(schedule[g]).length))

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Rozpis - hřiště {playground}
            </div>
            <table css={tableS(style)}>
                <tbody>
                    {Array.from(Array(maxMatches).keys()).map((num: number) => ''+(num+1)).map((nb: string) =>
                        groups.filter((g: string) => nb in schedule[g]).map((g: string) => 
                            <tr key={rKey()} css={{'fontWeight': schedule[g][nb].finished ? 'bold' : 'normal'}}>
                                <td css={tdPadS(style, '10px', '20px', '3px')}>
                                    {g+' - '+schedule[g][nb].nb+'.'}
                                </td>
                                <td css={tdPadS(style, '0px', '20px', '3px')}>
                                    {schedule[g][nb].teamHome+' - '+schedule[g][nb].teamAway}
                                </td>
                                <td css={tdPadS(style, '0px', '20px', '3px')}>
                                    {schedule[g][nb].finished ? schedule[g][nb].scoreHome+':'+schedule[g][nb].scoreAway : '-:-'}
                                </td>
                                <td css={[tdPadS(style, '0px', '10px', '3px'), pointsS(style)]}>
                                    {schedule[g][nb].finished ? points2text(schedule[g][nb].pointsHome)+' - '+points2text(schedule[g][nb].pointsAway) : ''}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Schedule