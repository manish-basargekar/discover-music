import Style from "./Header.module.scss"

const Header = ({handleClick}) => {
  return (
		<div className={Style.header}>
			<div className={Style.logo}>discover music</div>
			<button onClick={handleClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					// class="ai ai-ArrowCycle"
				>
					<path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16" />
					<path d="M2 12C2 6 6.39 2 11.806 2 16.209 2 19.76 4.335 21 8" />
					<path d="M7 17l-4-1-1 4" />
					<path d="M17 7l4 1 1-4" />
				</svg>
				<span>Refresh</span>
			</button>
		</div>
	);
}

export default Header