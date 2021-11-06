import React, { useState } from 'react'
import styles from './signup.module.scss'

import TopNav from '../../components/TopNav'
import Steps from './Steps'
import JobPost from '../../components/JobPost'


function Signup() {

    const [baseStepComplete, setBaseStepComplete] = useState(false);

    return (
        <div className={styles.con}>
            <TopNav />
            <div className={styles.content}>
                {
                    !baseStepComplete ? <Steps setBaseStepComplete={setBaseStepComplete} /> : <JobPost />
                }
            </div>
        </div>
    )
}

export default Signup
