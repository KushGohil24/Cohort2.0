import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../../Shared/Components/Title';
import { useAuth } from '../../auth/hook/useAuth';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-2xl text-center mb-10">
                <Title text1="SELLER" text2="DASHBOARD" />
            </div>
            
            <div className="bg-white shadow rounded-lg p-6 mb-8 border border-[#e0d6c8]">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome, {user?.fullname}!</h3>
                <p className="text-gray-600 mb-6">Manage your products and store settings from your dashboard.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link to="/create-product" className="border border-[#c9a96e] rounded-lg p-6 hover:bg-gray-50 transition-colors group flex items-center justify-between">
                        <div>
                            <h4 className="text-[#c9a96e] text-lg font-medium mb-1">Create Product</h4>
                            <p className="text-sm text-gray-500">Add a new jewelry piece to your collection</p>
                        </div>
                        <svg className="w-8 h-8 text-[#c9a96e] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Link>
                    
                    <Link to="/seller-products" className="border border-[#c9a96e] rounded-lg p-6 hover:bg-gray-50 transition-colors group flex items-center justify-between">
                        <div>
                            <h4 className="text-[#c9a96e] text-lg font-medium mb-1">My Products</h4>
                            <p className="text-sm text-gray-500">View and manage your listed items</p>
                        </div>
                        <svg className="w-8 h-8 text-[#c9a96e] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
