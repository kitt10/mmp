import React from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import Table from './Table'
import Schedule from './Schedule'
import Scorers from './Scorers'
import PlayOff from './PlayOff'


const componentS = (style: StyleI) => css({
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'left'
})

const schedulesS = (style: StyleI) => css({
    width: '50%',
    maxWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
})

const rightS = (style: StyleI) => css({
    width: '50%',
    maxWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
})

const rightTopS = (style: StyleI) => css({
    width: '100%',
    height: '70%',
    maxHeight: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'top'
})

const tablesS = (style: StyleI) => css({
    width: '40%',
    maxWidth: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
})

const scorersS = (style: StyleI) => css({
    width: '60%',
    maxWidth: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    alignItems: 'left'
})

const playoffS = (style: StyleI) => css({
    width: '100%',
    maxWidth: '100%',
    height: '30%',
    maxHeight: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

const Overview: React.FunctionComponent = props => {

    const { style } = useMainContext()

    return (
        <div css={componentS(style)}>
            <div css={schedulesS(style)}>
                <Schedule group={'A'} />
                <Schedule group={'B'} />
            </div>
            <div css={rightS(style)}>
                <div css={rightTopS(style)}>
                    <div css={tablesS(style)}>
                        <Table group={'A'} />
                        <Table group={'B'} />
                    </div>
                    <div css={scorersS(style)}>
                        <Scorers />
                    </div>
                </div>
                <div css={playoffS(style)}>
                    <PlayOff />
                </div>
            </div>
        </div>
    )
}

export default Overview