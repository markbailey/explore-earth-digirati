/// <reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}

// Support for MediaQueries
declare interface Event {
  matches: boolean;
}
