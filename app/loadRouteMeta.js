import React from 'react';

export default function loadRouteMeta(branch, query, getState) {
  let metadata = null;
  const metaContext = {};
  const context = {};

  branch.some(({ route, match }) => {
    if (route.component) {
      if (route.component.loadContext) {
        Object.assign(context, (route.component.loadContext(getState, match, query) || {}));
        if (context.status >= 300 && context.status <= 500) { return null; }
      }
      if (route.component.loadMeta) {
        const headTags = route.component.loadMeta(getState, match, query, metaContext);
        console.log('headTags', headTags)
        if (headTags) {
          metadata = headTags;
        }
      }
    }
  });

  return [metadata, context];
}
