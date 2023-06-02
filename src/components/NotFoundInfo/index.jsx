import styles from './NotFoundInfo.module.less'

const NotFoundInfo = () => {
  return (
    <div className={styles.notfound}>
      <h1>
        <span className={styles.emoji}>😒</span>
        <br />
        Такой страницы не существует
      </h1>
    </div>
  );
};

export default NotFoundInfo;
