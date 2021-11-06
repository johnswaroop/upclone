import React, { useState } from 'react'
import axios from 'axios'
import styles from './signin.module.scss'
import Button from '../../components/Button'
import TopNav from '../../components/TopNav'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

function SigninModule() {

    const [signinForm, setSigninForm] = useState({});
    const history = useHistory();

    const callSignin = async (e) => {
        e.preventDefault();
        let res = await axios.post('/signin', signinForm);
        if (res.data.status === "success") {
            localStorage.setItem('token', res.data.token);
            history.push('/postjob');
        }
        else {
            toast.error("Sign in error ! please try again")
        }
    }

    return (
        <div className={styles.signin}>
            <span className={styles.headTitle}>
                <h1 className={styles.head}>Sign</h1>
                <h1 className={styles.tail}>in</h1>
            </span>
            <div className={styles.conSignUp} >
                <div className={styles.auth}>
                    <span>
                        <img src="./google.png" alt="" />
                        <p>Sign-in with Google</p>
                    </span>
                </div>
                <span className={styles.or}>
                    <h3>Or</h3>
                </span>
                <form className={styles.secureAuth} onSubmit={callSignin} >
                    <p className={styles.tag}>Please enter your Username and password</p>
                    <div className={styles.row}>
                        <label htmlFor="email" className={styles.email}>
                            <p>Email Address</p>
                            <input name="email" type="email" value={signinForm.email}
                                onChange={(e) => { setSigninForm({ ...signinForm, [e.target.name]: e.target.value }) }}
                            />
                        </label>
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="password" className={styles.email}>
                            <p>Password</p>
                            <input name="password" type="password" value={signinForm.password}
                                onChange={(e) => { setSigninForm({ ...signinForm, [e.target.name]: e.target.value }) }}
                            />
                        </label>
                    </div>
                    <span style={{ display: "flex" }}>
                        {/* <Button type={"secondary"} className={styles.button}  >Previous</Button> */}
                        <Button btnType={"submit"} className={styles.button} >Sign in</Button>
                    </span>
                </form>
            </div>
        </div>
    )

}

function Signin() {
    return (
        <div className={styles.con}>
            <TopNav />
            <div className={styles.content}>
                {
                    <SigninModule />
                }
            </div>
        </div>
    )
}

export default Signin
