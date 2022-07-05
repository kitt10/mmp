import React, { useEffect, useState, createRef } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { playerPointsI, ScheduleItemI, useDataContext } from '../context/DataContext'
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
    fontSize: '15px'
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

const pointsS = (style: StyleI) => css({
    padding: '5px',
    width: '150px',
    height: '200px',
    fontSize: '13px',
    borderRadius: '5px',
    textAlign: 'left'
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

const points2text = (points: playerPointsI) => {
    try {
        let text = ''
        for (let [k, v] of Object.entries(points)) {
            text += k+':'+v.goals.toString()+':'+v.assists.toString()+'\n'
        }
        return text
    } catch {
        console.log('Exception in points2text,', Object.entries(points))
        return ''
    }
}

const text2points = (text: string) => {
    try {
        let points = {} as playerPointsI
        let lines = text.split('\n')
        for (let line of lines) {
            let vals = line.split(':')
            points[vals[0]] = {
                goals: +vals[1],
                assists: +vals[2]
            }
        }
        return points
    } catch {
        console.log('Exception in text2points,',  text)
        return {} as playerPointsI
    }
}

interface SubmitBlockI {
    section: string
}

const SubmitBlock: React.FunctionComponent<SubmitBlockI> = ({ section }) => {

    const { style, updateSchedule } = useMainContext()
    const { schedule, lastMatchInd } = useDataContext()

    const group: string = section.startsWith('Play') ? 'P' : section
    const [currentInd, setCurrentInd] = useState(lastMatchInd[group])

    const [match, setMatch] = useState({...schedule[group][currentInd]})
    const [valScoreHome, setValScoreHome] = useState(match.scoreHome)
    const [valScoreAway, setValScoreAway] = useState(match.scoreAway)
    const [valPointsHome, setValPointsHome] = useState(points2text(match.pointsHome))
    const [valPointsAway, setValPointsAway] = useState(points2text(match.pointsAway))

    const refGoalsHome: React.RefObject<HTMLInputElement> = createRef() as React.RefObject<HTMLInputElement>
    const refGoalsAway: React.RefObject<HTMLInputElement> = createRef() as React.RefObject<HTMLInputElement>
    const refPointsHome: React.RefObject<HTMLTextAreaElement> = createRef() as React.RefObject<HTMLTextAreaElement>
    const refPointsAway: React.RefObject<HTMLTextAreaElement> = createRef() as React.RefObject<HTMLTextAreaElement>

    const handleUpdate = async () => {
        updateSchedule(
            group,
            match.nb,
            match
        )
        console.log('sending match:', match)
    }

    const handleFinishedClicked = () => {
        setMatch({...match, finished: !match.finished})
    }

    const handleScoreHomeChanged = () => {
        try {
            if (refGoalsHome.current) {
                setValScoreHome(+refGoalsHome.current.value)
                setMatch({...match, scoreHome: +refGoalsHome.current.value})
            }
        } catch {
            console.log('Exception in handleScoreHomeChanged()')
        }
    }

    const handleScoreAwayChanged = () => {
        try {
            if (refGoalsAway.current) {
                setValScoreAway(+refGoalsAway.current.value)
                setMatch({...match, scoreAway: +refGoalsAway.current.value})
            }
        } catch {
            console.log('Exception in handleScoreHomeChanged()')
        }
    }

    const handlePointsHomeChanged = () => {
        if (refPointsHome.current) {
            let text = refPointsHome.current.value
            setValPointsHome(text)
            setMatch({...match, pointsHome: text2points(text)})
        }
    }

    const handlePointsAwayChanged = () => {
        if (refPointsAway.current) {
            let text = refPointsAway.current.value
            setValPointsAway(text)
            setMatch({...match, pointsAway: text2points(text)})
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

    useEffect(() => {
        setValScoreHome(match.scoreHome)
        setValScoreAway(match.scoreAway)
        setValPointsHome(points2text(match.pointsHome))
        setValPointsAway(points2text(match.pointsAway))
    }, [match])

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
                                value={valScoreHome}
                                onChange={() => handleScoreHomeChanged()}
                                css={inputS(style)} />
                        </td>
                        <td>
                            <input 
                                ref={refGoalsAway}
                                type={'text'}
                                value={valScoreAway}
                                onChange={() => handleScoreAwayChanged()}
                                css={inputS(style)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea 
                                ref={refPointsHome}
                                defaultValue={points2text(match.pointsHome)}
                                onChange={() => handlePointsHomeChanged()}
                                css={pointsS(style)} />
                        </td>
                        <td>
                            <textarea 
                                ref={refPointsAway}
                                defaultValue={points2text(match.pointsAway)}
                                onChange={() => handlePointsAwayChanged()}
                                css={pointsS(style)} />
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