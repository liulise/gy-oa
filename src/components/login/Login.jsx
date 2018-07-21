import React from 'react';
import 'src/components/login/login.scss';

class Login extends React.Component
{
  constructor(prop)
  {
    super(prop);
    this.state = {};
  }

  render()
  {
    return (
      <div className="atomic-textCenter com-login-form">
        <div className="com-login-wrap">
          <ul>
            <li>
              <input className="com-login-input" type="text" value="" placeholder="你的手机号/邮箱" id="login-username" maxLength="50" autoComplete="off"/>
            </li>
            <li>
              <input className="com-login-input" type="password" placeholder="密码" id="login-passwd"/>
            </li>
            <li className="atomic-textLeft">
              <label>
                <input type="checkbox"/> 记住我
                <span className="atomic-ml10 com-login-tip">不是自己的电脑上不要勾选此项</span>
              </label>
            </li>
            <li className="atomic-mt10">
              <a className="com-login-btn com-login-btn--login">登录</a>
              <a className="com-login-btn atomic-ml38">注册</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Login;
