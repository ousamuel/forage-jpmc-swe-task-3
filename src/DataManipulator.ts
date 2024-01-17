import { ServerRespond } from "./DataStreamer";

export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  timestamp: Date;
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | undefined;
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    // console.log(serverResponds)
    const price_ABC =
      (serverResponds[0]["top_ask"]["price"] +
        serverResponds[0]["top_bid"]["price"]) /
      2;
    const price_DEF =
      (serverResponds[1]["top_ask"]["price"] +
        serverResponds[1]["top_bid"]["price"]) /
      2;
    // console.log(price_ABC)
    const ratio = price_ABC / price_DEF;
    const upper_bound = 1 + 0.04;
    const lower_bound = 1 - 0.04;

    return {
      price_abc: price_ABC,
      price_def: price_DEF,
      ratio,
      timestamp:
        serverResponds[0]["timestamp"] > serverResponds[1]["timestamp"]
          ? serverResponds[0]["timestamp"]
          : serverResponds[1]["timestamp"],
      upper_bound,
      lower_bound,
      trigger_alert: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined
    };
  }
}
