/**
 * Get zip code info.
 *
 * @param {string} zip Zip code.
 */
export default function(zip) {
    return fetch(
      `https://api.zippopotam.us/us/${zip}`,
      {
        method: 'GET',
      }
    );
}