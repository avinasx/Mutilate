import test from "node:test";
import assert from "node:assert/strict";

import {
  SUPPORTED_MODELS,
  createVoiceChatState
} from "../src/app.js";

test("state defaults to first supported model", () => {
  const state = createVoiceChatState();
  assert.equal(state.getSelectedModel(), SUPPORTED_MODELS[0].key);
});

test("state supports selecting another model", () => {
  const state = createVoiceChatState();
  const next = SUPPORTED_MODELS[1].key;

  state.selectModel(next);

  assert.equal(state.getSelectedModel(), next);
});

test("state tracks github and jira connections", () => {
  const state = createVoiceChatState();

  state.connect("github");
  state.connect("jira");

  assert.deepEqual(state.listConnections(), ["github", "jira"]);
  assert.equal(state.isConnected("github"), true);
  assert.equal(state.isConnected("jira"), true);

  state.disconnect("github");

  assert.equal(state.isConnected("github"), false);
  assert.deepEqual(state.listConnections(), ["jira"]);
});

test("state rejects unsupported models and integrations", () => {
  const state = createVoiceChatState();

  assert.throws(() => state.selectModel("unknown:model"), /Unsupported model/);
  assert.throws(() => state.connect("slack"), /Unsupported integration/);
});
