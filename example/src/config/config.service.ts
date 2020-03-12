import { Injectable } from "@nestjs/common";
import { SlackOptions } from "nestjs-slack";

@Injectable()
export class ConfigService {
  public getSlackConfig(): SlackOptions {
    const url = "SLACK_WEBHOOK_URL";
    return {
      url
    };
  }
}
