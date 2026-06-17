export const SUPPORTED_MODELS = [
  {
    provider: "Anthropic",
    model: "Claude Sonnet 4",
    key: "anthropic:claude-sonnet-4"
  },
  {
    provider: "Google",
    model: "Gemini 2.5 Pro",
    key: "google:gemini-2.5-pro"
  },
  {
    provider: "OpenAI",
    model: "GPT-4.1",
    key: "openai:gpt-4.1"
  }
];

export const SUPPORTED_INTEGRATIONS = ["github", "jira"];

export function createVoiceChatState() {
  const connectedIntegrations = new Set();
  let selectedModel = SUPPORTED_MODELS[0].key;

  return {
    getSelectedModel() {
      return selectedModel;
    },
    selectModel(modelKey) {
      const exists = SUPPORTED_MODELS.some((entry) => entry.key === modelKey);
      if (!exists) {
        throw new Error(`Unsupported model: ${modelKey}`);
      }
      selectedModel = modelKey;
    },
    connect(integration) {
      if (!SUPPORTED_INTEGRATIONS.includes(integration)) {
        throw new Error(`Unsupported integration: ${integration}`);
      }
      connectedIntegrations.add(integration);
    },
    disconnect(integration) {
      connectedIntegrations.delete(integration);
    },
    isConnected(integration) {
      return connectedIntegrations.has(integration);
    },
    listConnections() {
      return Array.from(connectedIntegrations.values()).sort();
    }
  };
}
