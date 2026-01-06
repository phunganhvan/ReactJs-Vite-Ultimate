import './style.css'
const VanComponent = () => {
    const VanInfo= {
        name: "Phung Anh Van",
        age: 22,
    }
  return (
    <>
      <div>
        Copyright by {VanInfo.name} - Age: {VanInfo.age}
      </div>
      <div className="child">
        Children
      </div>
    </>
  );
}

export default VanComponent;