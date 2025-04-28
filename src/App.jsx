import { useState } from 'react';
import { Assistant } from "./assistants/deepseekai";
import { Loader } from "./components/Loader/Loader";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import LoginPage from './components/Auth/LoginPage';
import styles from './App.module.css'; // Cập nhật đúng đường dẫn

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [messages, setMessages] = useState([]); // Lưu trữ các tin nhắn trong chatbot
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [isStreaming, setIsStreaming] = useState(false); // Trạng thái stream tin nhắn

  const assistant = new Assistant(); // Khởi tạo trợ lý AI

  // Hàm cập nhật nội dung tin nhắn
  function updateLastMessageContent(content) {
    setMessages((prevMessages) =>
        prevMessages.map((message, index) =>
            index === prevMessages.length - 1
                ? { ...message, content: `${message.content}${content}` }
                : message
        )
    );
  }

  // Hàm thêm tin nhắn mới vào chat
  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  // Hàm gửi nội dung khi người dùng nhập
  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      const result = await assistant.chatStream(content, messages);
      let isFirstChunk = false;

      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true);
        }

        updateLastMessageContent(chunk);
      }

      setIsStreaming(false);
    } catch (err) {
      console.error("Error occurred:", err); // Log the error to the console for debugging
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  // Hàm xử lý đăng nhập
  const handleLogin = () => {
    setIsLoggedIn(true); // Đánh dấu người dùng đã đăng nhập
  };

  return (
      <div className={styles.App}>
        {!isLoggedIn ? (
            // Nếu chưa đăng nhập, hiển thị trang đăng nhập
            <LoginPage onLogin={handleLogin} />
        ) : (
            <>
              {isLoading && <Loader />} {/* Hiển thị Loader khi đang tải */}
              <header className={styles.Header}>
                <img className={styles.Logo} src="/chat-bot.png" alt="Chatbot Logo" />
                <h2 className={styles.Title}>AI Chatbot</h2>
              </header>
              <div className={styles.ChatContainer}>
                <Chat messages={messages} />
              </div>
              <Controls
                  isDisabled={isLoading || isStreaming}
                  onSend={handleContentSend}
              />
            </>
        )}
      </div>
  );
}

export default App;
