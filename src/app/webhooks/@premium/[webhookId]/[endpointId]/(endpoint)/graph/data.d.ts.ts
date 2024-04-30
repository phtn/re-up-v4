export interface MessageData {
  date: string;
  msgId: string;
  responseStatusCode: number;
}
export type AggregatedMessage = Record<string, MessageData[]>;
export interface EndpointActivity {
  date: string;
  messages: number;
}
declare const endpointActivity: EndpointActivity[];
export default endpointActivity;
