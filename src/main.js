import {
  SUPPORTED_MODELS,
  SUPPORTED_INTEGRATIONS,
  createVoiceChatState
} from "./app.js";

const state = createVoiceChatState();

const modelSelect = document.querySelector("#model-select");
const statusText = document.querySelector("#status");

for (const model of SUPPORTED_MODELS) {
  const option = document.createElement("option");
  option.value = model.key;
  option.textContent = `${model.provider} — ${model.model}`;
  modelSelect.append(option);
}

modelSelect.value = state.getSelectedModel();

modelSelect.addEventListener("change", () => {
  state.selectModel(modelSelect.value);
  renderStatus();
});

for (const integration of SUPPORTED_INTEGRATIONS) {
  const button = document.querySelector(`[data-connect='${integration}']`);
  button.addEventListener("click", () => {
    if (state.isConnected(integration)) {
      state.disconnect(integration);
    } else {
      state.connect(integration);
    }
    renderStatus();
  });
}

function renderStatus() {
  const active = state.listConnections();
  const integrationsLabel = active.length ? active.join(", ") : "none";

  statusText.textContent = `Active model: ${state.getSelectedModel()} | Connected: ${integrationsLabel}`;

  for (const integration of SUPPORTED_INTEGRATIONS) {
    const button = document.querySelector(`[data-connect='${integration}']`);
    button.textContent = state.isConnected(integration)
      ? `Disconnect ${capitalize(integration)}`
      : `Connect ${capitalize(integration)}`;
  }
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

renderStatus();
