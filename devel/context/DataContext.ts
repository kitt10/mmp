import { createContext, useContext } from 'react'

export interface KeyI {
  [nTeams: string]: string[]
}

export interface DrawI {
  [group: string]: string[]
}

export interface TeamI {
  id: string
  players: PlayerI[]
  matches: number
  goalsPlus: number
  goalsMinus: number
  points: number
  upPosition: boolean
}

export interface PlayerI {
  id: string
  name: string
  team: TeamI
  goals: number
  assists: number
  points: number
  meanPoints: number
}

export interface ScheduleI {
  [group: string]: {
    [nb: number]: ScheduleItemI
  }
}

export interface ScheduleItemI {
  nb: number
  id: string
  teamHome: TeamI
  teamAway: TeamI
  finished: boolean
  scoreHome: number
  scoreAway: number
  estimatedStart: string
  pointsHome: playerPointsI
  pointsAway: playerPointsI
}

export interface playerPointsI {
  [playerId: string]: {
    goals: number
    assists: number
  }
}

export interface lastMatchIndI {
  [group: string]: number
}

export const defaultLastMatchInd: lastMatchIndI = {
    'A': 1,
    'B': 1,
    'P': 1
}

export interface DataContextI {
  scheduleLoaded: boolean
  schedule: ScheduleI
  loadSchedule: () => void
  lastMatchInd: lastMatchIndI
}

const DataContext = createContext<DataContextI>({} as DataContextI)

export const useDataContext = () => {
  return useContext(DataContext)
}

export default DataContext
