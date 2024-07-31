import geoid_1 from '../public/images/projects/geoid_1.jpg';
import geoid_2 from '../public/images/projects/geoid_2.jpg';
import geoid_3 from '../public/images/projects/geoid_3.jpg';
import geoid_4 from '../public/images/projects/geoid_4.jpg';
import geoid_5 from '../public/images/projects/geoid_5.jpg';
import hallabol from '../public/images/projects/hallabol.jpg';
import india_drought_monitor_1 from '../public/images/projects/india_drought_monitor_1.jpg';
import india_drought_monitor_2 from '../public/images/projects/india_drought_monitor_2.jpg';
import india_drought_monitor_3 from '../public/images/projects/india_drought_monitor_3.jpg';
import india_drought_monitor_4 from '../public/images/projects/india_drought_monitor_4.jpg';
import wcl_iitgn from '../public/images/projects/wcl_iitgn.jpg';
import sports_iitgn from '../public/images/projects/sports_iitgn.jpg';
import google_clone from '../public/images/projects/google_clone.jpg';
import lulc_analysis from '../public/images/projects/lulc_analysis.jpg';
import synoce from '../public/images/projects/synoce.jpg';
import food_waste_management from '../public/images/projects/food_waste_management.jpg';
import kentrix_persona from '../public/images/projects/kentrix_persona.jpg';
import kentrix_persona2 from '../public/images/projects/kentrix_persona2.jpg';
import kentrix_mahindra from '../public/images/projects/kentrix_mahindra.jpg';
import kentrix_mahindra2 from '../public/images/projects/kentrix_mahindra2.jpg';
import kentrix_karma from '../public/images/projects/kentrix_karma.jpg';
import reefs_lab from '../public/images/projects/reefs-lab.jpg';
import pdc_iitgn from '../public/images/projects/pdc-iitgn.jpg';
import flood_forecasting_1 from '../public/images/projects/flood_forecasting_1.jpg';
import flood_forecasting_2 from '../public/images/projects/flood_forecasting_2.jpg';
import flood_forecasting_3 from '../public/images/projects/flood_forecasting_3.jpg';
import Choropleth_Map_Generator_1 from '../public/images/projects/Choropleth_Map_Generator_1.jpg';
import Choropleth_Map_Generator_2 from '../public/images/projects/Choropleth_Map_Generator_2.jpg';
import Combat_Sports_Analytics_1 from '../public/images/projects/Combat_Sports_Analytics_1.jpg';
import Combat_Sports_Analytics_2 from '../public/images/projects/Combat_Sports_Analytics_2.jpg';
import Combat_Sports_Analytics_3 from '../public/images/projects/Combat_Sports_Analytics_3.jpg';
import India_Natural_Hazards_1 from '../public/images/projects/India_Natural_Hazards_1.jpg';
import India_Natural_Hazards_2 from '../public/images/projects/India_Natural_Hazards_2.jpg';
import Agrocast_1 from '../public/images/projects/Agrocast_1.jpg';
import Agrocast_2 from '../public/images/projects/Agrocast_2.jpg';
import drought_atlas_1 from '../public/images/projects/drought_atlas_1.jpg';
import drought_atlas_2 from '../public/images/projects/drought_atlas_2.jpg';
import drought_atlas_3 from '../public/images/projects/drought_atlas_3.jpg';
import india_flood_atlas_1 from '../public/images/projects/india_flood_atlas_1.jpg';
import india_flood_atlas_2 from '../public/images/projects/india_flood_atlas_2.jpg';
import india_flood_atlas_3 from '../public/images/projects/india_flood_atlas_3.jpg';
import india_flood_atlas_4 from '../public/images/projects/india_flood_atlas_4.jpg';
import jalkruti_1 from '../public/images/projects/jalkruti_1.jpg';
import jalkruti_2 from '../public/images/projects/jalkruti_2.jpg';



