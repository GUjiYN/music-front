import React from 'react';
import { Link } from 'react-router-dom';

type NavbarProps = {
  title?: string;
};

const Navbar: React.FC<NavbarProps> = ({ title = "泰勒音乐" }) => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">首页</Link></li>
            <li><Link to="/albums">专辑</Link></li>
            <li><Link to="/songs">歌曲</Link></li>
            <li>
              <a>更多</a>
              <ul className="p-2">
                <li><Link to="/about">关于</Link></li>
                <li><Link to="/contact">联系我们</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">{title}</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">首页</Link></li>
          <li><Link to="/albums">专辑</Link></li>
          <li><Link to="/songs">歌曲</Link></li>
          <li>
            <details>
              <summary>更多</summary>
              <ul className="p-2 bg-base-100 z-10">
                <li><Link to="/about">关于</Link></li>
                <li><Link to="/contact">联系我们</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="form-control mr-2">
          <input type="text" placeholder="搜索" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="用户头像" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><a>个人资料</a></li>
            <li><a>设置</a></li>
            <li><a>登出</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 