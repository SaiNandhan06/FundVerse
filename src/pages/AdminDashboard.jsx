import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storage/localStorage.service';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

function AdminDashboard() {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is admin (only on mount)
        const userStr = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.role !== 'admin') {
                    navigate('/admin/login');
                    return;
                }
                setCurrentUser(user);
            } catch (error) {
                console.error('Error parsing user:', error);
                navigate('/admin/login');
                return;
            }
        } else {
            navigate('/admin/login');
            return;
        }

        // Load data
        loadData();
    }, []); // Empty dependency array - only run once on mount

    const loadData = () => {
        const allUsers = storageService.get(STORAGE_KEYS.USERS, []);
        const allCampaigns = storageService.get(STORAGE_KEYS.CAMPAIGNS, []);
        setUsers(allUsers);
        setCampaigns(allCampaigns);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = users.filter(u => u.id !== userId);
            storageService.set(STORAGE_KEYS.USERS, updatedUsers);
            setUsers(updatedUsers);
        }
    };

    const handleDeleteCampaign = (campaignId) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
            storageService.set(STORAGE_KEYS.CAMPAIGNS, updatedCampaigns);
            setCampaigns(updatedCampaigns);
        }
    };

    const handleApproveCampaign = (campaignId) => {
        if (window.confirm('Approve this campaign? It will be visible in Discover page.')) {
            const updatedCampaigns = campaigns.map(c =>
                c.id === campaignId ? { ...c, status: 'approved' } : c
            );
            storageService.set(STORAGE_KEYS.CAMPAIGNS, updatedCampaigns);
            setCampaigns(updatedCampaigns);
        }
    };

    const handleClearAllData = () => {
        if (window.confirm('⚠️ This will delete ALL users and campaigns. Are you sure?')) {
            storageService.set(STORAGE_KEYS.USERS, []);
            storageService.set(STORAGE_KEYS.CAMPAIGNS, []);
            loadData();
            alert('All data cleared successfully!');
        }
    };

    if (!currentUser) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
                <div className="container-main">
                    <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-purple-100">Manage users, campaigns, and platform data</p>
                </div>
            </div>

            <div className="container-main py-8">
                {/* Stats Cards */}
                <div className="grid-4 mb-8">
                    <div className="stat-card">
                        <div className="stat-value">{users.length}</div>
                        <div className="stat-label">Total Users</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{campaigns.length}</div>
                        <div className="stat-label">Total Campaigns</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{users.filter(u => u.role === 'student').length}</div>
                        <div className="stat-label">Students</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{users.filter(u => u.role === 'company').length}</div>
                        <div className="stat-label">Companies</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mb-8 flex gap-4">
                    <button
                        onClick={handleClearAllData}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                        Clear All Data
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>

                {/* Pending Campaigns */}
                {campaigns.filter(c => c.status === 'pending').length > 0 && (
                    <div className="card mb-8 border-2 border-orange-300">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Pending Campaigns</h2>
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                                {campaigns.filter(c => c.status === 'pending').length} Awaiting Approval
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-orange-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Creator</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Target</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {campaigns.filter(c => c.status === 'pending').map((campaign) => (
                                        <tr key={campaign.id} className="hover:bg-orange-50">
                                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">{campaign.campaignTitle}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{campaign.creatorName}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{campaign.category}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">₹{campaign.targetAmount?.toLocaleString('en-IN')}</td>
                                            <td className="px-4 py-3 text-sm flex gap-2">
                                                <button
                                                    onClick={() => handleApproveCampaign(campaign.id)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCampaign(campaign.id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Users Table */}
                <div className="card mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'student' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Campaigns Table */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Campaigns</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Creator</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Target</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Raised</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {campaigns.map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">{campaign.campaignTitle}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{campaign.creatorName}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{campaign.category}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">₹{campaign.targetAmount?.toLocaleString('en-IN')}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">₹{campaign.raised?.toLocaleString('en-IN')}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.status === 'approved' || campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                    campaign.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {campaign.status ? campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1) : 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <button
                                                onClick={() => handleDeleteCampaign(campaign.id)}
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
