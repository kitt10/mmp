import { createContext, useContext } from 'react'
import { SerializedStyles } from '@emotion/react'
import { DrawI, ScheduleItemI } from './DataContext'

export interface StyleI {
  globalStyle: SerializedStyles
  pageS: SerializedStyles
  colors: any
  view: any
  COLORS: string[]
  LETTERS: string[]
}

export interface DeviceI {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
}

export interface MainContextI {
  style: StyleI
  device: DeviceI
  gameLaunched: boolean
  launchGame: (draw: DrawI) => void
  updateSchedule: (section: string, nb: number, match: ScheduleItemI) => void
}

const MainContext = createContext<MainContextI>({} as MainContextI)

export const useMainContext = () => {
  return useContext(MainContext)
}

export default MainContext
