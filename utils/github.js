module.exports = function (client) {
	const app = client.express()
	app.use(client.bodyParser.json())
	app.use(client.github);
	// app.use(client.express.urlencoded({ extended: true }))

	client.github.on('*', function (event, repo, data) { // push, workflow_run, check_run, workflow_job, etc... // I have to check more events to filter them
		// for (var i; i < client.config.github.events.length; i++) {
		// 	if (client.config.github.events[i] === event) {
		client.log.console(`[Github] | ${event} event has been triggered`);

		switch (event) {
			case 'push':
				client.twitter.tweet(client, `New Commit On ${data.repository.name}\n\nPusher: ${data.pusher.name}\nCommit Message: ${data.head_commit.message}\nCheck Commit: ${data.head_commit.url}`).then(data => {
					client.log.success('[Github] | Tweeted new commit\nCheck Tweet: ' + `https://twitter.com/${data.me.username}/status/${data.data.id}`);
				}).catch(error => {
					client.log.error('[Github] | Error Tweeting new commit\nError Message: ' + error?.message);
				});
				break;
			case 'public':
				client.twitter.tweet(client, `The Repository ${data.repository.name} is now open sourced!\n\nCheck Repository: ${data.repository.html_url}`).then(data => {
					client.log.success('[Github] | Tweeted open sourced repository\nCheck Tweet: ' + `https://twitter.com/${data.me.username}/status/${data.data.id}`);
				}).catch(error => {
					client.log.error('[Github] | Error Tweeting open sourced repository\nError Message: ' + error?.message);
				});
				break;
			case 'star':
				client.twitter.tweet(client, `New Star Added To ${data.repository.name}\n\nThank you ${data.sender.login} for the star!`).then(data => {
					client.log.success('[Github] | Tweeted new star\nCheck Tweet: ' + `https://twitter.com/${data.me.username}/status/${data.data.id}`);
				}).catch(error => {
					client.log.error('[Github] | Error Tweeting new star\nError Message: ' + error?.message);
				});
				break;
			case 'fork':
				client.twitter.tweet(client, `New Fork On ${data.repository.name}\n\nThank you ${data.sender.login} for the fork!`).then(data => {
					client.log.success('[Github] | Tweeted new fork\nCheck Tweet: ' + `https://twitter.com/${data.me.username}/status/${data.data.id}`);
				}).catch(error => {
					client.log.error('[Github] | Error Tweeting new fork\nError Message: ' + error?.message);
				});
				break;
			default:

				break;
		}
		// 	}
		// }
	});

	app.listen(client.config.github.webhook_port, () => {
		console.log(`[Github] | Github Webhook is listening on port ${client.config.github.webhook_port}`);
	});
};

