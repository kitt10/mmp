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
        border: '1px solid pink'
    }
})

const tdCenterS = (style: StyleI) => css({
    textAlign: 'center'
})

const pointsS = (style: StyleI) => css({
    fontSize: '90%',
    color: 'darkgray'
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
                    {Array.from(Array(maxMatches).keys()).map((num: number) => ''+num).map((nb: string) =>
                        groups.filter((g: string) => nb in schedule[g]).map((g: string) => 
                            <tr key={rKey()} css={{'color': schedule[g][nb].finished ? 'maroon' : 'black'}}>
                                <td>
                                    {schedule[g][nb].nb+'. ('+g+')'}
                                </td>
                                <td>
                                    {schedule[g][nb].teamHome+' - '+schedule[g][nb].teamAway}
                                </td>
                                <td css={tdCenterS(style)}>
                                    {schedule[g][nb].finished ? schedule[g][nb].scoreHome+' - '+schedule[g][nb].scoreAway : '-:-'}
                                </td>
                                <td css={[tdCenterS(style), pointsS(style)]}>
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