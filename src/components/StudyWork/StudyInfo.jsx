import React, { useEffect, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import { authApi } from '../../services/api';

export default function StudyInfo({studyId}) {

  // 서버에서 스터디 info 받아오기
  const [studyThumbnail, setStudyThumbnail] = useState('');
  const [studyCategory, setStudyCategory] = useState('');
  const [studyName, setStudyName] = useState('');
  const [studyCurrentMembers, setStudyCurrentMembers] = useState(0);
  const [studyMaxMembers, setStudyMaxMembers] = useState(0);

  useEffect(() => {
    authApi.get(`studies/${studyId}`)
    .then((response) => {
      
      setStudyThumbnail(response.data.thumbnail);
      setStudyCategory(response.data.category);
      setStudyName(response.data.name);
      setStudyCurrentMembers(response.data.currentMembers);
      setStudyMaxMembers(response.data.maxMembers);

      document.getElementsByClassName(`${styles.info_container}`)[0].style.backgroundColor = `${response.data.thumbnailBackground}`;
    })
    .catch((e) => {
      console.log(e)
    })
  })

  
    return (
      <div>
        <div className={styles.info_container}>
          <div className={styles.infoes}>
            <div className={styles.info_left}>
              <div className={styles.info_left_element}>
                <img src={process.env.PUBLIC_URL + `/img/study_thumbnail/${studyThumbnail}`}/>
              </div>
            </div>
            <div className={styles.info_right}>
              <div className={styles.info_right_element}>
                <p className={styles.info_category}>#{studyCategory}</p>
                <p className={`${styles.bold_24} ${styles.info_studyname}`}>{studyName}</p>
                <p className={styles.regular_18}>{studyCurrentMembers} / {studyMaxMembers}</p>
              </div>
              <div className={`${styles.info_right_buttons}`}>
                <div>
                  스터디정보수정
                </div>
                <div>
                  신청한 사람 보기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
