import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import styles from '../Auth/Auth.module.css'; // Thay đổi đường dẫn
import { Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra thông tin đăng nhập
        if (email === "admin@example.com" && password === "password") {
            onLogin(); // Nếu đúng thì gọi hàm onLogin
        } else {
            alert("Thông tin đăng nhập sai!");
        }
    };

    return (
        <div className={styles['auth-container']}>
            <h2>Đăng Nhập</h2>
            <form className={styles['auth-form']} onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn"
                />
                <label>Mật khẩu:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                />
                <button type="submit">Đăng Nhập</button>
            </form>
            <div className={styles['social-login']}>
                <button className={styles['google-btn']}>Đăng nhập với Google</button>
                <button className={styles['facebook-btn']}>Đăng nhập với Facebook</button>
            </div>
            <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
        </div>
    );
};

LoginPage.propTypes = {
    onLogin: PropTypes.func.isRequired, // Đảm bảo onLogin là một hàm
};

export default LoginPage;
