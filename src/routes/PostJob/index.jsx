import { useState } from 'react';
import styles from './postjob.module.scss'
import TopNav from '../../components/TopNav'
import JobPost from '../../components/JobPost'
import PostJobReview from './../../components/PostJobReview'



function PostJob() {

    const [jobPostForm, setJobPostForm] = useState({});
    const [prog, setProg] = useState(0);
    const [startReview, setStartReview] = useState(false);

    return (
        <div className={styles.con}>
            <TopNav />
            <div className={styles.content}>
                {
                    startReview 
                    ? <PostJobReview prog={prog} setProg={setProg} jobPostForm={jobPostForm} setJobPostForm={setJobPostForm} setStartReview={setStartReview}/> 
                    : <JobPost prog={prog} setProg={setProg} jobPostForm={jobPostForm} setJobPostForm={setJobPostForm} setStartReview={setStartReview}/>
                }
            </div>
        </div>
    )
}

export default PostJob
