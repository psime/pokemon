import { getBarTrackColor, barRadius } from "./utils.js";

const MAX_HP = 160;
const MAX_ATTACK = 134;
const BAR_MAX_WIDTH = 120;

const Bar = ({ label, value, max, color, trackColor }) => {
  const fillWidth = Math.round((value / max) * BAR_MAX_WIDTH);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
      <span style={{ width: 52, textAlign: "right", fontSize: "0.68rem", fontWeight: 500, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ width: 24, textAlign: "right", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0 }}>{value}</span>
      <div style={{ width: BAR_MAX_WIDTH, height: 8, backgroundColor: trackColor, borderTopRightRadius: barRadius, borderBottomRightRadius: barRadius, flexShrink: 0, overflow: "hidden" }}>
        <div style={{ width: fillWidth, height: "100%", backgroundColor: color, borderTopRightRadius: barRadius, borderBottomRightRadius: barRadius }} />
      </div>
    </div>
  );
};

const Bars = ({ hp, attack, type, isDark }) => {
  const trackColor = getBarTrackColor(type, isDark);
  return (
    <div style={{ width: "100%", marginTop: 6 }}>
      <Bar label="Hit Points" value={hp} max={MAX_HP} color="#0011ff" trackColor={trackColor} />
      <Bar label="Attack" value={attack} max={MAX_ATTACK} color="#ff0000" trackColor={trackColor} />
    </div>
  );
};

export default Bars;
