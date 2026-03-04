const Card = ({ children }) => {
  return (
    <div 
      style={{
        border: "2px solid #000",
        background: 'lightblue',
        borderRadius: 18,
        padding: 16,
        marginTop: 20,
        marginLeft: 200,
        marginRight: 200,
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
};

export default Card;