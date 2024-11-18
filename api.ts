import { Hono } from 'hono'
import { fetchCodeforcesData } from './platform-services/codeforces'
import { fetchGeeksForGeeksData } from './platform-services/geeksforgeeks'
import { fetchCodeChefData } from './platform-services/codechef'
import { fetchLeetCodeData } from './platform-services/leetcode'
const app = new Hono()


// Fetch data from the platform based on the platform and username
app.get('/fetch/:platform/:username', async (c) => {
  const { platform, username } = c.req.param()

  if (platform === 'codeforces') {
    const data = await fetchCodeforcesData(username)
    return c.json(data)
  } else if (platform === 'geeksforgeeks') {
    const data = await fetchGeeksForGeeksData(username)
    return c.json(data)
  } else if (platform === 'codechef') {
    const data = await fetchCodeChefData(username)
    return c.json(data)
  } else if(platform === 'leetcode'){
    const data = await fetchLeetCodeData(username)
    return c.json(data)
  } else {
    return c.json({ message: 'Invalid platform' })
  }
})

// Fetch data from all platforms based on the username
app.get('/fetch-all/:username', async (c) => {
  const username = c.req.param('username')
  const codeforcesData = await fetchCodeforcesData(username)
  const geeksForGeeksData = await fetchGeeksForGeeksData(username)
  const codeChefData = await fetchCodeChefData(username)
  const leetCodeData = await fetchLeetCodeData(username)
  return c.json({ codeforces: codeforcesData, geeksforgeeks: geeksForGeeksData, codechef: codeChefData, leetcode: leetCodeData })
})

export default app