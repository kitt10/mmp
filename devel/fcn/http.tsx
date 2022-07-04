
export const get = async (url: string, wait: boolean) => {
    const res = await fetch(url, {
        method: 'GET'
    })

    if (wait) {
        return await res.json()
    }
}

export const post = async (url: string, body: any) => {
    const res = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(body)
    })

    return await res.json()
}