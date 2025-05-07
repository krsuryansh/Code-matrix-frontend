import React, { useState } from "react";
import './Chat.css';

const Chat = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="chat">
      <div className="card">
        <div className="card-header">
          Chat Header
          <span
            id="action_menu_btn"
            onClick={toggleMenu}
          >
            &#x22EE;
          </span>
          {showMenu && (
            <div className="action_menu">
              <ul>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
              </ul>
            </div>
          )}
        </div>

        <div className="msg_card_body">
          {/* Messages here */}
          <div className="msg_cotainer">
            Hello!
            <span className="msg_time">9:00 AM</span>
          </div>
          <div className="msg_cotainer_send">
            Hi there!
            <span className="msg_time_send">9:05 AM</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="input-group">
            <textarea className="type_msg" placeholder="Type your message..." />
            <span className="send_btn">
              <i className="fas fa-location-arrow"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