export const ProjectsDetailsData =[

    // {
    //     ProjectName:"Jalkruti Water Solutions Pvt Ltd Website",
    //     TagLine:"",
    //     Description:"The flood atlas of India is based on the gridded simulations of flood dynamics. The atlas provides a glimpse of past annual maximum flooded area during 1901-2020.",
    //     Tags:['Web Development','Next JS'],
    //     Image:jalkruti_1,
    //     CarouselImages:[jalkruti_1,jalkruti_2],
    //     Link:"https://www.jalkruti.com/",
    //     Technology:['Next JS']

    // },
    {
        ProjectName:"India Flood Atlas",
        TagLine:"The flood atlas of India is based on the gridded simulations of flood dynamics. The atlas provides a glimpse of past annual maximum flooded area during 1901-2020.",
        Description:"The flood atlas of India is based on the gridded simulations of flood dynamics. The atlas provides a glimpse of past annual maximum flooded area during 1901-2020.",
        Tags:['WebGIS Development', 'Full Stack Web Development',"React JS", "Leaflet JS"],
        Image:india_flood_atlas_1,
        CarouselImages:[india_flood_atlas_1, india_flood_atlas_2,india_flood_atlas_3,india_flood_atlas_4],
        Link:"https://indiafloodatlas.in/",
        Technology:['React JS', 'Leaflet JS']

    },
    {
        ProjectName:"Drought Atlas of India",
        TagLine:"Drought atlas of India is based on the high-resolution Standardised Precipitation Evapotranspiration Index (SPEI). The atlas provide glimpse of past droughts in summer monsoon, winter monsoon, calender year, and water year during 1901-2020.",
        Description:"Drought atlas of India is based on the high-resolution Standardised Precipitation Evapotranspiration Index (SPEI). The atlas provide glimpse of past droughts in summer monsoon, winter monsoon, calender year, and water year during 1901-2020.",
        Tags:['WebGIS Development', 'Full Stack Web Development',"React JS", "Leaflet JS"],
        Image:drought_atlas_1,
        CarouselImages:[drought_atlas_1, drought_atlas_2,drought_atlas_3],
        Link:"https://indiadroughtatlas.in/",
        Technology:['React JS', 'Leaflet JS']

    },
    {
        ProjectName:"Combat Sports Analytics Dashboard",
        TagLine:"A dashboard that enables users to upload sports video footage, select specific segments of interest, and generate 3D interactive animations of the selected video segment.",
        Description:"A dashboard that enables users to upload sports video footage, select specific segments of interest, and generate 3D interactive animations of the selected video segment. MotionBERT and AlphaPose ML models were used to estimate the 3D animation from 2D video. These 3D animations provide valuable insights to improve athletes performance, refine strategies, and enhance training routines.",
        Tags:['Web Development', 'Full Stack Web Development',"React JS", "Flask"],
        Image:Combat_Sports_Analytics_1,
        CarouselImages:[Combat_Sports_Analytics_1, Combat_Sports_Analytics_2,Combat_Sports_Analytics_3],
        Link:"https://ringmaster-analytics.onrender.com/",
        Technology:['React JS', 'Flask','MongoDB','Machine Learning']

    },


    {
        ProjectName:"Flood Forecasting System Using Machine Learning",
        TagLine:"A machine learning-based flood forecasting system for the Narmada basin, Inspired by Google’s Flood Forecasting Initiative. Used Thresholding model to predict flood extents based on river gauge measurements.",
        Description:"A machine learning-based flood forecasting system for the Narmada basin, Inspired by Google’s Flood Forecasting Initiative. Used Thresholding model to predict flood extents based on river gauge measurements. Trained and tested the model on 30 and 5 years of historical flood events data, respectively, showcasing an impressive accuracy of 86%. Effectively demonstrated the system’s capability in accurately predicting specific historical flood incidents.",
        Tags:['Web Development', 'Full Stack Web Development',"React JS", "Flask"],
        Image:flood_forecasting_1,
        CarouselImages:[flood_forecasting_1, flood_forecasting_2,flood_forecasting_3],
        Link:"https://flood-forecasting-dashboard.onrender.com/",
        Technology:['React JS', 'Flask', 'Machine Learning']

    },

    {
        ProjectName:"Persona 360 Dashboard",
        TagLine:"Dashboard to create Meta campaigns with enhanced niche segmentation",
        Description:"This dashboard was designed to enable users to create Meta campaigns with enhanced niche segmentation. By leveraging over 100+ filters, such as Income, demographic behavior, NCCS, and more, users gained valuable insights into their target audience. My role in this project involved crafting the frontend using React JS and developing the backend with Flask.",
        Tags:['Web Development', 'Full Stack Web Development',"React JS", "Flask"],
        Image:kentrix_persona,
        CarouselImages:[kentrix_persona, kentrix_persona2],
        Link:"",
        Technology:['React JS', 'Flask',]

    },
    {
        ProjectName:"Kentrix Mahindra",
        TagLine:"A dashboard for generating cohort reports and feature importance analyses of sales data using machine learning models and geospatial analysis.",
        Description:"The Mahindra Dashboard allows users to input sales data, generating cohort reports and feature importance analyses using machine learning models and geospatial analysis. The incorporation of geolocation data enriched the visual representation of insights. I played a significant role in building this dashboard, utilizing React JS for the frontend, Flask for the backend, and PostgreSQL for database management. Additionally, I implemented an admin interface within the dashboard, empowering administrators to manage users effectively.",
        Tags:['Web Development','WebGIS Development', 'Full Stack Web Development',"React JS", "Flask"],
        Image:kentrix_mahindra,
        CarouselImages:[kentrix_mahindra, kentrix_mahindra2],
        Link:"",
        Technology:['React JS', 'Flask','Machine Learning']

    },
    {
        ProjectName:"Kentrix Karma",
        TagLine:"A software to extract Batch API Data",
        Description:"The main objective of the Karma Dashboard/Software was to fetch data for a specific address from Kentrix API. This versatile dashboard enabled users to fetch data for a single address or perform batch operations using CSV files. Upon retrieving the data, users could download the output as a CSV file. To ensure smooth accessibility, I developed both .dmg and .exe setups for Mac and Windows users, respectively. The Karma Dashboard was built using React JS as the frontend framework and Electron JS as the software framework.",
        Tags:['Web Development', 'Software Development',"React JS", "Flask"],
        Image:kentrix_karma,
        CarouselImages:[kentrix_karma],
        Link:"",
        Technology:['React JS', 'Flask',]

    },
    {
        ProjectName:"AgroCast Analytics Website",
        TagLine:"AgroCast Analytics website, an Agritech startup based in Gujarat",
        Description:"Developed & Designed UI of AgroCast Analytics website, an Agritech startup based in Gujarat. Utilized Next.js to ensure SEO-friendliness, significantly enhancing the website’s search engine optimization (SEO).",
        Tags:['Web Development', 'Frontend Development',"Next JS"],
        Image:Agrocast_1,
        CarouselImages:[Agrocast_1, Agrocast_2],
        Link:"https://agrocastanalytics.com/",
        Technology:[ 'Next JS',]

    },
    {
        ProjectName:"India Drought Monitor",
        TagLine:"A real-time drought monitoring and forecasting web application",
        Description:"A real-time drought monitoring and forecasting web application that provides valuable insights into drought conditions in India and updates on a weekly basis.",
        Tags:['Web Development', 'WebGIS Development',"React JS"],
        Image:india_drought_monitor_1,india_drought_monitor_2,india_drought_monitor_3,india_drought_monitor_4,
        CarouselImages:[india_drought_monitor_1],
        Link:"https://indiadroughtmonitor.in/",
        Technology:['React JS', 'Leaflet JS',]

    },
    {
        ProjectName:"Geoportal of India Dams",
        TagLine:"Interactive Database of over 5400 dams across India",
        Description:"A WebGIS application that contains database of over 5400 dams across India. Implemented features such as catchment characteristics, LULC analysis, and flood risk assessment, to provide valuable insights and data of Indian dams to the users.",
        Tags:['Web Development', 'WebGIS Development',"React JS",],
        Image:geoid_1,
        CarouselImages:[geoid_1,geoid_2,geoid_3,geoid_4,geoid_5],
        Link:"https://geoportalofindiandams.github.io/GeoID/",
        Technology:['React JS', 'Leaflet JS',]

    },
    
    {
        ProjectName:"India Natural Hazards Geoportal",
        TagLine:"Developed a responsive WebGIS dashboard displaying India’s natural hazards data (drought, flood, earthquake, cyclone, epidemics, lightning, etc.) on interactive maps.",
        Description:"A responsive WebGIS dashboard displaying India’s natural hazards data (drought, flood, earthquake, cyclone, epidemics, lightning, etc.) on interactive maps. Implemented map download functionality to enhance data accessibility for users. Designed and implemented an engaging dynamic quiz feature.",
        Tags:['Web Development', 'WebGIS Development',"React JS",],
        Image:India_Natural_Hazards_2,
        CarouselImages:[India_Natural_Hazards_1, India_Natural_Hazards_2],
        Link:"https://geospatial-smart-thinkers.github.io/natural-hazards/",
        Technology:['React JS', 'Flask',]

    },
    {
        ProjectName:"Choropleth Map Generator",
        TagLine:"An open-source WebGIS Dashboard for designing and customizing choropleth maps.",
        Description:"An open-source WebGIS Dashboard for designing and customizing choropleth maps.",
        Tags:['Web Development', 'WebGIS Development',"React JS",],
        Image:Choropleth_Map_Generator_2,
        CarouselImages:[Choropleth_Map_Generator_1, Choropleth_Map_Generator_2],
        Link:"https://geospatial-smart-thinkers.github.io/choropleth-map/",
        Technology:['React JS', 'Flask',]

    },

    {
        ProjectName:"Hallabol",
        TagLine:"The intra-institute annual sports festival of IITGN.",
        Description:"",
        Tags:['Web Development',"React JS",],
        Image:hallabol,
        CarouselImages:[hallabol],
        Link:"https://aman1chaudhary.github.io/hallabol-23/",
        Technology:["React JS"]

    },
    {
        ProjectName:"WCL IITGN",
        TagLine:"Water & Climate Lab, IIT Gandhinagar.",
        Description:"Official website of Water & Climate Lab, IIT Gandhinagar. The website features several tools, including a research database, current people and alumni database, and publication search function. The website played a crucial role in promoting the lab's research and increasing its visibility.",
        Tags:['Web Development',"React JS",],
        Image:wcl_iitgn,
        CarouselImages:[wcl_iitgn],
        Link:"https://vmishra.people.iitgn.ac.in/water&climate/",
        Technology:["React JS"]

    },
    {
        ProjectName:"PDC, IIT Gandhinagar",
        TagLine:"Professional Development Council, IIT Gandhinagar",
        Description:"IIT Gandhinagar",
        Tags:['Web Development', 'Next JS'],
        Image:pdc_iitgn,
        CarouselImages:[pdc_iitgn],
        Link:"https://pdc-nextjs.vercel.app/",
        Technology:["React JS"]

    },
    {
        ProjectName:"LULC Analysis Using Google Earth Engine",
        TagLine:"The percent fraction cover for various LULC classes and its dynamic nature from 2015-2019.",
        Description:"The percent fraction cover for various LULC classes and its dynamic nature from 2015-2019.",
        Tags:['Web Development','WebGIS Development', ],
        Image:lulc_analysis,
        CarouselImages:[lulc_analysis],
        Link:"https://amanchaudhary.users.earthengine.app/view/geoid--lulc-analysis#lat=23.7;lon=78.5;zoom=5;",
        Technology:["Google Earth Engine"]

    },
    {
        ProjectName:"REEFS Lab",
        TagLine:"Redefining Energy For Sustainability Lab, IIT Gandhinagar",
        Description:"REEFS Lab, IIT Gandhinagar",
        Tags:['Web Development', "React JS",],
        Image:reefs_lab,
        CarouselImages:[reefs_lab],
        Link:"https://reefs-lab.github.io/lab/",
        Technology:["React JS"]

    },

    // {
    //     ProjectName:"IITGN Sports Website",
    //     TagLine:"IITGN Sports Website",
    //     Description:"IITGN Sports Website",
    //     Tags:['Web Development', ],
    //     Image:sports_iitgn,
    //     Image2:sports_iitgn,
    // CarouselImages:[sports_iitgn],
    //     Link:"https://jmanjaly2.wixsite.com/mysite",
    //     Technology:["React JS"]

    // },
    {
        ProjectName:"Food Waste Management Portal",
        TagLine:"Food Waste Management Portal, IIT Gandhinagar Mess",
        Description:"Footprint matrix to analyse the food wastage in college mess by calculating water, carbon, energy and labour footprint of wasted food.",
        Tags:['Web Development', "HTML", "CSS", "Javascript"],
        Image:food_waste_management,
        CarouselImages:[food_waste_management],
        Link:"https://aman1chaudhary.github.io/foodwaste-management/",
        Technology:["HTML","CSS","Java Script"]

    },

    {
        ProjectName:"SynOCE",
        TagLine:"Official website of Civil Engineering Society, IIT Gandhinagar",
        Description:"Official website of Civil Engineering Society, IIT Gandhinagar",
        Tags:['Web Development', "React JS",],
        Image:synoce,
        CarouselImages:[synoce],
        Link:"https://aman1chaudhary.github.io/synoce-iitgn/",
        Technology:["React JS"]

    },
    // {
    //     ProjectName:"Google Clone",
    //     TagLine:"Google Clone",
    //     Description:"Google Clone",
    //     Tags:['Web Development', "Next JS"],
    //     Image:google_clone,
    //     Image2:google_clone,
    // CarouselImages:[google_clone],
    //     Link:"https://my-google-xi.vercel.app/",
    //     Technology:["React JS", "Next JS"]

    // },


] 


