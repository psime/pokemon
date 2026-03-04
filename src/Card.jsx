const Card = ({ children , backgroundColor }) => {
  return (
    <div style={{
      border: "2px solid #000",
      borderRadius: 18,
      padding: 12,
      paddingLeft:24,
      backgroundColor
    }}>
      {children}
    </div>
  );
};

export default Card;