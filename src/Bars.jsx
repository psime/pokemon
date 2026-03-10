const MAX_HP = 160;
const MAX_ATTACK = 134;
const BAR_MAX_WIDTH = 120;

const Bar = ({ label, value, max, color }) => {
  const barWidth = Math.round((value / max) * BAR_MAX_WIDTH);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
      <span style={{ width: 68, textAlign: "right", fontSize: "0.72rem", fontWeight: "bold", flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ width: barWidth, height: 8, backgroundColor: color, borderRadius: 4, flexShrink: 0, border: "2px solid #000" }} />
      <span style={{ fontSize: "0.7rem", fontWeight: "bold", flexShrink: 0 }}>{value}</span>
    </div>
  );
};

const Bars = ({ hp, attack }) => {
  return (
    <div style={{ width: "100%", marginTop: 6 }}>
      <Bar label="Hit Points" value={hp} max={MAX_HP} color="#0011ff" />
      <Bar label="Attack" value={attack} max={MAX_ATTACK} color="#ff0000" />
    </div>
  );
};

export default Bars;
