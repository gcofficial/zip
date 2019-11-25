/**
 * Get zip code info.
 *
 * @param {string} zip Zip code.
 */
export default function(zip) {
    return fetch(
      `http://api.zippopotam.us/us/${zip}`,
      {
        method: 'GET',
      }
    );
}