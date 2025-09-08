import { expect, it } from "@jest/globals";
import { InjectZendesk } from "./zendesk.inject";

it("InjectZendesk", () => expect(InjectZendesk()).toBeDefined());
