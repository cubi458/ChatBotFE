import styles from '../Auth/Auth.module.css'; // Thay đổi đường dẫn

const RegisterPage = () => {
    return (
        <div className={styles['auth-container']}>
            <h2>Đăng Ký</h2>
            <form className={styles['auth-form']}>
                <label>Email:</label>
                <input type="email" placeholder="Nhập email của bạn" />
                <label>Mật khẩu:</label>
                <input type="password" placeholder="Nhập mật khẩu của bạn" />
                <button type="submit">Đăng Ký</button>
            </form>
            <p>Đã có tài khoản? <a href="/login">Đăng nhập ngay</a></p>
        </div>
    );
};

export default RegisterPage;
