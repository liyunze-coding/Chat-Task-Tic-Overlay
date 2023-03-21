const auth = (function () {
	// Authentication and channels - required
	const channel = "YOUR_CHANNEL_HERE"; // your channel
	const username = "YOUR_BOT_ACCOUNT_HERE"; // bot account
	const oauth = "OAUTH HERE"; // should be xxxxxxxxxxxx from the bot account, do NOT include the 'oauth:' part

	return {
		channel,
		username,
		oauth,
	};
})();
