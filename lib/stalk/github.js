require('../../config')
const axios = require('axios');
const cheerio = require('cheerio');

function github_stalk(username) {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${username}`)
    .then(async({ data }) => {
      const { login, id, node_id, avatar_url, gravatar_id, url, html_url, followers_url, following_url, gists_url, starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, type, site_admin, name, company, blog, location, email, hireable, bio, twitter_username, public_repos, public_gists, followers, following, created_at, updated_at, } = data;
      let hasil = {
        user: {
          login: login,
          id: id,
          node_id: node_id,
          avatar_url: avatar_url,
          gravatar_id: gravatar_id,
          url: url,
          html_url: html_url,
          followers_url: followers_url,
          following_url: following_url,
          gists_url: gists_url,
          starred_url: starred_url,
          subscriptions_url: subscriptions_url,
          organizations_url: organizations_url,
          repos_url: repos_url,
          events_url: events_url,
          received_events_url: received_events_url,
          type: type,
          site_admin: site_admin,
          name: name,
          company: company,
          blog: blog,
          location: location,
          email: email,
          hireable: hireable,
          bio: bio,
          twitter_username: twitter_username,
          public_repos: public_repos,
          public_gists: public_gists,
          followers: followers,
          following: following,
          created_at: created_at,
          updated_at: updated_at
        }
      }
      let repos = await axios.get(repos_url);
      if (!repos.data) {
        hasil.repos = []
      }
      hasil.repos = repos.data
      resolve(xoriznn(hasil))
    })
  })
  
}

module.exports.github_stalk = github_stalk