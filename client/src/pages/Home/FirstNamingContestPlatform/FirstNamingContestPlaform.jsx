import data from './data';
import styles from './../Home.module.sass';

function FirstNamingContestPlaform () {
  return (
    <section className={styles.firstPlatformSection}>
      <h2>World's #1 Naming Contest Platform</h2>
      <ul className={styles.firstPlatformCards}>
        {data.map(({ icon, title, body }) => (
          <li className={styles.firstPlatformCardContainer}>
            <div className={styles.firstPlatformCard}>
              <img src={icon} />
              <h3 className={styles.firstPlatformCardTitle}>
                {title.map(t => (
                  <div>{t}</div>
                ))}
              </h3>
              <p className={styles.firstPlatformCardBody}>{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FirstNamingContestPlaform;
