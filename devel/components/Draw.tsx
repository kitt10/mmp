import React, { useRef } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { rKey } from '../fcn/format'
import { DrawI } from '../context/DataContext'


const componentS = (style: StyleI) => css({
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: style.colors.gray,
    color: style.colors.dark,
    fontSize: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
    padding: '25px',
    borderRadius: '5px'
})

const titleS = (style: StyleI) => css({
    paddingBottom: '10px',
    color: style.colors.primary,
    borderBottom: `2px dashed ${style.colors.primary}`,
    marginBottom: '20px'
})

const tableS = (style: StyleI) => css({
    paddingBottom: '10px',
    color: style.colors.primary,
    marginTop: '20px',
    'th': {
        paddingLeft: '50px'
    }
})

const inputS = (style: StyleI) => css({
    padding: '5px',
    marginLeft: '20px',
    marginBottom: '5px',
    width: '300px',
    fontSize: '15px'
})

const submitLineS = (style: StyleI) => css({
    paddingBottom: '10px',
    color: style.colors.primary,
    marginTop: '20px',
    textAlign: 'center'
})

const submitButtonS = (style: StyleI) => css({
    fontSize: '20px',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    ':hover': {
        backgroundColor: style.colors.highlight
    }
})

const Draw: React.FunctionComponent = props => {

    const { style, launchGame } = useMainContext()

    const maxTeamsPerGroup: number = 8
    const teamsIdsGroupA: string[] = Array.from(Array(maxTeamsPerGroup).keys()).map((ind: number) => 'A'+(ind+1))
    const teamsIdsGroupB: string[] = Array.from(Array(maxTeamsPerGroup).keys()).map((ind: number) => 'B'+(ind+1))

    const refsA: React.RefObject<HTMLInputElement>[] = teamsIdsGroupA.map((teamId: string) => React.createRef() as React.RefObject<HTMLInputElement>)
    const refsB: React.RefObject<HTMLInputElement>[] = teamsIdsGroupB.map((teamId: string) => React.createRef() as React.RefObject<HTMLInputElement>)

    const handleSubmit = () => {
        console.log('Zahajuji...')
        const draw: DrawI = {
            'A': [],
            'B': []
        }
        for (let ind = 0; ind < maxTeamsPerGroup; ind++) {
            //@ts-ignore
            if (refsA[ind].current && refsA[ind].current.value != '') {
                //@ts-ignore
                draw['A'].push(refsA[ind].current.value)
            }
            //@ts-ignore
            if (refsB[ind].current && refsB[ind].current.value != '') {
                //@ts-ignore
                draw['B'].push(refsB[ind].current.value)
            }
        }
        console.log('Draw:', draw)
        launchGame(draw)
    }

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                {'Los turnaje'}
            </div>
            <table css={tableS(style)}>
                <tbody>
                    {teamsIdsGroupA.map((teamIdA: string, ind: number) => 
                        <tr key={rKey()}>
                            <th>
                                {teamIdA}
                            </th>
                            <td>
                                <input
                                    type={'text'}
                                    css={inputS(style)} 
                                    ref={refsA[ind]} />
                            </td>
                            <th>
                                {teamsIdsGroupB[ind]}
                            </th>
                            <td>
                                <input
                                    type={'text'}
                                    css={inputS(style)} 
                                    ref={refsB[ind]} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div css={submitLineS(style)}>
                <input 
                    type={'submit'}
                    value='Zahájit turnaj!'
                    css={submitButtonS(style)}
                    onClick={() => handleSubmit()} />
            </div>
        </div>
    )
}

export default Draw