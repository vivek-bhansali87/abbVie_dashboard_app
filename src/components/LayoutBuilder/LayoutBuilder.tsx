import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveLayout } from "@/lib/redux/layoutSlice";
import KPIArrangement from "./KPIArrangement";
import ChartTypeSelector from "./ChartTypeSelector";

export default function LayoutBuilder() {
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.layout);
  const [name, setName] = useState("");

  const handleSave = () => {
    dispatch(saveLayout({ name, content: layout }));
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Layout Name"
      />
      <KPIArrangement kpis={layout.kpis} />
      <ChartTypeSelector />
      <button onClick={handleSave}>Save Layout</button>
    </div>
  );
}
