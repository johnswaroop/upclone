import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import styles from './jobpost.module.scss'
import Button from '../Button'
import skills from './skills'


function Profile({ setProg, devForm, setDevForm }) {
    return (
        <form className={styles.formCon} onSubmit={(e) => {
            e.preventDefault();
            (devForm.profile.length > 0) && setProg(p => p + 1);
        }}>
            <h2>Enter you Profile</h2>
            <input required type="text" name={"profile"} value={devForm.profile}
                onChange={(e) => {
                    setDevForm((form) => {
                        form[e.target.name] = e.target.value;
                        return { ...form }
                    })
                }} />
            <span className={styles.subText}>
                <h4>Examples</h4>
                <ul>
                    <li>Full-stack Developers</li>
                    <li>Android Develper</li>
                    <li>Blockchain Developer</li>
                    <li>Testing engineer</li>
                </ul>
            </span>
            <div className={styles.btnCon}>
                <Button btnType={"submit"} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </form>
    )
}

function Description({ setProg, devForm, setDevForm }) {

    const setFile = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setDevForm({
                ...devForm,
                resume: file
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    let path = useRef(null);

    return (
        <form className={styles.formCon} onSubmit={() => { setProg(p => p + 1) }}>
            <h2>Describe yourself</h2>
            <textarea
                required
                value={devForm.description}
                onChange={(e) => {
                    setDevForm((form) => {
                        form.description = e.target.value.toString();
                        return form;
                    })
                }} name="" id="" cols="30" rows="10"></textarea>
            <span className={styles.resume}>
                <h3>Upload your CV/Resume</h3>
                <label htmlFor="resume">
                    <h2>Upload</h2>
                    <p ref={path}></p>
                    <input style={{ display: "none" }} id={"resume"} type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0])
                            path.current.innerText = e.target.files[0].name;
                        }
                        }
                    />
                </label>
            </span>
            <div className={styles.btnCon}>
                <Button onClick={() => { setProg(p => ((p > 1) ? (p - 1) : p)) }} shape={"round"}>Previous</Button>
                <Button btnType={"submit"} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </form>

    )
}


function Skills({ setProg, devForm, setDevForm }) {

    const [skillKey, setSkillKey] = useState("");
    const [selectedSkillList, setSelectedSkillList] = useState([]);

    useEffect(() => {
        if (devForm?.skills) {
            setSelectedSkillList(devForm?.skills);
        }
    }, [devForm?.skills])

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
                    setDevForm((form) => { form.skills = selectedSkillList; return { ...form } })
                    if (selectedSkillList.length > 0) { setProg(p => (p < 4) ? (p + 1) : p) }
                    else {
                        toast.error("Please add skills");
                    }
                }} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </div>
    )
}



function Rate({ prog, setProg, devForm, setDevForm, setStartReview }) {

    const setHourlyRate = () => {
        if (devForm.hourlyRate > 0) {
            setStartReview(true);
        }
        else {
            toast.error("Please fill the details");
        }
    }

    useEffect(()=>{
        setDevForm((form) => { form.hourlyRate = 0; return form; })
    },[])
    


    return (
        <div className={styles.formCon}>
            <h2 style={{ margin: "0 auto" }}>Enter your Hourly rate</h2>
            <div className={styles.budgetInput}>
                <div className={styles.hourRate}>
                    <p style={{ visibility: "hidden" }}>Budget</p>
                    <p>Max rate</p>
                    <span className={styles.inBox}>$ <input
                        placeholder={"000"} type="number"
                        onChange={(e) => { setDevForm((form)=>{ form.hourlyRate = parseInt(e.target.value) ; return form}) }}
                    /> / hour</span>
                </div>
            </div>
            <div className={styles.btnCon}>
                <Button onClick={() => { setProg(p => ((p > 1) ? (p - 1) : p)) }} shape={"round"}>Previous</Button>
                <Button onClick={setHourlyRate} shape={"round"} type={"secondary"}>Next</Button>
            </div>
        </div>
    )
}


function DevFormComp({ devForm, setDevForm, prog, setProg, setStartReview }) {

    const formList =
        [
            <Profile devForm={devForm} setDevForm={setDevForm} setProg={setProg} />,
            <Skills devForm={devForm} setDevForm={setDevForm} setProg={setProg} />,
            <Description devForm={devForm} setDevForm={setDevForm} setProg={setProg} />,
            <Rate  prog={prog} devForm={devForm} setDevForm={setDevForm} setProg={setProg} setStartReview={setStartReview} />
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
                title: "Tell us about yourself",
                desc: <p>Use this space to show clients you have the skills and experience they're looking for.
                    <ul>
                        <li>Describe your strengths and skills</li>
                        <li>Highlight projects, accomplishments and education</li>
                        <li>Keep it short and make sure it's error-free</li>
                    </ul>
                </p>
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
                            ["Profile", "Skills", "Description", "Hourly rate"]
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

export default DevFormComp
