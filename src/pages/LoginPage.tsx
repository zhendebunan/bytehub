import { useState } from "react";
import GitHubLoginButton from "../components/GitHubLoginButton.tsx";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 左侧图像（仅在中等及以上设备显示） */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={require("../image/background.png")}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* 登录表单区域 */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100">
        <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={require("../image/bytehub.png")}
              alt="Bytehub Logo"
              className="h-10"
            />
          </div>

          {/* 欢迎文案 */}
          <h2 className="text-center text-xl font-semibold mb-1">欢迎</h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            登录 Bytebase 以继续使用 Bytebase Hub。
          </p>

          {/* 登录按钮 */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-50">
              <FaGoogle className="mr-2" />
              继续使用 Google
            </button>

            <GitHubLoginButton setUser={setUser} />

            <button className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-50">
              继续使用 Microsoft Account
            </button>
          </div>

          {/* 分隔线 */}
          <div className="my-6 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">或</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* 邮箱登录输入 */}
          <input
            type="email"
            placeholder="电子邮件地址*"
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg">
            继续
          </button>

          {/* 用户信息展示（如果登录成功） */}
          {user && (
            <div className="mt-6 p-4 border rounded text-center">
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-16 h-16 rounded-full mx-auto"
              />
              <p className="mt-2 font-medium">{user.login}</p>
              <p className="text-sm text-gray-500">{user.name}</p>
            </div>
          )}

          {/* 注册提示 */}
          <p className="text-center text-sm text-gray-600 mt-6">
            没有账户？{" "}
            <a href="#" className="text-indigo-600 font-medium hover:underline">
              注册
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
