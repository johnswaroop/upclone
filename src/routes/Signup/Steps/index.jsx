import React, { useRef, useState } from 'react'
import styles from './steps.module.scss'

import Button from '../../../components/Button'

const StepOne = ({ next }) => {



    const con = useRef(null);

    const nextStep = () => {
        con.current.classList.add(styles.animateSlideLeft);
        setTimeout(() => {
            next();
        }, 800)
    }

    return (
        <div className={styles.conSignUp} ref={con}>
            <div className={styles.auth}>
                <span>
                    <img src="./google.png" alt="" />
                    <p>Sign-up with Google</p>
                </span>
            </div>
            <span className={styles.or}>
                <h3>Or</h3>
            </span>
            <p className={styles.tag}>Please enter your details to create your free Account</p>
            <div className={styles.row}>
                <label htmlFor="">
                    <p>First name</p>
                    <input type="text" />
                </label>
                <label htmlFor="">
                    <p>Last name</p>
                    <input type="text" />
                </label>
            </div>

            <div className={styles.row}>
                <label htmlFor="" className={styles.email}>
                    <p>Email Address</p>
                    <input type="text" />
                </label>
            </div>
            <Button className={styles.button} onClick={nextStep} >Next</Button>
        </div>
    )
}

const StepTwo = ({ next, prev,setBaseStepComplete}) => {

    const con = useRef(null);
    const [userType, setUserType] = useState("");

    const prevStep = () => {
        con.current.classList.add(styles.animateSlideLeft);
        setTimeout(() => {
            con.current.style.display = "none";
            prev();
        }, 800)
    }

    return (
        <div className={styles.conSignUpTwo} ref={con}>
            <div className={styles.user}>
                <p>Welcome</p>
                <h1>John Swaroop</h1>
                <h3>johnswaroop@gmail.com</h3>
            </div>
            <div className={styles.country}>
                <select placeholder={"Select your Country"} name="" id="">
                    <option value="" disabled selected>Select your Country</option>
                </select>
            </div>
            <div className={styles.userType}>
                <p className={styles.tag}>I want to</p>
                <span className={styles.selectType}>
                    <div className={(userType === "hire") ? (styles.selected) : (styles.unSelected)}
                        onClick={() => { setUserType("hire") }} >
                        <p>Hire for a project</p>
                    </div>
                    <div className={(userType === "freelance") ? (styles.selected) : (styles.unSelected)}
                        onClick={() => { setUserType("freelance") }}>
                        <p>Work as Freelancer</p>
                    </div>
                </span>
            </div>

            <div className={styles.terms}>
                <input type="checkbox" /><p>Yes I understand and agree to terms and conditions</p>
            </div>

            <div className={styles.navigate}>
                <Button type={"secondary"} onClick={prevStep}>Previous</Button>
                <Button onClick={()=>{setBaseStepComplete(true)}}>Next</Button>
            </div>

        </div>
    )
}

function Steps({setBaseStepComplete}) {

    const [currentStep, setCurrentStep] = useState(1);

    const stepSwitch = () => {
        switch (currentStep) {
            case 1:
                return <StepOne next={next} />
            case 2:
                return <StepTwo next={next} prev={prev} setBaseStepComplete={setBaseStepComplete} />
            default:
                return <h1>test</h1>
        }
    }

    const next = () => {
        setCurrentStep(currentStep + 1);
    }
    const prev = () => {
        setCurrentStep(currentStep - 1);
    }

    return (
        <div className={styles.steps}>
            <span className={styles.headTitle}>
                <h1 className={styles.head}>Sign</h1>
                <h1 className={styles.tail}>up</h1>
            </span>
            {stepSwitch()}
        </div>
    )
}

export default Steps
