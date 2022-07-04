import { useState } from 'react'
import { globalStyle, pageS, colors, view, COLORS, LETTERS } from '../config/style'
import { MainContextI, pageT, DeviceI } from '../context/MainContext'

export const useMain = () => {

    const [page, setPage] = useState('systems' as pageT)
    const [isMobile, setIsMobile] = useState(false)

    const device: DeviceI = {
        isMobile: isMobile,
        setIsMobile: setIsMobile
    }

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
        page: page,
        setPage: setPage
    }

    return mainContext
}

export default useMain
