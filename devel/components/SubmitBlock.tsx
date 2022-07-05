import React, { useEffect, useState, createRef } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { ScheduleItemI, useDataContext } from '../context/DataContext'
import IconButton from './atomic/IconButton'


const componentS = (style: StyleI) => css({
    width: 'fit-content',
    maxWidth: '30%',
    height: 'fit-content',
    backgroundColor: style.colors.gray,
    color: style.colors.dark,
    fontSize: '22px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
    padding: '25px',
    borderRadius: '5px',
    marginLeft: '25px',
    marginRight: '25px'
})

const titleS = (style: StyleI) => css({
    paddingBottom: '10px',
    color: style.colors.primary,
    borderBottom: `2px dashed ${style.colors.primary}`,
    fontVariant: 'small-caps'
})

const barS = (style: StyleI) => css({
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '15px',
    border: '1px solid red'
})

const matchTableS = (style: StyleI) => css({
    width: 'calc(100% - 20px)',
    padding: '10px',
    fontSize: '15px',
    'td': {
        width: '150px',
        textAlign: 'center',
        paddingBottom: '15px'
    }
})

const inputS = (style: StyleI) => css({
    padding: '5px',
    width: '50px',
    fontSize: '15px',
    borderRadius: '5px',
    textAlign: 'center'
})

const teamNameTdS = (style: StyleI) => css({
    padding: '5px',
    fontVariant: 'small-caps'
})

const submitLineS = (style: StyleI) => css({
    paddingBottom: '10px',
    color: style.colors.primary,
    marginTop: '20px',
    textAlign: 'center'
})

const submitButtonS = (style: StyleI) => css({
    fontSize: '15px',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    ':hover': {
        backgroundColor: style.colors.highlight
    }
})

interface SubmitBlockI {
    section: string
}

const SubmitBlock: React.FunctionComponent<SubmitBlockI> = ({ section }) => {

    const { style, updateSchedule } = useMainContext()
    const { schedule, lastMatchInd } = useDataContext()

    const group: string = section.startsWith('Play') ? 'P' : section
    const [currentInd, setCurrentInd] = useState(lastMatchInd[group])

    const [match, setMatch] = useState({...schedule[group][currentInd]})

    const refGoalsHome: React.RefObject<HTMLInputElement> = createRef() as React.RefObject<HTMLInputElement>
    const refGoalsAway: React.RefObject<HTMLInputElement> = createRef() as React.RefObject<HTMLInputElement>

    const handleUpdate = async () => {
        updateSchedule(
            group,
            match.nb,
            match
        )
    }

    const handleFinishedClicked = () => {
        setMatch({...match, finished: !match.finished})
    }

    const handleScoreHomeChanged = () => {
        if (refGoalsHome.current) {
            setMatch({...match, scoreHome: +refGoalsHome.current.value})
        }
    }

    const handleScoreAwayChanged = () => {
        if (refGoalsAway.current) {
            setMatch({...match, scoreAway: +refGoalsAway.current.value})
        }
    }

    const handlePrevious = () => {
        if (currentInd > 1) {
            setCurrentInd(currentInd-1)
        }
    }

    const handleNext = () => {
        if (currentInd < Object.keys(schedule[group]).length) {
            setCurrentInd(currentInd+1)
        }
    }

    useEffect(() => {
        setMatch({...schedule[group][currentInd]})
    }, [currentInd])

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Zápasy: {section.startsWith('Play') ? section : 'skupina '+section}
            </div>
            <div css={barS(style)}>
                <IconButton 
                    fontSize={'20px'}
                    onClick={() => handlePrevious()}>{'arrow_back'}</IconButton>
                {currentInd+' / '+Object.keys(schedule[group]).length}
                <IconButton 
                    fontSize={'20px'}
                    onClick={() => handleNext()}>{'arrow_forward'}</IconButton>
            </div>
            <table css={matchTableS(style)}>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <IconButton 
                                fontSize={'35px'}
                                color={match.finished ? 'darkgreen' : 'maroon'}
                                onClick={() => handleFinishedClicked()}>{match.finished ? 'check_box' : 'check_box_outline_blank'}</IconButton>
                        </td>
                    </tr>
                    <tr>
                        <td css={teamNameTdS(style)}>
                            {match.teamHome}
                        </td>
                        <td css={teamNameTdS(style)}>
                            {match.teamAway}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input 
                                ref={refGoalsHome}
                                type={'text'}
                                defaultValue={match.scoreHome}
                                onChange={() => handleScoreHomeChanged()}
                                css={inputS(style)} />
                        </td>
                        <td>
                            <input 
                                ref={refGoalsAway}
                                type={'text'}
                                defaultValue={match.scoreAway}
                                onChange={() => handleScoreAwayChanged()}
                                css={inputS(style)} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div css={submitLineS(style)}>
                <input 
                    type={'submit'}
                    value='Aktualizovat!'
                    css={submitButtonS(style)}
                    onClick={() => handleUpdate()} />
            </div>
        </div>
    )
}

export default SubmitBlock