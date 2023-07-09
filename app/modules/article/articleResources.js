import ReactResource from 'react-resource';

export const Article = new ReactResource(
  '/api/articles/{:articleSlug}',
  { articleSlug: ':articleSlug' },
);
