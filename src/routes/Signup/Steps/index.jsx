import React, { useRef, useState } from 'react'
import styles from './steps.module.scss'
import axios from 'axios'
import Button from '../../../components/Button'
import { toast } from 'react-toastify'

function BasicAuth({ setBaseAuthDone, signUpForm, setSignUpForm }) {

    return (
        <form onSubmit={() => setBaseAuthDone(true)} >
            <p className={styles.tag}>Please enter your details to create your free Account</p>
            <div className={styles.row}>
                <label htmlFor={"firstName"}>
                    <p>First name</p>
                    <input required type="text" name={"firstName"} placeholder={"john"} value={signUpForm.firstName}
                        onChange={(e) => { setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value }) }}
                    />
                </label>
                <label htmlFor={"lastName"}>
                    <p>Last name</p>
                    <input required type="text" name={"lastName"} placeholder={"doe"} value={signUpForm.lastName}
                        onChange={(e) => { setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value }) }} />
                </label>
            </div>

            <div className={styles.row}>
                <label htmlFor={"email"} className={styles.email}>
                    <p>Email Address</p>
                    <input required type="email" name={"email"} placeholder={"example@email.com"} value={signUpForm.email}
                        onChange={(e) => { setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value }) }} />
                </label>
            </div>
            <div className={styles.row}>
                <Button btnType={"submit"} className={styles.button}>Next</Button>
            </div>
        </form>
    )
}

function SecureAuth({ nextStep, setBaseAuthDone, signUpForm, setSignUpForm, callSignUp }) {
    return (
        <form className={styles.secureAuth} onSubmit={(e) => { e.preventDefault(); callSignUp(); }}>
            <p className={styles.tag}>Please enter your details to create your free Account</p>
            <div className={styles.row}>
                <label htmlFor="password" className={styles.email}>
                    <p>Enter your Password</p>
                    <input required type="password" name={"password"}
                        onChange={(e) => { setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value }) }} />

                </label>
            </div>
            <div className={styles.row}>
                <label htmlFor="rePassword" className={styles.email}>
                    <p>Re-enter your Password</p>
                    <input required type="password" name={"rePassword"}
                        onChange={(e) => { setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value }) }} />
                </label>
            </div>
            <span style={{ display: "flex" }}>
                <Button type={"secondary"} className={styles.button} onClick={() => setBaseAuthDone(false)} >Previous</Button>
                <Button btnType={"submit"} className={styles.button}>Next</Button>
            </span>
        </form>
    )
}

const StepOne = ({ next, signUpForm, setSignUpForm }) => {

    const con = useRef(null);
    const nextStep = () => {
        con.current.classList.add(styles.animateSlideLeft);
        setTimeout(() => {
            next();
        }, 800)
    }

    const [baseAuthDone, setBaseAuthDone] = useState(false);


    const callSignUp = async () => {
        if (signUpForm.rePassword === signUpForm.password) {
            nextStep();
        }
        else {
            toast.error("Please verify the passwords");
        }

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
            {(!baseAuthDone)
                ? <BasicAuth setBaseAuthDone={setBaseAuthDone} signUpForm={signUpForm} setSignUpForm={setSignUpForm} />
                : <SecureAuth setBaseAuthDone={setBaseAuthDone} callSignUp={callSignUp} signUpForm={signUpForm} setSignUpForm={setSignUpForm} />}
        </div>
    )
}

const StepTwo = ({ next, prev, setBaseStepComplete, userType, setUserType, signUpForm, setSignUpForm }) => {

    const con = useRef(null);
    const [country, setCountry] = useState("USA");

    const prevStep = () => {
        con.current.classList.add(styles.animateSlideLeft);
        setTimeout(() => {
            con.current.style.display = "none";
            prev();
        }, 800)
    }

    const postUserType = async () => {
        if (userType.length > 0 && country.length > 0) {

            try {
                let res = await axios.post('/signup', { ...signUpForm, userType, country });
                if (res.data.status === "success") {
                    toast.success("Signup sucessful")
                    localStorage.setItem("token", res.data.token);
                    setBaseStepComplete(true)
                }
                else {
                    toast.error("Error! Please try again")
                    console.log(res.data)
                }
            }
            catch (er) {
                console.log(er);
            }

            // await axios.post('/postUserType', {
            //     userType,
            //     country
            // },
            //     {
            //         headers: {
            //             'Authorization': "Bearer " + localStorage.getItem("token")
            //         }
            //     });

            // 
        }
        else {
            toast.error("Please fill the details");
        }

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
                        onClick={() => { setUserType("hire"); localStorage.setItem("userType","hire") }} >
                        <p>Hire for a project</p>
                    </div>
                    <div className={(userType === "freelance") ? (styles.selected) : (styles.unSelected)}
                        onClick={() => { setUserType("freelance"); localStorage.setItem("userType","freelance") }}>
                        <p>Work as Freelancer</p>
                    </div>
                </span>
            </div>

            <div className={styles.terms}>
                <input type="checkbox" /><p>Yes I understand and agree to terms and conditions</p>
            </div>

            <div className={styles.navigate}>
                <Button type={"secondary"} onClick={prevStep}>Previous</Button>
                <Button onClick={() => { postUserType() }}>Next</Button>
            </div>

        </div>
    )
}

function Steps({ setBaseStepComplete, userType, setUserType }) {

    const [currentStep, setCurrentStep] = useState(1);

    const [signUpForm, setSignUpForm] = useState({});

    const next = () => {
        setCurrentStep(currentStep + 1);
    }
    const prev = () => {
        setCurrentStep(currentStep - 1);
    }

    const stepSwitch = () => {
        switch (currentStep) {
            case 1:
                return <StepOne next={next} signUpForm={signUpForm} setSignUpForm={setSignUpForm} />
            case 2:
                return <StepTwo userType={userType} setUserType={setUserType} next={next} prev={prev} setBaseStepComplete={setBaseStepComplete} signUpForm={signUpForm} setSignUpForm={setSignUpForm} />
            default:
                return <h1>test</h1>
        }
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
