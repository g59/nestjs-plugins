import assert from "node:assert/strict";
import { it } from "node:test";
import { InjectZendesk } from "./zendesk.inject";

it("InjectZendesk", () => assert.ok(InjectZendesk()));
