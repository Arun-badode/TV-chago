import React, { useEffect, useState } from 'react';
import { Menu, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./Header.css";

const Header = ({ setSidebarOpen }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const mockUsers = [
            { id: 1, full_name: "John Doe", email: "john@example.com" },
            { id: 2, full_name: "Jane Smith", email: "jane@example.com" },
            { id: 3, full_name: "Robert Johnson", email: "robert@example.com" },
            { id: 4, full_name: "Emily Davis", email: "emily@example.com" },
            { id: 5, full_name: "Michael Wilson", email: "michael@example.com" },
        ];
        setUsers(mockUsers);
    }, []);

    useEffect(() => {
        if (searchTerm.trim()) {
            const results = users.filter(user =>
                user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(results);
        } else {
            setFilteredUsers([]);
        }
    }, [searchTerm, users]);

    const handleUserSelect = (user) => {
        navigate('/dashboard/updateprofile', { state: { userData: user } });
        setSearchTerm('');
        setFilteredUsers([]);
    };

    return (
        <header className="header-container">
            <div className="header-content">

                {/* Right Section */}

                <div className="header-right ms-auto d-flex align-items-center gap-4">
                    {/* Search Bar */}
                    <div className="search-group d-flex align-items-center me-3">
                        <span className="search-icon me-2">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            className="search-input form-control"
                            placeholder="Search users, reports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search users or reports"
                            autoComplete="off"
                            style={{ minWidth: '250px' }}
                        />
                    </div>

                    {/* Profile Button */}
                    <button
                        className=" profile-button align-items-center d-flex align-items-center border-0 bg-white px-3 py-1 rounded shadow-sm"
                        style={{ height: '36px' }}
                        type="button"
                        onClick={() => navigate('/dashboard/adminprofile')}
                    >
                        <User size={18} className="me-2 profile-icon" />
                        <span style={{  fontSize: '0.9rem', fontWeight: 500 }}>Admin</span>
                    </button>

                </div>



            </div>
        </header>
    );
};

export default Header;
