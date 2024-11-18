import { Hono } from 'hono'
import { fetchCodeforcesData } from './platform-services/codeforces'
import { fetchGeeksForGeeksData } from './platform-services/geeksforgeeks'
const app = new Hono()

app.get('/fetch/:platform/:username', async (c) => {
  const { platform, username } = c.req.param()

  if (platform === 'codeforces') {
    const data = await fetchCodeforcesData(username)
    return c.json(data)
  } else if (platform === 'gfg') {
    try {
      const data = await fetchGeeksForGeeksData(username)
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch data from GFG.' }, 500)
    }
  } else {
    return c.json({ error: 'Unsupported platform.' }, 400)
  }
})

export default app