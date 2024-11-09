import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from '../../utils/axiosUtils';
import Cookies from 'js-cookie';
import styles from './Login.module.css';
import logo from '../../assets/logo.png';
import universityImage from '../../assets/university.png';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {useUser} from "../../contexts/UserContext.jsx";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loginMode, setLoginMode] = useState(true);
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {email, password});

      await login(response.data);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });

      if (!response.ok) {
        console.error('Failed to send password reset email');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form']}>
        <div className={styles['header-container']}>
          <img src={logo} alt="Logo" className={styles['logo']}/>
          <div className={styles['text-container']}>
            <h2>{loginMode ? 'おかえりなさい' : 'パスワードをお忘れですか'}</h2>
            <p>{loginMode ? '情報をご入力ください!' : 'パスワード変更用リンクを電子メールに送信します'}</p>
          </div>
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
        {loginMode ? (
          <form onSubmit={handleLogin}>
            <div className={styles['input-group']}>
              <label>ログイン</label>
              <div className={styles['input-icon']}>
                <BadgeOutlinedIcon/>
                <input
                  type="email"
                  placeholder="ログインをご入力ください"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles['input-group']}>
              <div className={styles['input-icon']}>
                <LockOutlinedIcon/>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="パスポートをご入力ください"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {password && (
                  <span onClick={togglePasswordVisibility} className={styles['visibility-icon']}>
                    {showPassword ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}
                  </span>
                )}
              </div>
            </div>
            <div className={styles['remember-me-container']}>
              <div className={styles['remember-me']}>
                <input type="checkbox" id="remember" name="remember"/>
                <label htmlFor="remember">保存</label>
              </div>
              <div className={styles['forgot-password']}>
                <button
                  type="button"
                  onClick={() => setLoginMode(false)}
                  className={styles['forgot-password-button']}
                >
                  パスワードをお忘れですか
                </button>
              </div>
            </div>
            <button type="submit" className={`${styles['button-custom']} ${styles['submit-button']}`}>ログイン</button>
          </form>
        ) : (

          <form onSubmit={handleForgotPassword}>
            <div className={styles['input-group']}>
              <label>メールアドレス</label>
              <div className={styles['input-icon']}>
                <BadgeOutlinedIcon/>
                <input
                  type="email"
                  placeholder="メールをご入力ください"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className={`${styles['button-custom']} ${styles['submit-button']}`}>送信</button>
            <button type="button" className={`${styles['button-custom']} ${styles['submit-button']}`}
                    onClick={() => setLoginMode(true)}>戻る
            </button>
          </form>
        )}
      </div>
      <div className={styles['login-image']}>
        <img src={universityImage} alt="University"/>
      </div>
    </div>
  );
};

export default Login;
