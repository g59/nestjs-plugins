import { describe, expect, it } from "@jest/globals";
import { IncomingWebhook } from "@slack/webhook";
import { getSlackClient } from "./../src/getSlackClient";

describe("getSlackClient", () => {
  const url = "SLACK_WEBHOOK_URL";

  it("returns slack client", () => {
    const slackClient = getSlackClient({ url });
    expect(slackClient).toBeInstanceOf(IncomingWebhook);
  });

  it("returns slack client with custom options", () => {
    const slackClient = getSlackClient({
      url,
      username: "test_user",
    });

    expect(slackClient).toBeInstanceOf(IncomingWebhook);
  });
});
