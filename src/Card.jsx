const Card = ({ children, backgroundColor }) => {
  return (
    <div style={{
      border: "2px solid #000",
      borderRadius: 10,
      borderTopRightRadius: 120,
      boxSizing: "border-box",
      height: "100%",
      padding: "12px 16px",
      backgroundColor,
      boxShadow: "0 2px 12px rgba(0,0,0,10.95)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "visible",
    }}>
      {children}
    </div>
  );
};

export default Card;