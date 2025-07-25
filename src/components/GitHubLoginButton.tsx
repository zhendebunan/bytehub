import React, { useEffect } from "react";
import {FaGithub} from "react-icons/fa";

const CLIENT_ID = "Ov23libYvrfgv3vVi7VO";  // 替换成你自己申请的
const REDIRECT_URI = "http://localhost:3000";

const GitHubLoginButton = ({ setUser }: { setUser: (u: any) => void }) => {
  const handleLogin = () => {
    const githubURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
    window.location.href = githubURL;
  };

  // 处理 GitHub 回调 code
useEffect(() => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");

  if (code) {
    fetch(`http://localhost:4000/auth/github?code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          fetch("https://api.github.com/user", {
            headers: {
              Authorization: `token ${data.access_token}`,
            },
          })
            .then((res) => res.json())
            .then((user) => {
              setUser(user);
            });
        } else {
          console.error("未能获取 access_token:", data);
        }
      })
      .catch((err) => {
        console.error("请求后端 /auth/github 出错:", err);
      });
  }
}, []);


  return (
            <button onClick={handleLogin} className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-50">
              <FaGithub className="mr-2" />
              继续使用 GitHub
            </button>
  );
};

export default GitHubLoginButton;
