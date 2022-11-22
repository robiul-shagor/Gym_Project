import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UserContext } from "../../../../../App";

const UserForm = (props) => {
	const history = useNavigate();
	const { userDetail, setUserDetail } = useContext(UserContext);
	const [birthday, setBirthday] = useState(userDetail?.dateOfBarth);
	const [gender, setGender] = useState(userDetail?.gender);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		if (gender) {
			if (birthday) {
				data.dateOfBarth = birthday;
				data.gender = gender;
				setUserDetail(data);
				sessionStorage.setItem("userDetail", JSON.stringify(data));
				history("/checkout/payment");
			} else {
				window.alert("Please select your Date of Birth");
			}
		} else {
			window.alert("Please select your Gender");
		}
	};

	return (
		<div>
			<div className="ms-auto me-auto form_container">
				<form onSubmit={handleSubmit(onSubmit)} className="row g-3 p-3">
					<div className="col-md-6 input_container text-start">
						<label htmlFor="inputFirstName">First Name</label>
						<input
							type="text"
							name="firstName"
							spellCheck="true"
							className="form_input"
							id="inputFirstName"
							defaultValue={userDetail?.firstName}
							{...register("firstName", { required: true })} 
						/>
					</div>

					<div className="col-md-6 input_container text-start">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							name="lastName"
							spellCheck="true"
							className="form_input"
							id="lastName"
							defaultValue={userDetail?.lastName}
							{...register("lastName", { required: true })} 
						/>
					</div>

					<div className="col-md-6 input_container text-start">
						<label htmlFor="inputEmail4">Email</label>
						<input
							type="email"
							name="email"
							spellCheck="true"
							className="form_input"
							id="inputEmail4"
							defaultValue={userDetail?.email}
							{...register("email", { required: true })} 
						/>
					</div>

					<div className="col-md-6 input_container text-start">
						<label htmlFor="mobile">Mobile Number</label>
						<input
							type="number"
							min="0"
							name="mobile"
							className="form_input"
							id="mobile"
							defaultValue={userDetail?.mobile}
							{...register("mobile", { required: true })} 
						/>
					</div>

					<div className="col-md-6 input_container text-start">
						<label htmlFor="gender">Gender</label>
						<select
							className="form_input"
							name="gender"
							id="gender"
							onChange={(e) => setGender(e.target.value)}
							defaultValue={props.gender === "male"}
						>
							<option
								value="male"
							>
								Male
							</option>
							<option
								value="female"
							>
								Female
							</option>
							<option
								value="others"
							>
								Others
							</option>
						</select>
					</div>

					<div className="col-md-6 input_container text-start">
						<label htmlFor="dateOfBarth">Date of Birth</label>
						<DayPicker
							mode="single"
							selected={(date) => setBirthday(date.toLocaleDateString())}
						/>
					</div>

					<div className="col-md-6 input_container text-start">
						<label htmlFor="address">Address</label>
						<input
							type="text"
							name="address"
							spellCheck="true"
							className="form_input"
							id="address"
							defaultValue={userDetail?.address}
							{...register("address", { required: true })}
						/>
					</div>

					<div className="col-md-6 input_container text-start">
						<label htmlFor="country">Country/Region:</label>
						<input
							type="text"
							name="countryOrRegion"
							className="form_input"
							id="country"
							spellCheck="true"
							defaultValue={userDetail?.countryOrRegion}
							{...register("countryOrRegion", { required: true })} 
						/>
					</div>

					<div className="col-md-6 input_container text-start">
						<label htmlFor="city">City:</label>
						<input
							type="text"
							name="city"
							spellCheck="true"
							className="form_input"
							id="city"
							defaultValue={userDetail?.city}
							{...register("city", { required: true })} 
						/>
					</div>

					<div className="col-md-6 input_container text-start">
						<label htmlFor="postCode">Postcode</label>
						<input
							type="Number"
							name="postCode"
							min="0"
							className="form_input"
							id="postCode"
							defaultValue={userDetail?.postCode}
							{...register("postCode", { required: true })}
						/>
					</div>
					<div className="col-md-6 input_container text-end"></div>
					<div className="col-md-6 mt-5 input_container text-end">
						<button className="next_btn" type="submit">
							Next <FontAwesomeIcon icon={faArrowRight} />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserForm;
