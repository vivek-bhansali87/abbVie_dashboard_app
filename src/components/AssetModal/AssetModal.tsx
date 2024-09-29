import { useState } from "react";
import { useDispatch } from "react-redux";
import { addKPIToLayout } from "@/lib/redux/layoutSlice";
import VisualizationPreview from "./VisualizationPreview";
import BusinessQuestions from "./BusinessQuestions";

export default function AssetModal({ kpi, onClose }) {
  const dispatch = useDispatch();
  const [selectedVisualization, setSelectedVisualization] = useState(
    kpi.visualizations[0]
  );

  const handleAddToLayout = () => {
    dispatch(addKPIToLayout({ kpi, visualization: selectedVisualization }));
    onClose();
  };

  return (
    <div className="modal">
      <h2>{kpi.name}</h2>
      <p>{kpi.description}</p>
      <VisualizationPreview
        visualizations={kpi.visualizations}
        onSelect={setSelectedVisualization}
      />
      <BusinessQuestions questions={kpi.businessQuestions} />
      <button onClick={handleAddToLayout}>Add to Layout</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
