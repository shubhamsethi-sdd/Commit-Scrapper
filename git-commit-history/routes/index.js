var express = require('express');
var router = express.Router();

var axios = require('axios')



/* GET Commit History */
router.get('/page/:id', function (req, res, next) {



  var options = {
    user: 'smartcoder23',
    repo: 'nodejs-socialshare',
    branch: 'master',
  };

 
  const getCommits = async () => {
    var url = 'https://api.github.com' + '/repos/' + options.user + '/' + options.repo + '/commits' 

    try {
      return await axios.get(url, {
        headers: {
          'user-agent': 'node.js'
        },
        params:{
          page:req.params.id,
          per_page:10
        }
      })
    } catch (error) {
     
        return res.send({ status: 402, message:'API Rate Limit Exceeded'})
    }
  }


  const Commits = async () => {
    var Commits = await getCommits()
    if (Commits) {
      return res.send({ status: 200, CommitData: Commits.data })
    }

  }

  Commits()
});
module.exports = router;
