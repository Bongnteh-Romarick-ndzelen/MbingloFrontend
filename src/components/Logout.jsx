// src/components/Logout.jsx
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/authService';
import toast from 'react-hot-toast';

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser(); // Backend call to clear refresh token cookie
        } catch (err) {
            console.error('Logout error:', err);
        }

        localStorage.removeItem('token'); // Remove access token
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    return (
        <span onClick={handleLogout} className="cursor-pointer">
            Logout
        </span>
    );
}
