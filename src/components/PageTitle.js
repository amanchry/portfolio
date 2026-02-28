import Link from "next/link";
import React from "react";

const PageTitle = ({ motherMenu, activeMenu, middleMenu, middleMenuHref }) => {
   return (
		<div className="container">
			<div className="dlab-bnr-inr-entry">
				<h1 className="text-white">{motherMenu}</h1>

				<div className="breadcrumb-row">
					<ul className="list-inline">
						<li><Link href="/">Home</Link></li>
						{middleMenu && (
							<>
								<li className="ml-1">
									{middleMenuHref ? <Link href={middleMenuHref}>{middleMenu}</Link> : middleMenu}
								</li>
								<li className="ml-1">{activeMenu}</li>
							</>
						)}
						{!middleMenu && <li className="ml-1">{activeMenu}</li>}
					</ul>
				</div>
			</div>
		</div>	
    );
};

export default PageTitle;
