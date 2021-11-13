import { useState } from 'react';
import styles from './postjob.module.scss'
import TopNav from '../../components/TopNav'
import DevFormComp from '../../components/DevFormComp';
import DevFormReview from '../../components/DevFormReview'



function DevForm() {

    const [devForm, setDevForm] = useState({});
    const [prog, setProg] = useState(0);
    const [startReview, setStartReview] = useState(false);

    return (
        <div className={styles.con}>
            <TopNav />
            <div className={styles.content}>
                {
                    startReview
                        ? <DevFormReview prog={prog} setProg={setProg} devForm={devForm} setDevForm={setDevForm} setStartReview={setStartReview} />
                        : <DevFormComp prog={prog} setProg={setProg} devForm={devForm} setDevForm={setDevForm} setStartReview={setStartReview} />
                }
            </div>
        </div>
    )
}

export default DevForm
