import React, { Fragment } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import Table from './Table'
import Schedule from './Schedule'
import Scorers from './Scorers'
import PlayOff from './PlayOff'
import { useDataContext } from '../context/DataContext'


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
    justifyContent: 'top',
    alignItems: 'flex-start'
})

const rightS = (style: StyleI) => css({
    width: '50%',
    maxWidth: '50%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
})

const rightTopS = (style: StyleI, fourgroups: boolean) => css({
    width: '100%',
    maxWidth: '100%',
    height: fourgroups ? '100vh' : '70%',
    maxHeight: fourgroups ? '100vh' : '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'top'
})

const tablesS = (style: StyleI) => css({
    width: '40%',
    maxWidth: '40%',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    alignItems: 'flex-start'
})

const logoFrameS = (style: StyleI) => css({
    flexGrow: 1,
    width: '100%',
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    margin: 0
})

const logoS = (style: StyleI) => css({
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxHeight: '70%',
    maxWidth: '70%',
    transform: 'translate(-50%, -50%)'
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
})

const Overview: React.FunctionComponent = props => {

    const { style } = useMainContext()
    const { scheduleLoaded, groups } = useDataContext()

    return (
        <div css={componentS(style)}>
            <div css={schedulesS(style)}>
                {scheduleLoaded && 
                    <Fragment>
                        <Schedule playground={'Old Trafford'} groups={groups.length > 2 ? ['A', 'B'] : ['A']} />
                        <Schedule playground={'Camp Nou'} groups={groups.length > 2 ? ['C', 'D'] : ['B']} />
                        {groups.length > 2 && 
                            <div css={playoffS(style)}>
                                <PlayOff />
                            </div>
                        }
                    </Fragment>
                }
            </div>
            <div css={rightS(style)}>
                {groups.length <= 2 && 
                    <Fragment>
                        <div css={rightTopS(style, false)}>
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
                    </Fragment>
                }
                {groups.length > 2 &&
                    <Fragment>
                        <div css={rightTopS(style, true)}>
                            <div css={tablesS(style)}>
                                <Table group={'A'} />
                                <Table group={'B'} />
                                <Table group={'C'} />
                                <Table group={'D'} />
                                <div css={logoFrameS(style)}>
                                    <img src={'/img/logo_mmp2023.png'} css={logoS(style)} />
                                </div>
                            </div>
                            <div css={scorersS(style)}>
                                <Scorers />
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        </div>
    )
}

export default Overview