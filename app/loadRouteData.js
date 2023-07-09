export default function loadRouteData(branch, query, dispatch) {
  const promises = branch.map(({ route, match }) => (route.component && route.component.loadData
    ? route.component.loadData(dispatch, match, query)
    : Promise.resolve(null)));

  return Promise.all(promises);
}
