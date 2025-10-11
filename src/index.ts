import { logger, type IAgentRuntime, type Project, type ProjectAgent } from '@elizaos/core';
import starterPlugin from './plugin';
import { character, simpleTwitterBot, replyBot, fullEngagementBot } from './character';

const initCharacter = ({ runtime }: { runtime: IAgentRuntime }) => {
  logger.info('Initializing character');
  logger.info({ name: character.name }, 'Name:');
};

const initSimpleTwitterBot = ({ runtime }: { runtime: IAgentRuntime }) => {
  logger.info('Initializing Simple Twitter Bot');
  logger.info({ name: simpleTwitterBot.name }, 'Name:');
};

const initReplyBot = ({ runtime }: { runtime: IAgentRuntime }) => {
  logger.info('Initializing Reply Bot');
  logger.info({ name: replyBot.name }, 'Name:');
};

const initFullEngagementBot = ({ runtime }: { runtime: IAgentRuntime }) => {
  logger.info('Initializing Full Engagement Bot');
  logger.info({ name: fullEngagementBot.name }, 'Name:');
};

export const projectAgent: ProjectAgent = {
  character,
  init: async (runtime: IAgentRuntime) => await initCharacter({ runtime }),
  plugins: [starterPlugin], // <-- Import custom plugins here
};

export const simpleTwitterAgent: ProjectAgent = {
  character: simpleTwitterBot,
  init: async (runtime: IAgentRuntime) => await initSimpleTwitterBot({ runtime }),
  plugins: [starterPlugin],
};

export const replyAgent: ProjectAgent = {
  character: replyBot,
  init: async (runtime: IAgentRuntime) => await initReplyBot({ runtime }),
  plugins: [starterPlugin],
};

export const fullEngagementAgent: ProjectAgent = {
  character: fullEngagementBot,
  init: async (runtime: IAgentRuntime) => await initFullEngagementBot({ runtime }),
  plugins: [starterPlugin],
};

const project: Project = {
  agents: [projectAgent, simpleTwitterAgent, replyAgent, fullEngagementAgent],
};

export { character } from './character';

export default project;
