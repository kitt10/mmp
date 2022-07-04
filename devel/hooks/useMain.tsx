import { useState, useEffect } from 'react'
import { globalStyle, pageS, colors, view, COLORS, LETTERS } from '../config/style'
import { MainContextI, DeviceI } from '../context/MainContext'
import { get, post } from '../fcn/http'
import { cfg } from '../config/config'
import { DrawI } from '../context/DataContext'

export const useMain = () => {

    const [isMobile, setIsMobile] = useState(false)
    const [gameLaunched, setGameLaunched] = useState(false)

    const device: DeviceI = {
        isMobile: isMobile,
        setIsMobile: setIsMobile
    }

    const launchGame = async (draw: DrawI) => {
        await post(cfg.serverURL+'/launch/', {'draw': draw}).then(async (data: any) => {
            console.log('Tournament launched.', data.status)
        }).catch(() => {
            console.log('Unable to launch the game.')
        })
    }

    const checkIsLaunched = async () => {
        await get(cfg.serverURL+'/islaunched/', true).then(async (data: any) => {
            setGameLaunched(data.launched)
        }).catch(() => {
            console.log('Unable to fetch isLaunched data.')
            setGameLaunched(false)
        })
    }

    useEffect(() => {
        checkIsLaunched()
    }, [])

    const mainContext: MainContextI = {
        style: {
            globalStyle: globalStyle,
            pageS: pageS,
            colors: colors,
            view: view,
            COLORS: COLORS,
            LETTERS: LETTERS
        },
        device: device,
        gameLaunched: gameLaunched,
        launchGame: launchGame
    }

    return mainContext
}

export default useMain