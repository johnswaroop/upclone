import React from 'react'
import styles from './topNav.module.scss'

function TopNav() {
    return (
        <nav className={styles.nav}>
            <div className={styles.con}>
                <div className={styles.logo}>
                    <h1 className={styles.head}>Reve</h1>
                    <h1 className={styles.tail}>al</h1>
                </div>
                <div className={styles.menu}>
                    <ul>
                        <li>Job Support</li>
                        <li>Job Training</li>
                        <li>Job Interview</li>
                        <li>Profile Marketing</li>
                        <li>Log in</li>
                        <li>Sign up</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default TopNav
