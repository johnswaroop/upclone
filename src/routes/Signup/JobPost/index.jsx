import React, { useState } from 'react'
import styles from './jobpost.module.scss'
import Button from '../../../components/Button'


function Headline({ setProg }) {
    return (
        <div className={styles.formCon}>
            <h2>Write a headline for your job post</h2>
            <input type="text" />
            <span className={styles.subText}>
                <h4>Example titles</h4>
                <ul>
                    <li>Build Macros for App On Android Emulators</li>
                    <li>Coaching Website Manager and Editor</li>
                    <li>Publish Many Android Apps in Google Play</li>
                    <li>NodeJs Socket.IO Messaging app</li>
                </ul>
            </span>
            <div className={styles.btnCon}>
                <Button onClick={() => { setProg(p => p + 1) }} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </div>
    )
}

function Skills({ setProg }) {

    let skills = ["JavaScript", "CSS", "HTML", "Website Development", "PHP", "API Development", "WordPress", "HTML5", "Web Design", "Python", "Web Application", "API Integration", "jQuery", "MySQL", "React"];

    return (
        <div className={styles.formCon}>
            <h2>Search skills or add your own</h2>
            <input type="text" />
            <span className={styles.subText}>
                <h4>Popular Skills</h4>
                <div className={styles.skillCon}>
                    {
                        skills.map((s) => {
                            return (<div className={styles.skill}><p>{s}</p></div>)
                        })
                    }
                </div>
            </span>
            <div className={styles.btnCon}>
                <Button onClick={() => { setProg(p => (p > 0) ? (p - 1) : p) }} shape={"round"}>Previous</Button>
                <Button onClick={() => { setProg(p => (p < 4) ? (p + 1) : p) }} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </div>
    )
}

function Scope({ setProg }) {
    return (
        <div className={styles.formCon}>
            <h2>Describe the Scope of the project</h2>
            <span className={styles.subText}>
                <h4>Scale of the Project</h4>
                <select name="" id="">
                    <option value="large">Large   (longer term or complex initiative)</option>
                    <option value="medium">Medium  (well defined projects ex. a landing page)</option>
                    <option value="small">Small  (quick and straight forward task)</option>
                </select>
            </span>
            <span className={styles.subText}>
                <h4>Duration</h4>
                <select name="" id="">
                    <option value="3-6">3 - 6  Months</option>
                    <option value="1-3">1 - 3  Months</option>
                    <option value="<1">Less than 1 Month</option>
                </select>
            </span>
            <span className={styles.subText}>
                <h4>Difficulty</h4>
                <select name="" id="">
                    <option value="entry">Entry (looking for someone relatively new to the field)</option>
                    <option value="intermediate">Intermediate (looking for substantial experience in this field)</option>
                    <option value="expert">Expert (looking for comprehensive and deep expertise in this field)</option>
                </select>
            </span>
            <div className={styles.btnCon}>
                <Button onClick={() => { setProg(p => (p > 1) ? (p - 1) : p) }} shape={"round"}>Previous</Button>
                <Button onClick={() => { setProg(p => (p < 4) ? (p + 1) : p) }} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </div>
    )
}

function Budget({ setProg }) {

    const [budgetType, setBudgetType] = useState("")

    return (
        <div className={styles.formCon}>
            <h2>Budget calculation</h2>
            <span className={styles.subText}>
                <div className={styles.typeOfBudget}>
                    <span onClick={() => { setBudgetType("hourly") }}
                        className={(budgetType === 'hourly') ? (styles.selected) : null}>
                        <img src="./clock.png" alt="" />
                        <p>Hourly rate</p>
                    </span>
                    <span onClick={() => { setBudgetType("set") }}
                        className={(budgetType === 'set') ? (styles.selected) : null}>
                        <img src="./cash.png" alt="" />
                        <p>Set budget</p>
                    </span>
                </div>

            </span>
            <h4 className={styles.tag} style={{ margin: "2rem auto 1rem" }}>{(budgetType === "hourly") ? ("Add hourly Rate") : ("Input set budget")}</h4>
            <div className={styles.budgetInput}>
                {(budgetType === "hourly") ?
                    (<>
                        <div className={styles.hourRate}>
                            <p>Min rate</p>
                            <span className={styles.inBox}>$ <input placeholder={"000"} type="text" /> / hour</span>
                        </div>
                        <div className={styles.hourRate}>
                            <p>Max rate</p>
                            <span className={styles.inBox}>$ <input placeholder={"000"} type="text" /> / hour</span>
                        </div>
                    </>) :
                    (<div className={styles.hourRate}>
                        <p></p>
                        <span className={styles.inBox}>$ <input placeholder={"000"} type="text" /></span>
                    </div>)
                }
            </div>
            <div className={styles.btnCon}>
                <Button onClick={() => { setProg(p => ((p > 1) ? (p - 1) : p)) }} shape={"round"}>Previous</Button>
                <Button onClick={() => { setProg(p => ((p < 3) ? (p + 1) : p)) }} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </div>
    )
}


function JobPost() {
    const [prog, setProg] = useState(0);

    const formList =
        [
            <Headline setProg={setProg} />,
            <Skills setProg={setProg} />,
            <Scope setProg={setProg} />,
            <Budget setProg={setProg} />
        ]
    const descList =
        [
            {
                title: "Lets start with a strong headline",
                desc: "This helps your job post out to the right candidates. its the first thing they'll see, so make it count!"
            },
            {
                title: "Great what skills does the job require",
                desc: "Software development is a dynamic domain, where programming languages, frameworks and technologies may live or die within a short time period. Job market needs are also changing, but the demand for developers remains high."
            },
            {
                title: "Almost Done Estimate the scope of the project",
                desc: "For any new software project, it is necessary to know how much it will cost to develop and how much development time will it take. These estimates are needed before development is initiated"
            },
            {
                title: "Tell us about your budget",
                desc: "For any new software project, it is necessary to know how much it will cost to develop and how much development time will it take. These estimates are needed before development is initiated"
            },
        ]

    return (
        <div className={styles.jobpost}>
            <div className={styles.desc}>
                <div className={styles.progressCon}>
                    <div className={styles.progress}>
                        <span className={styles.progInner} style={{ width: `${((prog + 1) / 4) * 100}%` }}></span>
                    </div>
                    <div className={styles.progTags}>
                        <p>Headline</p>
                        <p>Skills</p>
                        <p>Scope</p>
                        <p>budget</p>
                    </div>
                </div>

                <div className={styles.content} key={"desc" + prog}>
                    <h1>{descList[prog].title}</h1>
                    <p>{descList[prog].desc}</p>
                </div>
            </div>
            <div className={styles.form}>
                {formList[prog]}
            </div>
        </div>
    )
}

export default JobPost
