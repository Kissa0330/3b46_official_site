import styles from '@/styles/Footer.module.css'
import Link from 'next/link'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer_left}>
				<a className={styles.footer_left_a} href="">Twitter</a>
				<a className={styles.footer_left_a} href="">Instagram</a>
				<a className={styles.footer_left_a} href="">Skeb</a>
				<a className={styles.footer_left_a} href="">Shop(coming soon!)</a>
			</div>
			<div className={styles.footer_right}>
				<Link href="/">Top</Link>
			</div>
		</footer>
	)
}