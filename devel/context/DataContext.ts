import { createContext, useContext } from 'react'

export interface KeyI {
  [nTeams: string]: string[]
}

export interface DrawI {
  [group: string]: string[]
}

export interface TeamI {
  name: string
  matches: number
  goalsPlus: number
  goalsMinus: number
  goalsDiff: number
  points: number
  upPosition: boolean
  scalps: string[]
}

export const defaultTeam: TeamI = {
  name: '',
  matches: 0,
  goalsPlus: 0,
  goalsMinus: 0,
  goalsDiff: 0,
  points: 0,
  upPosition: false,
  scalps: []
}

export interface TeamsI {
  [group: string]: {
    [teamName: string]: TeamI
  }
}

export interface PlayerI {
  name: string
  team: TeamI
  goals: number
  assists: number
  matches: number
  points: number
  meanPoints: number
}

export const defaultPlayer: PlayerI = {
  name: '',
  team: {} as TeamI,
  goals: 0,
  assists: 0,
  matches: 0,
  points: 0,
  meanPoints: 0
}

export interface PlayersI {
  [name: string]: PlayerI
}

export interface ScheduleI {
  [group: string]: {
    [nb: string]: ScheduleItemI
  }
}

export interface ScheduleItemI {
  nb: number
  id: string
  teamHome: string
  teamAway: string
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
    'C': 1,
    'D': 1,
    'P1': 1,
    'P2': 1
}

export interface DataContextI {
  scheduleLoaded: boolean
  schedule: ScheduleI
  groups: string[]
  loadSchedule: () => void
  lastMatchInd: lastMatchIndI
  teams: TeamsI
  sortedTeams: {
    [group: string]: TeamI[]
  }
  players: PlayersI
}

const DataContext = createContext<DataContextI>({} as DataContextI)

export const useDataContext = () => {
  return useContext(DataContext)
}

export default DataContext
