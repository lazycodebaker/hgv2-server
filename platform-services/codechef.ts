import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export async function fetchCodeChefData(handle: string) {
  const baseUrl = 'https://www.codechef.com/users/';
  const url = `${baseUrl}${handle}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const document = parse(html);

    const name = document.querySelector('.h2-style')?.text.trim() || handle;
    const username = document.querySelector('.m-username--link')?.text.trim();

    if (!username) {
        return {
            message: 'User not found',
        };
    }

    const rating = document.querySelector('.rating-header .rating-number')?.text.trim() || '0';
    let maxRating = document.querySelector('.rating-header small')?.text.trim() || '0';

    maxRating = maxRating.replace(/[^\d]/g, '');

    const rankElements = document.querySelectorAll('.rating-ranks strong');
    const globalRank = rankElements.length > 0 ? rankElements[0].textContent.trim() || 'N/A' : 'N/A';
    const countryRank = rankElements.length > 1 ? rankElements[1].textContent.trim() || 'N/A' : 'N/A';

    return {
        name: name,
        username: username,
        rating: rating,
        maxRating: maxRating,
        globalRank: globalRank,
        countryRank: countryRank,
    };
  } catch (error) {
    console.error('Error fetching CodeChef data:', error);
    throw new Error('Failed to fetch CodeChef data.');
  }
}
