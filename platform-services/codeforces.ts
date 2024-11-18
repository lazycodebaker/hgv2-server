import fetch from 'node-fetch'

export async function fetchCodeforcesData(username: string): Promise<any> {
  const baseUrl = 'https://codeforces.com/api'
  const url = `${baseUrl}/user.info?handles=${username}`

  try {
    const response = await fetch(url)

    const data: any = await response.json()

    if (data.status === 'OK' && data.result?.length > 0) {
      const user = data.result[0]
      return {
        name: user.name,
        rating: user.rating,
        handle: user.handle,
        contribution: user.contribution,
        rank: user.rank,
        maxRating: user.maxRating,
        maxRank: user.maxRank,
      }
    } else {
        return { message: 'User not found' }
    }
  } catch (error) {
    console.error('Error fetching Codeforces data:', error)
    return 'Error fetching data'
  }
}
