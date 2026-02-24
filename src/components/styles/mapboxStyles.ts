// styles/mapboxDrawStyles.ts
export const getCustomDrawStyles = () => [
    {
      'id': 'gl-draw-line',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': ['coalesce', ['get', 'user_lineColor'], '#000000'],
        'line-width': 4
      }
    },
    {
      'id': 'gl-draw-polygon-fill',
      'type': 'fill',
      'filter': ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      'paint': {
        'fill-color': ['coalesce', ['get', 'user_fillColor'], '#000000'],
        'fill-opacity': 0.3
      }
    },
    {
      'id': 'gl-draw-polygon-stroke',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': ['coalesce', ['get', 'user_lineColor'], '#000000'],
        'line-width': 4
      }
    },
    {
      'id': 'gl-draw-polygon-and-line-vertex-active',
      'type': 'circle',
      'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point']],
      'paint': {
        'circle-radius': 5,
        'circle-color': '#FFF',
        'circle-stroke-color': '#000000',
        'circle-stroke-width': 2
      }
    }
  ];