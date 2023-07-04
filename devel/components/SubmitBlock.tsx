import React, { useEffect, useState, createRef } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { useDataContext } from '../context/DataContext'
import IconButton from './atomic/IconButton'
import { text2points, points2text } from '../fcn/format'


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
    margin: '25px'
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

interface SubmitBlockI {
    group: string
}

const SubmitBlock: React.FunctionComponent<SubmitBlockI> = ({ group }) => {

    const { style, updateSchedule } = useMainContext()
    const { schedule, lastMatchInd } = useDataContext()

    const [currentInd, setCurrentInd] = useState(lastMatchInd[group])

    const [match, setMatch] = useState({...schedule[group][currentInd]})
    const [valFinished, setValFinished] = useState(match.finished)
    const [valScoreHome, setValScoreHome] = useState(match.scoreHome)
    const [valScoreAway, setValScoreAway] = useState(match.scoreAway)
    const [valPointsHome, setValPointsHome] = useState(points2text(match.pointsHome))
    const [valPointsAway, setValPointsAway] = useState(points2text(match.pointsAway))

    const refGoalsHome: React.RefObject<HTMLInputElement> = createRef() as React.RefObject<HTMLInputElement>
    const refGoalsAway: React.RefObject<HTMLInputElement> = createRef() as React.RefObject<HTMLInputElement>
    const refPointsHome: React.RefObject<HTMLTextAreaElement> = createRef() as React.RefObject<HTMLTextAreaElement>
    const refPointsAway: React.RefObject<HTMLTextAreaElement> = createRef() as React.RefObject<HTMLTextAreaElement>

    const handleUpdate = async () => {
        let pHome = valPointsHome != '' ? text2points(valPointsHome, match.teamHome) : match.pointsHome
        let pAway = valPointsAway != '' ? text2points(valPointsAway, match.teamAway) : match.pointsAway
        let matchToBeSent = {...match,
            finished: valFinished,
            scoreHome: valScoreHome, 
            scoreAway: valScoreAway, 
            pointsHome: pHome,
            pointsAway: pAway
        }

        console.log('sending match:', matchToBeSent)

        updateSchedule(
            group,
            match.nb,
            matchToBeSent
        )
    }

    const handleFinishedClicked = () => {
        setValFinished(!valFinished)
    }

    const handleScoreHomeChanged = () => {
        try {
            if (refGoalsHome.current) {
                setValScoreHome(+refGoalsHome.current.value)
                //setMatch({...match, scoreHome: +refGoalsHome.current.value})
            }
        } catch {
            console.log('Exception in handleScoreHomeChanged()')
        }
    }

    const handleScoreAwayChanged = () => {
        try {
            if (refGoalsAway.current) {
                setValScoreAway(+refGoalsAway.current.value)
                //setMatch({...match, scoreAway: +refGoalsAway.current.value})
            }
        } catch {
            console.log('Exception in handleScoreHomeChanged()')
        }
    }

    const handlePointsHomeChanged = () => {
        if (refPointsHome.current) {
            let text = refPointsHome.current.value
            setValPointsHome(text)
        }
    }

    const handlePointsAwayChanged = () => {
        if (refPointsAway.current) {
            let text = refPointsAway.current.value
            setValPointsAway(text)
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
        setValFinished(match.finished)
        setValScoreHome(match.scoreHome)
        setValScoreAway(match.scoreAway)
        setValPointsHome(points2text(match.pointsHome))
        setValPointsAway(points2text(match.pointsAway))
    }, [match])

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Zápasy: {group.startsWith('P') ? group : 'skupina '+group}
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
                                color={valFinished ? 'darkgreen' : 'maroon'}
                                onClick={() => handleFinishedClicked()}>{valFinished ? 'check_box' : 'check_box_outline_blank'}</IconButton>
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
                                value={valPointsHome}
                                onChange={() => handlePointsHomeChanged()}
                                css={pointsS(style)} />
                        </td>
                        <td>
                            <textarea 
                                ref={refPointsAway}
                                value={valPointsAway}
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