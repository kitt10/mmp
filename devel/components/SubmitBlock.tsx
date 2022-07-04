import React, { useState } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { ScheduleItemI, useDataContext } from '../context/DataContext'


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
    marginBottom: '20px',
    fontVariant: 'small-caps'
})

const matchTableS = (style: StyleI) => css({
    width: 'calc(100% - 20px)',
    padding: '10px'
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
    
    console.log(lastMatchInd, schedule)

    const match: ScheduleItemI = schedule[group][currentInd]

    const handleUpdate = async () => {
        console.log('clicked.')
    }

    return (
        <div css={componentS(style)}>
            <div css={titleS(style)}>
                Zápasy: {section.startsWith('Play') ? section : 'skupina '+section}
            </div>
            <table css={matchTableS(style)}>
                <tbody>
                    <tr>

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