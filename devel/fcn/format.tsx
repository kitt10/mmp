import { playerPointsI } from "../context/DataContext";
import { StyleI } from "../context/MainContext"

export const rKey = () => {
    return (Math.random() + 1).toString(36).substring(7)
}

export const zfill = (num: number, size: number) => {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

export const round2 = (val: number) => {
    return Math.round(val * 100) / 100
}

export const round4 = (val: number) => {
    return Math.round(val * 10000) / 10000
}

export const mean = (a: number[]) => {
    const sum = a.reduce((x, y) => x + y, 0)
    return (sum / a.length) || -1
}

export const toClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then().catch(e => console.error(e))
}

export const points2text = (points: playerPointsI) => {
    try {
        let text = ''
        for (let [k, v] of Object.entries(points)) {
            text += k.split('-')[0]+':'+v.goals.toString()+':'+v.assists.toString()+'\n'
        }
        return text
    } catch {
        console.log('Exception in points2text,', Object.entries(points))
        return ''
    }
}

export const text2points = (text: string, teamName: string) => {
    try {
        let points = {} as playerPointsI
        let lines = text.split('\n')
        for (let line of lines) {
            let vals = line.split(':')
            points[vals[0]+'-'+teamName] = {
                goals: +vals[1],
                assists: +vals[2]
            }
        }
        return points
    } catch {
        console.log('Exception in text2points,',  text)
        return {} as playerPointsI
    }
}

export const maxNChars = (inp: string, n=20) => {
    if (inp.length > n) {
        return inp.substring(0, n-2)+'..'
    } else {
        return inp
    }
}