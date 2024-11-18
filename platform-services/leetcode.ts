import fetch from 'node-fetch';

export async function fetchLeetCodeData(username: string): Promise<any> {
  const baseUrl = 'https://leetcode.com/graphql';

  const query = `
    query getUserData($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          countryName
          company
          school
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        badges {
          displayName
        }
      }
    }
  `;

  const body = JSON.stringify({
    query,
    variables: { username },
  });

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      return { message: `Failed to fetch data. Status code: ${response.status}` };
    }

    const data : any = await response.json();

    if (data.data?.matchedUser) {
      const user = data.data.matchedUser;

      return {
        username: user.username || 'N/A',
        realName: user.profile?.realName || 'N/A',
        country: user.profile?.countryName || 'N/A',
        company: user.profile?.company || 'N/A',
        school: user.profile?.school || 'N/A',
        solvedProblems: user.submitStats?.acSubmissionNum.reduce(
          (sum: number, submission: any) => sum + submission.count,
          0
        ) || 0,
      };
    } else {
      return { message: 'User not found' };
    }
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return { message: 'Error fetching data' };
  }
}
