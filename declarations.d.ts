interface NodeModule {
  hot: {
    accept(path: string, callback: () => void): void;
  }
}

declare const SERVER: boolean;

interface Window {
  __STATE__: any;
  __REDUX_DEVTOOLS_EXTENSION__(): any;
}

declare module 'microseconds' {
  export interface DateObject {
    microseconds: number;
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  }

  export function now(): number;
  export function parse(timeStamp: number): DateObject;
  export function since(timeStamp: number): number;
}

declare module 'koa-helmet' {
  import { Middleware } from 'koa';

  export default function(): Middleware;
}

declare module '*.svg' {
  const _: string;
  export default _;
}

declare module '*.gql' {
  import {DocumentNode} from 'graphql';
  const _: DocumentNode;
  export default _;
}

declare module 'boxen' {
  export interface BoxenOptions {
    padding?: number;
    borderColor?: string;
    margin?: number;
  }

  export default function(message: string, options: BoxenOptions): string;
}

declare module 'koa-send' {
  import * as Koa from 'koa';

  interface ISendOptions {
      root?: string;
      index?: string;
      maxAge?: number;
      hidden?: boolean;
      format?: boolean;
      gzip?: boolean;
      immutable?: boolean;
      setHeaders?: Function;
      extensions?: string[];
  }

  function send(ctx: Koa.Context, path: string, opts?: ISendOptions): Promise<string>;

  namespace send {}

  export = send;
}
