const express = require('express');
const axios = require('axios');

const app = express();

// List of usernames
let usernames = ['@haee.uhh', '@fzo3xxx', '@marjileee', '@_q.q1ngg___', '@some1udk1', '@user22630397471362', '@mimiyuh.9', '@anonaumss', '@zygaile', '@aeryca.n','@.hhera', '@minniyuji', '@fiona.szee8', '@1035551060_', '@kyotipi3', '@maebrillantes0110', '@samouricasspam', '@zygaile', '@w33stcoast', '@heyyyitsanne', '@obrihart', '@itsladymhillen', '@dkssudgktpdy777777', '@cmaicakes', '@jeilalou', '@eigh232', '@msg._denden', '@liannayuu', '@m_mmm20_', '@softiemyra7', '@msjuliannamarie', '@pauferrarenn', '@huh__o6', '@yell0wwwe.3', '@yogurtplssss', '@your_dxsy', '@reikololl1', '@karesedano', '@haanie__f'];


function getRandomUsername() {
  if (usernames.length === 0) {
    usernames = ['@haee.uhh', '@fzo3xxx', '@marjileee', '@_q.q1ngg___', '@some1udk1', '@user22630397471362', '@mimiyuh.9', '@anonaumss', '@zygaile', '@aeryca.n','@.hhera', '@minniyuji', '@fiona.szee8', '@1035551060_', '@kyotipi3', '@maebrillantes0110', '@samouricasspam', '@zygaile', '@w33stcoast', '@heyyyitsanne', '@obrihart', '@itsladymhillen', '@dkssudgktpdy777777', '@cmaicakes', '@jeilalou', '@eigh232', '@msg._denden', '@liannayuu', '@m_mmm20_', '@softiemyra7', '@msjuliannamarie', '@pauferrarenn', '@huh__o6', '@yell0wwwe.3', '@yogurtplssss', '@your_dxsy', '@reikololl1', '@karesedano', '@haanie__f']; 
  }
  const index = Math.floor(Math.random() * usernames.length);
  const username = usernames[index];
  usernames.splice(index, 1); 
  return username;
}

async function fetchDataWithRetry(username, retries = 2) {
  try {
    const options = {
      method: 'POST',
      url: 'https://tiktok-unauthorized-api-scraper-no-watermark-analytics-feed.p.rapidapi.com/api/search_full',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
        'X-RapidAPI-Host': 'tiktok-unauthorized-api-scraper-no-watermark-analytics-feed.p.rapidapi.com'
      },
      data: {
        username: `@${username}`,
        amount_of_posts: 5
      }
    };

    const response = await axios.request(options);
    const posts = response.data.posts.map(post => post.play_links);

    return posts;
  } catch (error) {
    console.error(error);
    if (retries > 0) {
      console.log(`Retrying... (${retries} retries left)`);
      return fetchDataWithRetry(username, retries - 1);
    } else {
      throw new Error('Max retries exceeded');
    }
  }
}
app.get('/', (req, res) => {
  res.send('shoti api');
});
app.get('/kshitiz', async (req, res) => {
  try {
    const username = getRandomUsername();


    let posts = await fetchDataWithRetry(username);
    if (!posts || posts.every(post => post.length === 0)) {
      posts = await fetchDataWithRetry(username);
    }


    const responseData = {
      user: username,
      posts: posts
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(5).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
