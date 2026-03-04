const Card = ({ children , backgroundColor }) => {
  return (
    <div style={{
      border: "2px solid #000",
      borderRadius: 10,
      borderTopRightRadius:120,
    //   borderTopLeftRadius: 36,
      padding: 38,
      paddingLeft:62,
      paddingRight:62,
      paddingBottom:22,
      backgroundColor,
      boxShadow: "0 0 14px rgba(0,0,0,0.5)"
      //  boxShadow: "6px 6px 12px rgba(0,0,0,0.6)"
      //   boxShadow: "4px 4px 8px rgba(0,0,0,0.7), 0 0 12px rgba(255,100,0,0.3)"
    //   boxShadow: "8px 8px 16px rgba(0,0,0,1.4)"
 
 }}>
      {children}
    </div>
  );
};

export default Card;