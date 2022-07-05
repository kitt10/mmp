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
        fontSize: '9px'
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
    group: string
}

const Schedule: React.FunctionComponent<ScheduleI> = ({ group }) => {

    const { style } = useMainContext()
    const { schedule } = useDataContext()

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Rozpis - skupina {group}
            </div>
            <table css={tableS(style)}>
                <tbody>
                    {Object.entries(schedule[group]).map(([k, v]) => 
                        <tr key={rKey()} css={{'color': v.finished ? 'maroon' : 'black'}}>
                            <td>
                                {v.nb}
                            </td>
                            <td>
                                {v.teamHome+' - '+v.teamAway}
                            </td>
                            <td css={tdCenterS(style)}>
                                {v.finished ? v.scoreHome+' - '+v.scoreAway : '-:-'}
                            </td>
                            <td css={[tdCenterS(style), pointsS(style)]}>
                                {v.finished ? points2text(v.pointsHome)+' - '+points2text(v.pointsAway) : ''}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Schedule