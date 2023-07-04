import React, { Fragment, useEffect, useRef, useState } from 'react'
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

const titleBarS = (style: StyleI) => css({
    paddingBottom: '10px',
    color: style.colors.primary,
    borderBottom: `2px dashed ${style.colors.primary}`,
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

const titleS = (style: StyleI) => css({
    
})

const subTitleS = (style: StyleI) => css({
    fontSize: '15px'
})

const inputNTeamsS = (style: StyleI) => css({
    padding: '2px',
    marginLeft: '10px',
    width: '50px',
    fontSize: '15px'
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
    const [nTeams, setNTeams] = useState(12)
    const [nTeamsPerGroup, setNTeamsPerGroup] = useState(6)
    const [groups, setGroups] = useState(['A', 'B'])

    const teamsIdsGroupA: string[] = Array.from(Array(nTeamsPerGroup).keys()).map((ind: number) => 'A'+(ind+1))
    const teamsIdsGroupB: string[] = Array.from(Array(nTeamsPerGroup).keys()).map((ind: number) => 'B'+(ind+1))
    const teamsIdsGroupC: string[] = Array.from(Array(nTeamsPerGroup).keys()).map((ind: number) => 'C'+(ind+1))
    const teamsIdsGroupD: string[] = Array.from(Array(nTeamsPerGroup).keys()).map((ind: number) => 'D'+(ind+1))

    const refsA: React.RefObject<HTMLInputElement>[] = teamsIdsGroupA.map((teamId: string) => React.createRef() as React.RefObject<HTMLInputElement>)
    const refsB: React.RefObject<HTMLInputElement>[] = teamsIdsGroupB.map((teamId: string) => React.createRef() as React.RefObject<HTMLInputElement>)
    const refsC: React.RefObject<HTMLInputElement>[] = teamsIdsGroupB.map((teamId: string) => React.createRef() as React.RefObject<HTMLInputElement>)
    const refsD: React.RefObject<HTMLInputElement>[] = teamsIdsGroupB.map((teamId: string) => React.createRef() as React.RefObject<HTMLInputElement>)

    const handleSubmit = () => {
        console.log('Zahajuji...')

        const draw: DrawI = Object.fromEntries(groups.map((g: string) => [g, []]))
        for (let ind = 0; ind < nTeamsPerGroup; ind++) {

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

            if (groups.length > 2) {
                //@ts-ignore
                if (refsC[ind].current && refsC[ind].current.value != '') {
                    //@ts-ignore
                    draw['C'].push(refsC[ind].current.value)
                }

                //@ts-ignore
                if (refsD[ind].current && refsD[ind].current.value != '') {
                    //@ts-ignore
                    draw['D'].push(refsD[ind].current.value)
                }
            }
        }
        console.log('Draw:', draw)
        launchGame(draw)
    }

    useEffect(() => {
        if (nTeams <= 14) {
            setGroups(['A', 'B'])
            setNTeamsPerGroup(Math.ceil(nTeams/2))
        } else {
            setGroups(['A', 'B', 'C', 'D'])
            setNTeamsPerGroup(Math.ceil(nTeams/4))
        }
    }, [nTeams])

    return (
        <div css={componentS(style)}>
            <div css={titleBarS(style)}>
                <div css={titleS(style)}>
                    {'Los turnaje'}
                </div>
                <div css={{'flexGrow': 1}} />
                <div css={subTitleS(style)}>
                    {'Počet týmů:'}
                </div>
                <input
                    type={'number'}
                    min={8}
                    max={24}
                    defaultValue={nTeams}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNTeams(+e.target.value)}
                    css={inputNTeamsS(style)} 
                    />
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
                    {groups.length > 2 &&
                        teamsIdsGroupC.map((teamIdC: string, ind: number) => 
                            <tr key={rKey()}>
                                <th>
                                    {teamIdC}
                                </th>
                                <td>
                                    <input
                                        type={'text'}
                                        css={inputS(style)} 
                                        ref={refsC[ind]} />
                                </td>
                                <th>
                                    {teamsIdsGroupD[ind]}
                                </th>
                                <td>
                                    <input
                                        type={'text'}
                                        css={inputS(style)} 
                                        ref={refsD[ind]} />
                                </td>
                            </tr>
                        )
                    }
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