
import "./Popup.css"

const PopUp = ({ onClose, children }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="PopUp" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default PopUp;
