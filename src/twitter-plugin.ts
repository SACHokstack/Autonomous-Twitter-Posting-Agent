// Twitter plugin for mention and reply handling
import { Action, Plugin } from '@elizaos/core';

// Placeholder for bootstrap plugin - assuming it's available or needs to be imported
const bootstrapPlugin: Plugin = {
  name: 'bootstrap',
  description: 'Bootstrap plugin for initialization',
  actions: [],
  providers: [],
  services: [],
};

// Placeholder for twitter plugin - assuming it's available or needs to be imported
const twitterPlugin: Plugin = {
  name: 'twitter',
  description: 'Twitter integration plugin',
  actions: [],
  providers: [],
  services: [],
};

// Function to summarize URL - placeholder implementation
async function summarizeUrl(url: string): Promise<string> {
  // Placeholder - implement actual summarization logic
  return `Summary of ${url}: This is a placeholder summary.`;
}

const mentionHandler = {
  name: "MentionBot",
  description: "Handles mentions with specific commands",
  plugins: [bootstrapPlugin, twitterPlugin],
  clients: ["twitter"],
  settings: {
    TWITTER_SEARCH_ENABLE: "true",
    TWITTER_AUTO_RESPOND_MENTIONS: "true"
  }
};

// Custom mention handler
const handleMentionAction: Action = {
  name: "HANDLE_MENTION",
  description: "Process mention commands",

  validate: async (_runtime, _message, _state) => true,

  handler: async (runtime, message, state, options, callback) => {
    const text = message.content?.text?.toLowerCase();
    if (!text) return { success: false };

    const twitterService = runtime.getService('twitter');

    // Command: @bot summarize [url]
    if (text.includes('summarize')) {
      const urlMatch = text.match(/https?:\/\/[^\s]+/);
      if (urlMatch && callback) {
        const summary = await summarizeUrl(urlMatch[0]);
        await callback({
          text: `Summary: ${summary}`,
        });
      }
    }

    // Command: @bot remind me [reminderMessage] in [time]
    else if (text.includes('remind me')) {
      const reminderMatch = text.match(/remind me (.+) in (\d+) (minutes?|hours?)/);
      if (reminderMatch && callback) {
        const [, reminderMessage, amountStr, unit] = reminderMatch;
        const amount = parseInt(amountStr);
        const delay = unit.startsWith('hour') ? amount * 60 * 60 * 1000 : amount * 60 * 1000;

        setTimeout(async () => {
          if (twitterService) {
            // Note: This assumes twitterService has a client with tweet method
            // You may need to adjust based on actual Twitter plugin API
            await (twitterService as any).client?.tweet(
              `@${(message as any).userName || 'user'} Reminder: ${reminderMessage}`,
              { reply: { in_reply_to_tweet_id: message.id } }
            );
          }
        }, delay);

        await callback({
          text: `I'll remind you in ${amount} ${unit}! ⏰`,
        });
      }
    }

    return { success: true };
  }
};

const replyBot = {
  name: "ReplyBot",
  description: "Responds to mentions and conversations",
  plugins: [bootstrapPlugin, twitterPlugin],
  clients: ["twitter"],
  settings: {
    TWITTER_POST_ENABLE: "false",  // Don't post autonomously
    TWITTER_SEARCH_ENABLE: "true",
    TWITTER_AUTO_RESPOND_MENTIONS: "true",
    TWITTER_AUTO_RESPOND_REPLIES: "true",
    TWITTER_POLL_INTERVAL: "60",  // Check every minute
    TWITTER_INTERACTION_INTERVAL_MIN: "5",
    TWITTER_INTERACTION_INTERVAL_MAX: "15"
  },
  responseExamples: [
    {
      input: "What do you think about AI?",
      output: "AI is a tool that amplifies human capability. The key is ensuring it serves humanity's best interests."
    },
    {
      input: "Can you help me with coding?",
      output: "I'd be happy to help! What specific coding challenge are you working on?"
    }
  ]
};

export { mentionHandler, replyBot, handleMentionAction };