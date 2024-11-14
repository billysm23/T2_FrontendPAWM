import React from 'react';
import styles from '../../styles/Collapse.module.css';

const Collapse = ({ isExpanded, onToggle, header, children }) => {
    return (
        <div className={styles.collapse}>
            <div className={`${styles.header} ${isExpanded ? styles.active : ''}`} onClick={onToggle}>
                {header}
                <div className={styles.toggle}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
            </div>
            {isExpanded && <div className={styles.content}>{children}</div>}
        </div>
    );
};

export default Collapse;