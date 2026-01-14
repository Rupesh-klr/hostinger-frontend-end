// src/projects/common-elements/Sidebar.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { sidebarLinks } from '../../config/constants';

const Sidebar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const userRole = userInfo?.role || 2; 

    // State to control expansion
    const [isExpanded, setIsExpanded] = useState(true);

    // Sidebar Width Configurations
    // sidebar main width in my compount
    const sidebarWidth = isExpanded ? '250px' : '70px'; 

    return (
        <aside className="sidebar-container" style={{ ...styles.sidebar, width: sidebarWidth }}>
            
            {/* Toggle Button Arrow */}
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                style={styles.toggleBtn}
                title={isExpanded ? "Shrink" : "Expand"}
            >
                {isExpanded ? '◀' : '▶'}
            </button>

            <div style={styles.linksContainer}>
                {sidebarLinks.map((link) => (
                    link.roles.includes(userRole) && (
                        <NavLink 
                            key={link.path} 
                            to={link.path} 
                            style={styles.link} 
                            // Tooltip: Shows title on hover when shrunken
                            title={!isExpanded ? link.title : ""} 
                        >
                            <span style={styles.icon}>{link.icon}</span>
                            
                            {/* Only show text if expanded */}
                            {isExpanded && (
                                <span className="link-text" style={styles.text}>
                                    {link.title}
                                </span>
                            )}
                        </NavLink>
                    )
                ))}
            </div>
        </aside>
    );
};

const styles = {
    sidebar: { 
        height: '100vh', 
        background: '#ecf0f1', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'width 0.3s ease', // Smooth transition for shrinking
        position: 'relative',
        borderRight: '1px solid #ddd'
    },
    toggleBtn: {
        position: 'absolute',
        right: '-12px',
        top: '20px',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    linksContainer: {
        marginTop: '60px',
        display: 'flex',
        flexDirection: 'column'
    },
    link: { 
        padding: '15px 22px', 
        textDecoration: 'none', 
        color: '#333', 
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    icon: {
        fontSize: '1.5rem',
        minWidth: '30px'
    },
    text: {
        marginLeft: '15px',
        fontSize: '1rem'
    }
};

export default Sidebar;