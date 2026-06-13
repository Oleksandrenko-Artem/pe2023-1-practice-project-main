import { Link } from 'react-router-dom';
import styles from './Home.module.sass';
import CONSTANTS from './../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function NamingContest () {
  return (
    <section className={styles.namingContestSection}>
      <div className={styles.namingContestInfo}>
        <div>
          <img src={`${STATIC_IMAGES_PATH}namingContest.svg`} />
        </div>
        <div className={styles.namingContestText}>
          <h2 className={styles.namingContestHead}>Naming Contests</h2>
          <p className={styles.namingContestP}>
            Custom name suggestions from 100s of naming experts as you are
            guided through our naming agency-style process
          </p>
        </div>
      </div>
      <div className={styles.namingContestLinkContainer}>
        <Link className={styles.namingContestLink} to='/startContest'>
          Get a Custom Name
        </Link>
      </div>
    </section>
  );
}

export default NamingContest;