/*
[Github] | push event has been triggered
green-commits
--------------------------------------------------------------------------------
{
  ref: 'refs/heads/main',
  before: 'cfcbb0e400a50107eb04b0d9bbb8a9779f9d5de2',
  after: 'd60e05e730a41fd00183faa5a28dfe67cdc4a489',
  repository: {
	id: 450922638,
	node_id: 'R_kgDOGuCIjg',
	name: 'green-commits',
	full_name: 'IMXNOOBX/green-commits',
	private: false,
	owner: {
	  name: 'IMXNOOBX',
	  email: '69653071+IMXNOOBX@users.noreply.github.com',
	  login: 'IMXNOOBX',
	  id: 69653071,
	  node_id: 'MDQ6VXNlcjY5NjUzMDcx',
	  avatar_url: 'https://avatars.githubusercontent.com/u/69653071?v=4',
	  gravatar_id: '',
	  url: 'https://api.github.com/users/IMXNOOBX',
	  html_url: 'https://github.com/IMXNOOBX',
	  followers_url: 'https://api.github.com/users/IMXNOOBX/followers',
	  following_url: 'https://api.github.com/users/IMXNOOBX/following{/other_user}',
	  gists_url: 'https://api.github.com/users/IMXNOOBX/gists{/gist_id}',
	  starred_url: 'https://api.github.com/users/IMXNOOBX/starred{/owner}{/repo}',
	  subscriptions_url: 'https://api.github.com/users/IMXNOOBX/subscriptions',
	  organizations_url: 'https://api.github.com/users/IMXNOOBX/orgs',
	  repos_url: 'https://api.github.com/users/IMXNOOBX/repos',
	  events_url: 'https://api.github.com/users/IMXNOOBX/events{/privacy}',
	  received_events_url: 'https://api.github.com/users/IMXNOOBX/received_events',
	  type: 'User',
	  site_admin: false
	},
	html_url: 'https://github.com/IMXNOOBX/green-commits',
	description: 'Automatically keep GitHub commit status green.',
	fork: false,
	url: 'https://github.com/IMXNOOBX/green-commits',
	forks_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/forks',
	keys_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/keys{/key_id}',
	collaborators_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/collaborators{/collaborator}',
	teams_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/teams',
	hooks_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/hooks',
	issue_events_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/issues/events{/number}',
	events_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/events',
	assignees_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/assignees{/user}',
	branches_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/branches{/branch}',
	tags_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/tags',
	blobs_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/git/blobs{/sha}',
	git_tags_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/git/tags{/sha}',
	git_refs_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/git/refs{/sha}',
	trees_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/git/trees{/sha}',
	statuses_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/statuses/{sha}',
	languages_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/languages',
	stargazers_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/stargazers',
	contributors_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/contributors',
	subscribers_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/subscribers',
	subscription_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/subscription',
	commits_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/commits{/sha}',
	git_commits_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/git/commits{/sha}',
	comments_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/comments{/number}',
	issue_comment_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/issues/comments{/number}',
	contents_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/contents/{+path}',
	compare_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/compare/{base}...{head}',
	merges_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/merges',
	archive_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/{archive_format}{/ref}',
	downloads_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/downloads',
	issues_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/issues{/number}',
	pulls_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/pulls{/number}',
	milestones_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/milestones{/number}',
	notifications_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/notifications{?since,all,participating}',
	labels_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/labels{/name}',
	releases_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/releases{/id}',
	deployments_url: 'https://api.github.com/repos/IMXNOOBX/green-commits/deployments',
	created_at: 1642881680,
	updated_at: '2022-01-24T07:13:35Z',
	pushed_at: 1654510157,
	git_url: 'git://github.com/IMXNOOBX/green-commits.git',
	ssh_url: 'git@github.com:IMXNOOBX/green-commits.git',
	clone_url: 'https://github.com/IMXNOOBX/green-commits.git',
	svn_url: 'https://github.com/IMXNOOBX/green-commits',
	homepage: '',
	size: 31,
	stargazers_count: 0,
	watchers_count: 0,
	language: null,
	has_issues: true,
	has_projects: true,
	has_downloads: true,
	has_wiki: true,
	has_pages: false,
	forks_count: 1,
	mirror_url: null,
	archived: false,
	disabled: false,
	open_issues_count: 0,
	license: {
	  key: 'mit',
	  name: 'MIT License',
	  spdx_id: 'MIT',
	  url: 'https://api.github.com/licenses/mit',
	  node_id: 'MDc6TGljZW5zZTEz'
	},
	allow_forking: true,
	is_template: true,
	topics: [ 'autocommit', 'commit', 'github', 'green', 'green-status' ],
	visibility: 'public',
	forks: 1,
	open_issues: 0,
	watchers: 0,
	default_branch: 'main',
	stargazers: 0,
	master_branch: 'main'
  },
  pusher: {
	name: 'IMXNOOBX',
	email: '69653071+IMXNOOBX@users.noreply.github.com'
  },
  sender: {
	login: 'IMXNOOBX',
	id: 69653071,
	node_id: 'MDQ6VXNlcjY5NjUzMDcx',
	avatar_url: 'https://avatars.githubusercontent.com/u/69653071?v=4',
	gravatar_id: '',
	url: 'https://api.github.com/users/IMXNOOBX',
	html_url: 'https://github.com/IMXNOOBX',
	followers_url: 'https://api.github.com/users/IMXNOOBX/followers',
	following_url: 'https://api.github.com/users/IMXNOOBX/following{/other_user}',
	gists_url: 'https://api.github.com/users/IMXNOOBX/gists{/gist_id}',
	starred_url: 'https://api.github.com/users/IMXNOOBX/starred{/owner}{/repo}',
	subscriptions_url: 'https://api.github.com/users/IMXNOOBX/subscriptions',
	organizations_url: 'https://api.github.com/users/IMXNOOBX/orgs',
	repos_url: 'https://api.github.com/users/IMXNOOBX/repos',
	events_url: 'https://api.github.com/users/IMXNOOBX/events{/privacy}',
	received_events_url: 'https://api.github.com/users/IMXNOOBX/received_events',
	type: 'User',
	site_admin: false
  },
  created: false,
  deleted: false,
  forced: false,
  base_ref: null,
  compare: 'https://github.com/IMXNOOBX/green-commits/compare/cfcbb0e400a5...d60e05e730a4',
  commits: [
	{
	  id: 'd60e05e730a41fd00183faa5a28dfe67cdc4a489',
	  tree_id: 'c9a32177da0459a4d222970d61d7ecbbc0a8c20a',
	  distinct: true,
	  message: 'Update LICENSE',
	  timestamp: '2022-06-06T12:09:17+02:00',
	  url: 'https://github.com/IMXNOOBX/green-commits/commit/d60e05e730a41fd00183faa5a28dfe67cdc4a489',
	  author: [Object],
	  committer: [Object],
	  added: [],
	  removed: [],
	  modified: [Array]
	}
  ],
  head_commit: {
	id: 'd60e05e730a41fd00183faa5a28dfe67cdc4a489',
	tree_id: 'c9a32177da0459a4d222970d61d7ecbbc0a8c20a',
	distinct: true,
	message: 'Update LICENSE',
	timestamp: '2022-06-06T12:09:17+02:00',
	url: 'https://github.com/IMXNOOBX/green-commits/commit/d60e05e730a41fd00183faa5a28dfe67cdc4a489',
	author: {
	  name: 'жnoobж#6228',
	  email: '69653071+IMXNOOBX@users.noreply.github.com',
	  username: 'IMXNOOBX'
	},
	committer: {
	  name: 'GitHub',
	  email: 'noreply@github.com',
	  username: 'web-flow'
	},
	added: [],
	removed: [],
	modified: [ 'LICENSE' ]
  }
}
*/