
import DoctorAbout from "./DoctorAbout.jsx";
import {BASE_URL} from "../config.js"
import Error from "./Error.jsx"
import Loader from "./Loading.jsx"
import useFetchData from '../hooks/useFetchData.js'
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const {id} = useParams();
  const {data: doctor, loading, error} = useFetchData(`${BASE_URL}/doctors/${id}`)

  return (
    <div className="bg-primaryColor">
        <section className="pt-[75px] page">
            <div className="max-w-[1170px] px-5 mx-auto">
                {loading && <Loader/>}
                {error && <Error/>}
                {!loading && !error && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px]">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-5">
                    <figure className="lg:max-w-[200px] lg:max-h-[200px]">
                        <img src={doctor.photo} alt="doctorImg" className="w-full" />
                    </figure>
                    <div className="flex flex-col w-[98%]">
                        <span className="bg-[#CCF0F3] flex items-center w-[55%] sm:w-[30%] md:w-[25%] text-irisBlueColor py-1 px-1 sm:px-4 text-[12px] leading-4 lg:text-[14px] lg:leading-7 font-[600] rounded">
                        {doctor.specialization}
                        </span>
                        <h3 className="text-headingColor text-[16px] md:text-[22px] mt-3 font-bold">
                        {doctor.name}
                        </h3>
                        <p className="text-[12px] leading-5 md:text-[14px] md:max-w-[390px]">
                        {doctor.bio}
                        </p>
                    </div>
                    </div>
                    <div className="mt-[50px]">
                    <DoctorAbout name={doctor.name} about={doctor.about} qualifications={doctor.qualifications} experiences={doctor.experiences}/>
                    </div>
                </div>
                </div>)}
            </div>
    </section>
    </div>
  );
};

export default DoctorDetails;
