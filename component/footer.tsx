import styles from '@/styles/Footer.module.css'
import Link from 'next/link'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer_left}>
				<a className={styles.footer_left_a} href="https://twitter.com/sabi_shiro" target="_blank" rel="noopener noreferrer">Twitter</a>
				<a className={styles.footer_left_a} href="https://www.instagram.com/sabi_shiro/" target="_blank" rel="noopener noreferrer">Instagram</a>
				<a className={styles.footer_left_a} href="" target="_blank" rel="noopener noreferrer">Skeb(実装中)</a>
				<a className={styles.footer_left_a} href="" target="_blank" rel="noopener noreferrer">Shop(実装中)</a>
			</div>
			<div className={styles.footer_right}>
				<Link href="/">Top</Link>
			</div>
		</footer>
	)
}