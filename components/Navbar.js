import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {

	const { user, logout } = useAuth();
	const router = useRouter();

	const logoutHandler = async () => {
		try {
			await logout();
			router.push("/login");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white text-black mb-3 shadow-md">
				<div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
					<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
						{/* eslint-disable-next-line @next/next/link-passhref */}
						<Link
							href="/"
							className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black"
						>
							<button>DevStore</button>
						</Link>
					</div>
					<div
						className={
							"lg:flex flex-grow items-center flex"
						}
						id="example-navbar-danger"
					>
						<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
							{user ? (
								<>
									<li className="nav-item mx-2">
										<Link
											href="/folder"
											className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
										>
											Dashboard
										</Link>
									</li>
									<li className="nav-item mx-2">
										<button
											onClick={logoutHandler}
											className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
										>
											Logout
										</button>
									</li>
								</>
							) : (
								<>
									<li className="nav-item mx-2">
										<Link
											href="/login"
											className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
										>
											Login
										</Link>
									</li>
									<li className="nav-item mx-2">
										<Link
											href="/signup"
											className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
										>
											Signup
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;