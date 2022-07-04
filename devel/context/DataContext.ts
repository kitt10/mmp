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
  [group: string]: ScheduleItemI[]
}

export interface ScheduleItemI {
  nb: number
  teamHome: TeamI
  teamAway: TeamI
  finished: boolean
  scoreHome: number
  scoreAway: number
  estimatedStart: string
  pointsHome: playerPointsI[]
  pointsAway: playerPointsI[]
}

export interface playerPointsI {
  [playerId: string]: {
    goals: number
    assists: number
  }
}

export interface DataContextI {
  dataLoaded: boolean
  loadData: () => void
  key: KeyI
  draw: DrawI
}

const DataContext = createContext<DataContextI>({} as DataContextI)

export const useDataContext = () => {
  return useContext(DataContext)
}

export default DataContext
