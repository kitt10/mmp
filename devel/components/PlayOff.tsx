import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { useDataContext } from '../context/DataContext'


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
    const { schedule } = useDataContext()

    const [f, setF] = useState(false)

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

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Play-Off
            </div>
            <table css={tableS(style)}>
                <tbody>
                    <tr>
                        <td css={tdCenterS(style)}>
                            {f && schedule['P'][1].finished && schedule['P'][1].scoreHome+':'+schedule['P'][1].scoreAway}
                            {!f && 'A1xB4'}
                        </td>
                        <td css={tdCenterS(style)}>
                            {f && schedule['P'][2].finished && schedule['P'][2].scoreHome+':'+schedule['P'][2].scoreAway}
                            {!f && 'B2xA3'}
                        </td>
                        <td css={tdCenterS(style)}>
                            {f && schedule['P'][3].finished && schedule['P'][3].scoreHome+':'+schedule['P'][3].scoreAway}
                            {!f && 'B1xA4'}
                        </td>
                        <td css={tdCenterS(style)}>
                            {f && schedule['P'][4].finished && schedule['P'][4].scoreHome+':'+schedule['P'][4].scoreAway}
                            {!f && 'B3xA2'}
                        </td>
                    </tr>
                    <tr>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && schedule['P'][5].finished && schedule['P'][5].scoreHome+':'+schedule['P'][5].scoreAway}
                            {!f && 'A1/B4xB2/A3'}
                        </td>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && schedule['P'][6].finished && schedule['P'][6].scoreHome+':'+schedule['P'][6].scoreAway}
                            {!f && 'B1/A4xB3/A2'}
                        </td>
                    </tr>
                    <tr>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && schedule['P'][7].finished && schedule['P'][7].scoreHome+':'+schedule['P'][7].scoreAway}
                            {!f && 'o 3. místo'}
                        </td>
                        <td css={tdCenterS(style)} colSpan={2}>
                            {f && schedule['P'][8].finished && schedule['P'][8].scoreHome+':'+schedule['P'][8].scoreAway}
                            {!f && 'finále'}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PlayOff