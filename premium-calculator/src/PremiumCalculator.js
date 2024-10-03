import React, { useState } from "react";

const PremiumCalculator = () => {
  const [age, setAge] = useState(25);
  const [zone, setZone] = useState("A");
  const [sumInsured, setSumInsured] = useState(200000);
  const [premium, setPremium] = useState(null);

  const premiums = JSON.parse(localStorage.getItem("premiums")) || {};

  const calculatePremium = () => {
    const ageGroup = getAgeGroup(age);
    const basePremium = premiums[zone]?.[sumInsured]?.[ageGroup] || 0;
    const finalPremium = basePremium + basePremium * 0.18; // Adding 18% GST
    setPremium(finalPremium);
  };

  const getAgeGroup = (age) => {
    if (age <= 17) return "0-17"; // Correct age group for 0-17
    if (age <= 25) return "18-25";
    if (age <= 30) return "26-30";
    if (age <= 35) return "31-35";
    if (age <= 40) return "36-40";
    if (age <= 45) return "41-45";
    if (age <= 50) return "46-50";
    if (age <= 55) return "51-55";
    if (age <= 60) return "56-60";
    if (age <= 65) return "61-65";
    if (age <= 70) return "66-70";
    if (age <= 75) return "71-75";
    return "75+";
  };

  return (
    <div>
      <h2>Premium Calculator</h2>

      <label>Zone:</label>
      <select value={zone} onChange={(e) => setZone(e.target.value)}>
        <option value="A">Zone A</option>
        <option value="B">Zone B</option>
        <option value="C">Zone C</option>
      </select>

      <label>Age:</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        min={0}
      />

      <label>Sum Insured:</label>
      <select value={sumInsured} onChange={(e) => setSumInsured(parseInt(e.target.value))}>
        <option value={200000}>2 Lakhs</option>
        <option value={300000}>3 Lakhs</option>
        <option value={500000}>5 Lakhs</option>
        <option value={1000000}>10 Lakhs</option>
      </select>

      <button onClick={calculatePremium}>Calculate Premium</button>

      {premium !== null && (
        <div>
          <h3>Final Premium: ₹{premium.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default PremiumCalculator;
