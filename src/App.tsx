import { useState, useRef } from 'react'
import Map from '../src/components/Map'
import './App.css'

const drawingCardStyle = { 
  padding: 10, 
  marginBottom: 10, 
  backgroundColor: '#f5f5f5',
  borderRadius: 4 
}

function App() {
  const mapRef = useRef<any>(null);
  // Initialized with Stored Data
  const [drawData, setDrawData] = useState<any[]>(() => {
    const savedDrawings = localStorage.getItem('user_drawings');
    if ( savedDrawings ) {
      return JSON.parse(savedDrawings);
    } else {
      return [];
    }
  });

  // Map Drawing Data being passed by child map component, debug here from what is coming in
  const handleDataChange = (mapDrawings:any) => {
    setDrawData(mapDrawings);
  }

  const deleteDrawing = (drawing_ID:string) => {
      // Call the map's deleteDrawing method 
    if (mapRef.current?.deleteDrawing) {
      mapRef.current.deleteDrawing(drawing_ID);
    }
    // Update State
    const updatedDrawings = drawData.filter(drawing => drawing.id !== drawing_ID)
    setDrawData(updatedDrawings);
    // Update Local Storage
    localStorage.setItem('user_drawings', JSON.stringify(updatedDrawings));
  }

  const handleClearList = () => {
    // Call the map's clearAll method
    if (mapRef.current?.clearAll) {
      mapRef.current.clearAll();
    }
    // Clear state and localStorage
    setDrawData([]);
    localStorage.removeItem('user_drawings');
  }

  return (
    <>
      <Map ref={ mapRef } mapDrawings={ handleDataChange }/>
      
      <div style={{ padding: 20 }}>
        <button onClick={ handleClearList }>Clear Drawing List</button>
        <h3>Drawings List ({ drawData.length })</h3>
        { drawData.length === 0 ? (
          <p>No drawings yet, please select your color and drawing control</p>
        ) : (
          drawData.map((drawing, index) => (
            <div key={drawing.id || index} style={ drawingCardStyle }>
              <p><strong>Drawing #{ index + 1 }</strong></p>
              <p>Type: { drawing.geometry?.type }</p>
              <p>ID: { drawing.id }</p>
              <button onClick={ () => deleteDrawing(drawing.id) }>Delete</button>
            </div>
          ))
        ) }
      </div>
    </>
  )
}

export default App
