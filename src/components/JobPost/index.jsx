import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import styles from './jobpost.module.scss'
import Button from '../Button'
import skills from './skills'


function Headline({ setProg, jobPostForm, setJobPostForm }) {
    return (
        <form className={styles.formCon} onSubmit={(e) => {
            e.preventDefault();
            (jobPostForm.headline.length > 0) && setProg(p => p + 1);
        }}>
            <h2>Write a headline for your job post</h2>
            <input required type="text" name={"headline"} value={jobPostForm.headline}
                onChange={(e) => {
                    setJobPostForm((form) => {
                        form[e.target.name] = e.target.value;
                        return { ...form }
                    })
                }} />
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
                <Button btnType={"submit"} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </form>
    )
}


function Skills({ setProg, jobPostForm, setJobPostForm }) {

    const [skillKey, setSkillKey] = useState("");
    const [selectedSkillList, setSelectedSkillList] = useState([]);

    useEffect(() => {
        if (jobPostForm?.skills) {
            setSelectedSkillList(jobPostForm?.skills);
        }
    }, [jobPostForm?.skills])

    const addToSelectedSkillList = (skill) => {
        setSelectedSkillList([...new Set([...selectedSkillList, skill])]);
        setSkillKey("");
    }

    return (
        <div className={styles.formCon}>
            <h2>Search skills or add your own</h2>
            <div className={styles.skillSuggestCon}>
                <input id={styles.skillKeyInput}
                    type="text" value={skillKey}
                    list="skillBrowse"
                    onChange={(e) => { setSkillKey(e.target.value) }}
                    onKeyUp={(e) => { (e.key === "Enter" && (skillKey.length > 0)) && (addToSelectedSkillList(skillKey)) }}
                />
                <p className={styles.example}>Example: Java , PHP , ReactJs , AWS</p>
                <datalist id={"skillBrowse"} className={styles.skillSuggest} onClick={(e) => { console.log(e) }}>
                    {
                        skills.map((skill) => {
                            return <option value={skill} />
                        })
                    }
                </datalist>
            </div>
            <span className={styles.subText}>
                <h4>Selected skills</h4>
                <div className={styles.skillCon}>
                    {
                        selectedSkillList.map((s) => {
                            return (
                                <div className={styles.skill}
                                    onClick={() => {
                                        setSelectedSkillList(selectedSkillList.filter((sk) => {
                                            if (sk === s) return false;
                                            return true;
                                        }))
                                    }} >
                                    <p>{s}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </span>
            <div className={styles.btnCon}>
                <Button onClick={() => { setProg(p => (p > 0) ? (p - 1) : p) }} shape={"round"}>Previous</Button>
                <Button onClick={() => {
                    setJobPostForm((form) => { form.skills = selectedSkillList; return { ...form } })
                    if (selectedSkillList.length > 0) { setProg(p => (p < 4) ? (p + 1) : p) }
                    else {
                        toast.error("Please add skills");
                    }
                }} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </div>
    )
}

function Scope({ setProg, jobPostForm, setJobPostForm }) {
    return (
        <div className={styles.formCon}>
            <h2>Describe the Scope of the project</h2>
            <span className={styles.subText}>
                <h4>Scale of the Project</h4>
                <select required name="scale" id="" value={jobPostForm.scale}
                    onChange={(e) => { setJobPostForm({ ...jobPostForm, [e.target.name]: e.target.value }) }}>
                    <option disabled selected>Select (Large / Medium / Small)</option>
                    <option value="large">Large   (longer term or complex initiative)</option>
                    <option value="medium">Medium  (well defined projects ex. a landing page)</option>
                    <option value="small">Small  (quick and straight forward task)</option>
                </select>
            </span>
            <span className={styles.subText}>
                <h4>Duration</h4>
                <select required name="duration" id=""
                    onChange={(e) => { setJobPostForm({ ...jobPostForm, [e.target.name]: e.target.value }) }}>
                    <option disabled selected>Select duration (Months)</option>
                    <option value="3-6">3 - 6  Months</option>
                    <option value="1-3">1 - 3  Months</option>
                    <option value="<1">Less than 1 Month</option>
                </select>
            </span>
            <span className={styles.subText}>
                <h4>Difficulty</h4>
                <select required name="difficulty" id=""
                    onChange={(e) => { setJobPostForm({ ...jobPostForm, [e.target.name]: e.target.value }) }}>
                    <option disabled selected>Select difficulty</option>
                    <option value="entry">Entry (looking for someone relatively new to the field)</option>
                    <option value="intermediate">Intermediate (looking for substantial experience in this field)</option>
                    <option value="expert">Expert (looking for comprehensive and deep expertise in this field)</option>
                </select>
            </span>
            <div className={styles.btnCon}>
                <Button onClick={() => { setProg(p => (p > 1) ? (p - 1) : p) }} shape={"round"}>Previous</Button>
                <Button onClick={() => {
                    if ((jobPostForm?.scale?.length > 0) && (jobPostForm?.duration?.length > 0) && (jobPostForm?.difficulty?.length > 0)) {
                        setProg(p => (p < 4) ? (p + 1) : p)
                    }
                    else {
                        toast.error("Please fill the form", { autoClose: 2000 });
                    }
                }} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </div>
    )
}

function Budget({ setProg, jobPostForm, setJobPostForm, setStartReview }) {

    const [budgetType, setBudgetType] = useState("");

    useEffect(() => {
        if (setJobPostForm.budgetType) {
            budgetType = jobPostForm.budgetType;
        }
    }, [])

    const budgetHandler = () => {
        // setProg(p => ((p < 3) ? (p + 1) : p));
        if (jobPostForm.budgetType === "hourly" || jobPostForm.budgetType === "set") {
            if (jobPostForm.budgetType === "hourly") {
                if (jobPostForm.minHour?.length > 0 && jobPostForm.maxHour?.length) {
                    let newState = { ...jobPostForm };
                    delete newState.budget;
                    setJobPostForm(newState);
                    setStartReview(true);
                }
                else {
                    toast.error("Please fill the details");
                }
            }
            else if (jobPostForm.budgetType === "set") {
                if (jobPostForm.budget?.length > 0) {
                    setStartReview(true);
                }
                else {
                    toast.error("Please fill the details");
                }
            }
        }
        else {
            toast.error("Please select budget type");
        }
    }

    return (
        <div className={styles.formCon}>
            <h2>Budget calculation</h2>
            <span className={styles.subText}>
                <div className={styles.typeOfBudget}>
                    <span onClick={() => { setBudgetType("hourly"); jobPostForm.budgetType = "hourly" }}
                        className={(budgetType === 'hourly') ? (styles.selected) : null}>
                        <img src="./clock.png" alt="" />
                        <p>Hourly rate</p>
                    </span>
                    <span onClick={() => { setBudgetType("set"); jobPostForm.budgetType = "set" }}
                        className={(budgetType === 'set') ? (styles.selected) : null}>
                        <img src="./cash.png" alt="" />
                        <p>Set budget</p>
                    </span>
                </div>

            </span>
            <h4 className={styles.tag} style={{ margin: "2rem auto 1rem" }}>{(budgetType === "hourly") ? ("Add hourly Rate") : ("Input set budget")}</h4>
            {(budgetType !== "") &&
                (<div className={styles.budgetInput}>
                    {(budgetType === "hourly") ?
                        (<>
                            <div className={styles.hourRate}>
                                <p>Min rate</p>
                                <span className={styles.inBox}>$ <input key={"minHour"}
                                    placeholder={"000"} type="number"
                                    value={jobPostForm.minHour}
                                    onChange={(e) => { setJobPostForm({ ...jobPostForm, "minHour": e.target.value }) }}
                                /> / hour</span>
                            </div>
                            <div className={styles.hourRate}>
                                <p>Max rate</p>
                                <span className={styles.inBox}>$ <input key={"maxHour"}
                                    placeholder={"000"} type="number"
                                    value={jobPostForm.maxHour}
                                    onChange={(e) => { setJobPostForm({ ...jobPostForm, "maxHour": e.target.value }) }}
                                /> / hour</span>
                            </div>
                        </>) :
                        (<div className={styles.hourRate}>
                            <p style={{ visibility: "hidden" }}>Budget</p>
                            <span className={styles.inBox}>$ <input
                                value={jobPostForm.budget}
                                onChange={(e) => { setJobPostForm({ ...jobPostForm, "budget": e.target.value }) }}
                                key={"budget"} placeholder={"00000"} type="number" /></span>
                        </div>)
                    }
                </div>)
            }
            <div className={styles.btnCon}>
                <Button onClick={() => { setProg(p => ((p > 1) ? (p - 1) : p)) }} shape={"round"}>Previous</Button>
                <Button onClick={budgetHandler} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </div>
    )
}


function JobPost({ jobPostForm, setJobPostForm, prog, setProg, setStartReview }) {

    const formList =
        [
            <Headline jobPostForm={jobPostForm} setJobPostForm={setJobPostForm} setProg={setProg} />,
            <Skills jobPostForm={jobPostForm} setJobPostForm={setJobPostForm} setProg={setProg} />,
            <Scope jobPostForm={jobPostForm} setJobPostForm={setJobPostForm} setProg={setProg} />,
            <Budget jobPostForm={jobPostForm} setJobPostForm={setJobPostForm} setProg={setProg} setStartReview={setStartReview} />
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
                        {
                            ["Headline", "Skills", "Scope", "budget"]
                                .map((tag, i) => {
                                    return <p>{tag}</p>
                                })
                        }
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
        </div >
    )
}

export default JobPost
