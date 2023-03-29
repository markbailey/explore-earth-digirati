import { createElement, Fragment, PropsWithChildren, ReactNode } from 'react';

const Hidden = <P extends {}>(props: PropsWithChildren<P>) =>
  createElement('div', { style: { display: 'none' } }, props.children);

// Show function
// Renders the component and/or children props if the when property is true,
// otherwise returns null.
// @param when - whether the component / children should be visible or not
// @param component - the component to render
// @param unmountOnHide - whether the component / children should be unmounted when hidden
function show(when: boolean, component: ReactNode, unmountOnHide: boolean = false) {
  if (!when) return !unmountOnHide ? createElement(Hidden, {}, component) : null;
  return createElement(Fragment, {}, component);
}

// Alias function for convenience
export const mount = (when: boolean, component: ReactNode) => show(when, component, true);
export default show;
