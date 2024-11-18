import fetch from 'node-fetch'

export async function fetchCodeforcesData(username: string): Promise<any> {
  const baseUrl = 'https://codeforces.com/api'
  const url = `${baseUrl}/user.info?handles=${username}`

  try {
    const response = await fetch(url)

    const data: any = await response.json()

    if (data.status === 'OK' && data.result?.length > 0) {
      const user = data.result[0]

      if(user.firstName && user.lastName) {
        var name = `${user.firstName} ${user.lastName}`
      } else {
        var name = 'N/A'
      }
      
      return {
        name: name,
        rating: user.rating ?? 0,
        handle: user.handle ?? 'N/A',
        contribution: user.contribution ?? 0,
        rank: user.rank ?? 'N/A',
        maxRating: user.maxRating ?? 0,
        maxRank: user.maxRank ?? 'N/A',
      }
    } else {
        return { message: 'User not found' }
    }
  } catch (error) {
    console.error('Error fetching Codeforces data:', error)
    return 'Error fetching data'
  }
}
