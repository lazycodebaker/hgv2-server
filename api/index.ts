
import express, { type Express, type Request, type Response } from 'express'
import { fetchCodeforcesData } from '../platform-services/codeforces'
import { fetchGeeksForGeeksData } from '../platform-services/geeksforgeeks'
import { fetchCodeChefData } from '../platform-services/codechef'
import { fetchLeetCodeData } from '../platform-services/leetcode'

const app: Express = express()

// Middleware to parse JSON requests
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Welcome to HGV2 API' })
})

// Fetch data from the platform based on the platform and username
app.get('/fetch/:platform/:username', async (request: Request, response: Response) => {
    const { platform, username } = request.params

    if (platform === 'codeforces') {
        const data = await fetchCodeforcesData(username)
        return response.json(data)
    } else if (platform === 'geeksforgeeks') {
        const data = await fetchGeeksForGeeksData(username)
        return response.json(data)
    } else if (platform === 'codechef') {
        const data = await fetchCodeChefData(username)
        return response.json(data)
    } else if (platform === 'leetcode') {
        const data = await fetchLeetCodeData(username)
        return response.json(data)
    } else {
        return response.json({ message: 'Invalid platform' })
    }
})

// Fetch data from all platforms based on the username
app.get('/fetch-all/:username', async (request: Request, response: Response) => {
    const { username } = request.params

    const codeforcesData = await fetchCodeforcesData(username)
    const geeksForGeeksData = await fetchGeeksForGeeksData(username)
    const codeChefData = await fetchCodeChefData(username)
    const leetCodeData = await fetchLeetCodeData(username)

    return response.json({ codeforces: codeforcesData, geeksforgeeks: geeksForGeeksData, codechef: codeChefData, leetcode: leetCodeData })
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})

export default app
