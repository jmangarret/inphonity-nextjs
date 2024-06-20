"use client";
import React, { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    FrontChat: any;
  }
}

const ChatInitializer = () => {
  useEffect(() => {
    if (window.FrontChat) {
      window.FrontChat("init", {
        chatId: "d6353afc25546e5590163b5dfff6bd55",
      });
    } else {
      const interval = setInterval(() => {
        if (window.FrontChat) {
          clearInterval(interval);
          window.FrontChat("init", {
            chatId: "d6353afc25546e5590163b5dfff6bd55",
          });
        }
      }, 500);
    }
  }, []);

  return (
    <>
      {/* Component JSX */}
    </>
  );
};

export default ChatInitializer;
