import axios from 'axios';

const clientId = 'a984709e653c41bc8fcb84ac6de80607';
const clientSecret = 'fa78f30d639b4ad9aac0f9184bd30224';

async function getSpotifyToken() {
  const tokenResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: 'grant_type=client_credentials',
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      }
  });
  return tokenResponse.data.access_token;
}

export async function getShowInfo(showId: string) {
  const token = await getSpotifyToken();

  const showResponse = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/shows/${showId}`,
      headers: {
      'Authorization': `Bearer ${token}`
      }
  });

  return showResponse.data;
}

export async function getTrackInfo(id: string) {
  const token = await getSpotifyToken();

  const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/tracks/${id}`,
      headers: {
      'Authorization': `Bearer ${token}`
      }
  });

  return response.data;
}

// 今回は、showで別のURLでも取れるように分離
// https://open.spotify.com/show/6BSPw7yLnXxb2jFuuCyXpb ←ここ
// const showId = '6BSPw7yLnXxb2jFuuCyXpb'; // SpotifyのShowのID
// getShowInfo(showId).then(showInfo => {
//   console.log(showInfo);
// });