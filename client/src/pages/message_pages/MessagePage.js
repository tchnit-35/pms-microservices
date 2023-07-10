import React, { useEffect, useState } from "react";
import axios from "axios"
import "./MessagePage.css";
import Form from "react-bootstrap/Form";

import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPenToSquare,
  faPeopleGroup,
  faPerson,
  faFaceSmile,
  faLink,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";


function MessagePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [conversationList, setConversationList] = useState([]);
  const [convoId, setConvoId] = useState("");
  const token = localStorage.getItem("token");
  const [period,setPeriod] = useState("")

  const fetchPeriod = (message)=>{
    if(message.sentAt.toLocaleString("en-US")!=period){
      setPeriod(message.sentAt.toLocaleString("en-US"))
    }
    return period
  }
  
  const fetchConversations = async () => {
    const response = await axios.get(`http://localhost:3006/conversations`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const publicConvos = response.data.public;
    const privateConvos = response.data.private;
    if (privateConvos.length > 0 && publicConvos.length > 0) {
      const conversations = privateConvos
        .concat(publicConvos)
        .sort((a, b) => {
          if (a[0].message !== "" && b[0].message !== "") {
            const timeDiff = new Date(b[0].time) - new Date(a[0].time);
            if (timeDiff !== 0) {
              return timeDiff;
            }
          } else if (a[0].message == "" && b[0].message !== "") {
            const timeDiff = new Date(b[0].time) - new Date(a[0].createdAt);
            if (timeDiff !== 0) {
              return timeDiff;
            }
          } else if (a[0].message !== "" && b[0].message == "") {
            const timeDiff = new Date(b[0].createdAt) - new Date(a[0].time);
            if (timeDiff !== 0) {
              return timeDiff;
            }
          }
          return new Date(b[0].createdAt) - new Date(a[0].createdAt);
        });
  
      setConversationList(conversations);
    } else if (privateConvos.length > 0 && publicConvos.length == 0) {
      setConversationList(privateConvos);
    } else if (privateConvos.length == 0 && publicConvos.length > 0) {
      setConversationList(publicConvos);
    } else if (privateConvos.length == 0 && publicConvos.length > 0){
      setConversationList([])
    }
  };
  
  const fetchMessages = async (convoId) => {
    if (convoId !== "") {
      const response = await axios.get(
        `http://localhost:3005/conversations/${convoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const receivedMessages = response.data.receivedMessages;
      const sentMessages = response.data.userMessages;
      if (receivedMessages.length > 0 && sentMessages.length > 0) {
        const messages = receivedMessages
          .concat(sentMessages)
          .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));
        setMessageList(messages);
      } else if (receivedMessages.length > 0 && sentMessages.length == 0) {
        setMessageList(receivedMessages);
      } else if (receivedMessages.length == 0 && sentMessages.length > 0) {
        setMessageList(sentMessages);
      }
      console.log(messageList)
    }
  };
  
  useEffect(() => {
    fetchConversations();
  }, []);
  
  useEffect(() => {
    console.log(convoId)
    fetchMessages(convoId);
  }, [convoId]);
  
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleConversationSelect = (convoId)=>{
    setConvoId(convoId)
  }
  return (
    <>
      <div className="d-flex flex-column">
        <NavigationBar handleClick={toggleMenu} />
        <SideMenu isOpen={isOpen} />

        <div className="flex-grow-1 inbox-container">
          <div className="first-part">
            <div className="about-chats">
              <span className="chats me-auto">Streams</span>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="me-3 new-chat"
                style={{ color: "rgb(18, 18, 18, 0.7)" }}
              />
              <FontAwesomeIcon
                icon={faEllipsis}
                className="filter-chats"
                style={{ color: "rgb(18, 18, 18, 0.8)" }}
              />
            </div>

            {/*team message*/}
            <div>
              
            {conversationList.map((conversation) => (
  <>
    <div  key={conversation[0]._id} onClick={()=>{ handleConversationSelect(conversation[0]._id)}} className="a-team-message">
      <table className="me-auto">
        <tbody>
          <tr>
            <td>
              {conversation[0].type == 'public' ? (
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="me-3"
                  style={{ color: 'rgb(18, 18, 18, 0.7)' }}
                  size="lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPerson}
                  className="me-4"
                  style={{ color: 'rgb(18, 18, 18, 0.7)' }}
                  size="lg"
                />
              )}
            </td>
            <td>
              <div>
                <span className="group-name">{conversation[1]}</span>
                <div className="message-container">
                  {conversation[0].type == 'public' ? (
                    <>
                    {conversation[0].message ? (<>
                      <span className="sender me">{conversation[0].username}</span>
                      <span className="sender me-1">:</span>
                        <span className="grp-message">{conversation[0].message}</span></>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {conversation[0].message ? (
                        <span className="grp-message">{conversation[0].message}</span>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {conversation[0].message ? (
        <div className="msg-time">
          <span>{conversation[0].time}</span>
        </div>
      ) : null}
    </div>
    <div className="seperator"></div>
  </>
))}
             
            </div>
          </div>

          <div className="second-part">
            <div className="messages-box">
              
              {messageList.length>0&&messageList.map((message)=>(
                 message.mark=="else"?(
                <>
              <div className="the-date-box mx-auto">
                <span className="the-date">{fetchPeriod}</span>
              </div>

                <div className="your-msg me-auto">
                <div className="ctn">
                  <div className="the-user-pic me-2">
                    <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="xs" />
                  </div>
                  <div className="the-msg me-auto">
                    <span className="the-usernName">{message.senderUername}</span>
                    <span className="message">{message.message} </span>
                  </div>
                  <div className="the-time">
                    <span>{message.sentAt.toLocaleString('en-Us',{hour:'numeric',minute:'numeric'})}</span>
                  </div>
                </div>
              </div></>
              )
              :(
                <>
              <div className="my-msg ms-auto">
                <div className="the-msg me-auto">
                  <span className="message">{message.message} </span>
                </div>
                <div className="the-time mx-auto">
                  <span>{message.sentAt.toLocaleString('en-Us',{hour:'numeric',minute:'numeric'})}</span>
                </div>
              </div></>
              )
                ))}



            </div>

            <div className="text-area">
              <FontAwesomeIcon
                icon={faFaceSmile}
                style={{ color: "rgb(18, 18, 18, 0.4)" }}
                className="me-4"
              />
              <FontAwesomeIcon
                icon={faLink}
                style={{ color: "rgb(18, 18, 18, 0.4)" }}
                className="me-4"
              />

              <Form.Control
                type="text"
                placeholder="Type a Message"
                className="ctm-message-input"
              />

              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
}

export default MessagePage;
