import Image from 'next/image';
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
	const { onClick } = props;
	return (
		<div className="owl-nav">
			<div className="owl-next flaticon-right-arrow" onClick={onClick} />
		</div>
	);
}

function SamplePrevArrow(props) {
	const { onClick } = props;
	return (
		<div className="owl-nav">
			<div className=" owl-prev flaticon-left-arrow" onClick={onClick} style={{ zIndex: 1 }} />
		</div>
	);
}


const ImgCarousel = ({ Images }) => {
	var settings = {
		// arrows: true,
		slidesToShow: 1,
		speed: 2500,
		// fade: true,
		navSpeed: 2500,
		infinite: true,
		autoplay: true,
		// nextArrow: <SampleNextArrow />,
		// prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	}

	return (
		<Slider {...settings}>
			{Images.map((image, index) => {
				const src = typeof image === 'string' ? image : image?.Image ?? image;
				const description = typeof image === 'object' && image?.Description != null ? image.Description : '';
				return (
					<div className="item dlab-box   border" key={index}>
						<Image src={src} alt="" width={800} height={500} style={{ width: '100%', height: 'auto' }} unoptimized={typeof src === 'string' && src.startsWith('http')} />
						{description && <p className="p-2">{description}</p>}
					</div>
				);
			})}
		</Slider>
	);
}

export default ImgCarousel