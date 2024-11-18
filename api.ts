import express, { Request, Response } from 'express'
import { fetchCodeforcesData } from './platform-services/codeforces'
import { fetchGeeksForGeeksData } from './platform-services/geeksforgeeks'
import { fetchCodeChefData } from './platform-services/codechef'
import { fetchLeetCodeData } from './platform-services/leetcode'

const app = express()

// Middleware to parse JSON requests
app.use(express.json())

// Fetch data from the platform based on the platform and username
app.get('/fetch/:platform/:username', async (req: Request, res: Response) => {
  const { platform, username } = req.params

  if (platform === 'codeforces') {
    const data = await fetchCodeforcesData(username)
    return res.json(data)
  } else if (platform === 'geeksforgeeks') {
    const data = await fetchGeeksForGeeksData(username)
    return res.json(data)
  } else if (platform === 'codechef') {
    const data = await fetchCodeChefData(username)
    return res.json(data)
  } else if (platform === 'leetcode') {
    const data = await fetchLeetCodeData(username)
    return res.json(data)
  } else {
    return res.json({ message: 'Invalid platform' })
  }
})

// Fetch data from all platforms based on the username
app.get('/fetch-all/:username', async (req: Request, res: Response) => {
  const { username } = req.params

  const codeforcesData = await fetchCodeforcesData(username)
  const geeksForGeeksData = await fetchGeeksForGeeksData(username)
  const codeChefData = await fetchCodeChefData(username)
  const leetCodeData = await fetchLeetCodeData(username)

  return res.json({ codeforces: codeforcesData, geeksforgeeks: geeksForGeeksData, codechef: codeChefData, leetcode: leetCodeData })
})

export default app
