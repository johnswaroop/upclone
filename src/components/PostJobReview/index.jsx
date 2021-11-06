import React from 'react'
import styles from './postJobReview.module.scss'
import Button from './../Button'


function index({ jobPostForm, setJobPostForm, prog, setProg, setStartReview }) {
    return (
        <div className={styles.content}>
            <div className={styles.review}>
                <div className={styles.title}>
                    <h1>Review</h1>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Headline</p>
                    <p className={styles.value}>{jobPostForm.headline}
                        <span  className={styles.editIcon}
                          id={"s-0"}  onClick={(e) => {setProg(parseInt(e.target.id.split("-")[1]));setStartReview(false); }}
                        ></span>
                    </p>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Describe your job</p>
                    <textarea className={styles.value} rows={8} />
                    <label className={styles.fileUpload} htmlFor="fileUpload">
                        <p>Upload file</p>
                        <input style={{ display: "none" }} type="file" id={"fileUpload"} />
                    </label>
                </div>
                <div className={styles.fieldCat}>
                    <p className={styles.label}>Skills</p>
                    <p className={styles.value}>
                        {
                            jobPostForm.skills?.map((skill) => {
                                return <span className={styles.category}>{skill}</span>
                            })
                        }
                        <span  id={"s-1"}  onClick={(e) => {setProg(parseInt(e.target.id.split("-")[1]));setStartReview(false); }} className={styles.editIcon}></span>
                    </p>
                </div>
                <div className={styles.pair}>
                    <p className={styles.label}>Difficulty :</p>
                    <p className={styles.value}>
                        {jobPostForm.difficulty} level
                        <span  id={"s-2"}  onClick={(e) => {setProg(parseInt(e.target.id.split("-")[1]));setStartReview(false); }} className={styles.editIcon}></span>
                    </p>
                </div>
                <div className={styles.pair}>
                    <p className={styles.label}>Scale :</p>
                    <p className={styles.value}>
                        {jobPostForm.scale} scale
                        <span  id={"s-2"}  onClick={(e) => {setProg(parseInt(e.target.id.split("-")[1]));setStartReview(false); }} className={styles.editIcon}></span>
                    </p>
                </div>
                <div className={styles.pair}>
                    <p className={styles.label}>Duration :</p>
                    <p className={styles.value}>
                        {jobPostForm.duration} months
                        <span  id={"s-2"}  onClick={(e) => {setProg(parseInt(e.target.id.split("-")[1]));setStartReview(false); }} className={styles.editIcon}></span>
                    </p>
                </div>
                {(jobPostForm.budgetType === "set")
                    ? (<div className={styles.pair}>
                        <p className={styles.label}>Budget :</p>
                        <p className={styles.value}>
                            $ {jobPostForm.budget}
                            <span  id={"s-3"}  onClick={(e) => {setProg(parseInt(e.target.id.split("-")[1]));setStartReview(false); }} className={styles.editIcon}></span>
                        </p>
                    </div>)
                    : (
                        <div className={styles.pair}>
                            <p className={styles.label}>Hourly Rate :</p>
                            <p className={styles.value}>
                                $ {jobPostForm.minHour}  -  $ {jobPostForm.maxHour}
                                <span  id={"s-3"}  onClick={(e) => {setProg(parseInt(e.target.id.split("-")[1]));setStartReview(false); }} className={styles.editIcon}></span>
                            </p>
                        </div>
                    )
                }
                <span className={styles.btnNav}>
                    <Button className={styles.btn} type={"secondary"} shape={"round"}>Discard</Button>
                    <Button className={styles.btn} shape={"round"}>Post Job</Button>
                </span>
            </div>
        </div>

    )
}

export default index
