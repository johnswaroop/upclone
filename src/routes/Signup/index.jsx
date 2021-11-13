import React, { useState, useEffect } from 'react'
import styles from './signup.module.scss'

import TopNav from '../../components/TopNav'
import Steps from './Steps'
//import JobPost from '../../components/JobPost'
import { useHistory } from 'react-router'


function Signup() {

    const [baseStepComplete, setBaseStepComplete] = useState(false);
    const [userType, setUserType] = useState("");

    const history = useHistory();

    useEffect(() => {

        if (baseStepComplete && (userType === "hire")) {
            history.push("/postjob");
        }
        else if (baseStepComplete && (userType === "freelance")) {
            history.push("/devform");
        }

    }, [baseStepComplete, history, userType])

    return (
        <div className={styles.con}>
            <TopNav />
            <div className={styles.content}>
                {
                    <Steps userType={userType} setUserType={setUserType} setBaseStepComplete={setBaseStepComplete} />
                }
            </div>
        </div>
    )
}

export default Signup
