import { kea } from 'kea';
import routes from './routes';

export default kea({
  path: () => ['homepage'],
  actions: () => ({
    setScene: (scene, params) => ({ scene, params }),
  }),
  reducers: ({ actions, selectors }) => ({
    scene: [
      selectors.scene,
      {
        [actions.setScene]: (_, payload) => {
          console.log(scene);
          return payload.scene;
        },
      },
    ],
    params: [
      {},
      {
        [actions.setScene]: (_, payload) => payload.params || {},
      },
    ],
  }),
  urlToAction: ({ actions }) => {
    const mapping = {};
    for (const [paths, scene] of Object.entries(routes)) {
      for (const path of paths.split('|')) {
        mapping[path] = (params) => actions.setScene(scene, params);
      }
    }

    return mapping;
  },
});
