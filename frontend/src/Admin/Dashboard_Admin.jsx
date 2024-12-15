import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import Approval_Admin from "./Approval_Admin";
import Datav_Admin from "./Datav_Admin";
import Notification_Admin from "./Notification_Admin";
import Profil_Admin from "./Profil_Admin";
import Input_Event from "./Input_Event";

    const AdminDashboard = () => {
    const [currentPage, setCurrentPage] = useState("page1");

    const renderContent = () => {
        switch (currentPage) {
        case "page1":
            return <Approval_Admin/>;
        case "page2":
            return <Datav_Admin/>;
        case "page3":
            return <Notification_Admin/>;
        case "page4":
            return <Profil_Admin/>; 
        case "page5":
            return <Input_Event/>;   
        default:
            return <Approval_Admin/>;
        }
    };

    return (
        <div className="flex min-h-screen">
        <AdminSidebar onNavigate={setCurrentPage} />
        <div className="flex-1 p-8 bg-gray-100">
            {renderContent()}
        </div>
        </div>
    );
    };

export default AdminDashboard;
