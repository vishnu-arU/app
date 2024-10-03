import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [premiums, setPremiums] = useState([]);
  const [sumInsuredOptions, setSumInsuredOptions] = useState([200000, 300000, 500000, 1000000]);
  const [zone, setZone] = useState("A");
  const [ageGroup, setAgeGroup] = useState("18-25");
  const [sumInsured, setSumInsured] = useState(sumInsuredOptions[0]);
  const [premium, setPremium] = useState(0);

  useEffect(() => {
    fetchPremiums();
  }, []);

  const fetchPremiums = async () => {
    const response = await axios.get("http://localhost:5000/admin/premiums");
    setPremiums(response.data);
  };

  const handleSavePremium = async () => {
    const newPremium = { zone, sumInsured, ageGroup, premium };
    await axios.post("http://localhost:5000/admin/premium", newPremium);
    fetchPremiums();
    alert("Premium saved!");
  };

  const addSumInsured = () => {
    const newSumInsured = parseInt(prompt("Enter new Sum Insured value:"));
    if (newSumInsured) {
      setSumInsuredOptions([...sumInsuredOptions, newSumInsured]);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <label>Zone:</label>
      <select value={zone} onChange={(e) => setZone(e.target.value)}>
        <option value="A">Zone A</option>
        <option value="B">Zone B</option>
        <option value="C">Zone C</option>
      </select>

      <label>Sum Insured:</label>
      <select value={sumInsured} onChange={(e) => setSumInsured(e.target.value)}>
        {sumInsuredOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={addSumInsured}>Add Sum Insured</button>

      <label>Age Group:</label>
      <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
        <option value="0-17">0-17</option>
        <option value="18-25">18-25</option>
        {/* Add all other age groups */}
      </select>

      <label>Premium:</label>
      <input
        type="number"
        value={premium}
        onChange={(e) => setPremium(parseFloat(e.target.value))}
      />

      <button onClick={handleSavePremium}>Save Premium</button>
    </div>
  );
};

export default AdminPanel;
