import styles from '@ui/layout/layout.module.css';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.mainContainer}>{children}</div>;
}
