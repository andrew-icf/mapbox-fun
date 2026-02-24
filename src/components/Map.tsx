import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { getCustomDrawStyles } from './styles/mapboxStyles';

const token = '';

mapboxgl.accessToken = token;

const paragraphStyle: React.CSSProperties = {
    fontFamily: 'Open Sans',
    margin: 0,
    fontSize: 13,
    padding: 3
  };

const calculationBoxStyle: React.CSSProperties = {
    height: 200,
    width: 200,
    position: 'absolute',
    bottom: 300,
    left: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    textAlign: 'center'
}

interface MapProps {
  mapDrawings: (drawings: any) => void;
}

const Map = forwardRef((props: MapProps, ref ) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const [roundedArea, setRoundedArea] = useState<number>();
  const [lineColor, setLineColor] = useState('');
  const [fillColor, setFillColor] = useState('');

  // Use refs to track current color values without triggering re-renders
  const lineColorRef = useRef(lineColor);
  const fillColorRef = useRef(fillColor);

  // Update refs when colors change
  useEffect(() => {
    lineColorRef.current = lineColor;
  }, [lineColor]);

  useEffect(() => {
    fillColorRef.current = fillColor;
  }, [fillColor]);

  // Color Picker Input Line
  const handleLineColorChange = (event: any) => {
    setLineColor(event.target.value);
  };

  // Color Picker Input Fill
  const handleFillColorChange = (event: any) => {
    setFillColor(event.target.value);
  };

  // Store User drawings in localStorage
  function storeDrawings(data:any) {
    // Reset local storage
    if (!data?.features?.length) {
      localStorage.removeItem('user_drawings');
      return;
    } else {
        const geoDataString = JSON.stringify(data.features);
        localStorage.setItem('user_drawings', geoDataString);
    }
  }

  // Adding clear and delete functionality to the parent component
  useImperativeHandle(ref, () => ({
    clearAll: () => {
      if (draw.current) {
        draw.current.deleteAll();
        setRoundedArea(0);
      }
    },
    deleteDrawing: (drawingId: string) => {
      if (draw.current) {
        draw.current.delete(drawingId);
        
        // Recalculate area if there are remaining features
        const data = draw.current.getAll();
        if (data && data.features && data.features.length > 0) {
          const area = turf.area(data);
          setRoundedArea(Math.round(area * 100) / 100);
          props.mapDrawings(data.features);
        } else {
          // No features left
          setRoundedArea(0);
          props.mapDrawings([]);
        }
        storeDrawings(data);
      }
  }
  }));

  useEffect(() => {
    if (!mapContainer.current) return;

    // Map Initialization
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });

    // Draw Control Initialization
    draw.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            line_string: true,
            polygon: true,
            trash: true
          },
        userProperties: true,
        styles: getCustomDrawStyles(),
        defaultMode: 'draw_line_string'
    });

    map.current.addControl(draw.current);

    // Load saved drawings when map is ready
    map.current.on('load', () => {
        const savedDrawings = localStorage.getItem('user_drawings');
        if (savedDrawings) {
            const features = JSON.parse(savedDrawings);
            draw?.current?.set({
              type: 'FeatureCollection',
              features: features
            });
            
            // Calculate area for loaded polygons
            const data = draw.current?.getAll();
            if (data?.features && data.features.length > 0) {
                const area = turf.area(data);
                setRoundedArea(Math.round(area * 100) / 100);
                props.mapDrawings(data?.features);
            }
        } else {
            alert('Please Select a Color and add a line or a polygon');
        }
    });

    // Map Functionality
    map.current.on('draw.create', updateMap);
    map.current.on('draw.delete', updateMap);
    map.current.on('draw.update', updateMap);

    function updateMap(e:any) {
        const data = draw.current?.getAll();
        // Applying colors on new features
        if (e.type === 'draw.create' && e.features) {
          e.features.forEach((feature: any) => {
            draw.current?.setFeatureProperty(feature.id, 'lineColor', lineColorRef.current);
            draw.current?.setFeatureProperty(feature.id, 'fillColor', fillColorRef.current);
          });
        }

        if (data?.features && data?.features.length > 0) {
            const area = turf.area(data);
            setRoundedArea(Math.round(area * 100) / 100);
        } else {
            setRoundedArea(0);
            if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
        }
        // Send updated data to parent
        props.mapDrawings(data?.features);
        storeDrawings(data);
    }
    // Clean up
    return () => {
      map.current?.remove();
    };

}, []);

  return (
    <>
      <div ref={ mapContainer } id="map" style={{ height: '65%', width: '100%' }}></div>
      <div style={ calculationBoxStyle } >
        <p style={ paragraphStyle }>Click the map to draw a line or polygon.</p>
        <div id="calculated-area" style={ paragraphStyle }>
              <p style={ paragraphStyle }>
                <strong>{ roundedArea }</strong>
              </p>
              <p style={ paragraphStyle }>square meters</p>
          <div style={ paragraphStyle }>
            <label>
                Line Color:
                <input 
                  type="color" 
                  value={ lineColor } 
                  onChange={ handleLineColorChange } 
                  style={{ marginLeft: 5, cursor: 'pointer' }}
                />
            </label>
          </div>
          <div style={ paragraphStyle }>
            <label>
                Fill Color:
                <input 
                  type="color" 
                  value={ fillColor } 
                  onChange={ handleFillColorChange } 
                  style={{ marginLeft: 5, cursor: 'pointer' }}
                />
            </label>
          </div>
        </div>
      </div>
    </>
  );
});

export default Map;
