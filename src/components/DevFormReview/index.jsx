import React from 'react'
import styles from './postJobReview.module.scss'
import Button from '../Button'
import axios from 'axios'


function index({ devForm, setDevForm, prog, setProg, setStartReview }) {

    const postJob = (e) => {
        e.preventDefault();
        axios.post('/postDevProfile', devForm, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        });
    }

    return (
        <div className={styles.content}>
            <div className={styles.review}>
                <div className={styles.title}>
                    <h1>Review</h1>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Profile</p>
                    <p className={styles.value}>{devForm.profile}
                        <span className={styles.editIcon}
                            id={"s-0"} onClick={(e) => { setProg(parseInt(e.target.id.split("-")[1])); setStartReview(false); }} />
                    </p>
                </div>
                <div className={styles.fieldCat}>
                    <p className={styles.label}>Skills</p>
                    <p className={styles.value}>
                        {
                            devForm.skills?.map((skill) => {
                                return <span className={styles.category}>{skill}</span>
                            })
                        }
                        <span id={"s-1"} onClick={(e) => { setProg(parseInt(e.target.id.split("-")[1])); setStartReview(false); }} className={styles.editIcon} />
                    </p>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Description</p>
                    <pre className={styles.value + " " + styles.desc}>
                        {devForm.description}
                        <span className={styles.editIcon}
                            id={"s-2"} onClick={(e) => { setProg(parseInt(e.target.id.split("-")[1])); setStartReview(false); }} />
                    </pre>
                </div>
                <div className={styles.pair}>
                    <p className={styles.label}>Hourly Rate :</p>
                    <p className={styles.value}>
                        $ {devForm.hourlyRate}
                        <span id={"s-3"} onClick={(e) => { setProg(parseInt(e.target.id.split("-")[1])); setStartReview(false); }} className={styles.editIcon} />
                    </p>
                </div>
                <span className={styles.btnNav}>
                    <Button className={styles.btn} type={"secondary"} shape={"round"}>Discard</Button>
                    <Button
                        className={styles.btn}
                        onClick={postJob}
                        shape={"round"}>Submit</Button>
                </span>
            </div>
        </div>
    )
}

export default index
