/**
 * @author M
 * @email mpw0311@163.com
 * @version  1.0.0
 * @description  
 */
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
          {copyright && <span className={styles.copyright}>{copyright}</span>}
        </div>
      )}
      {/* {copyright && <div className={styles.copyright}>{copyright}</div>} */}
    </footer>
  );
};

export default GlobalFooter;
