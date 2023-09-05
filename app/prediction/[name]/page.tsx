interface Params {
	params: { name: string };
}
const getPredictedAge = async (name: string) => {
	const res = await fetch(`https://api.agify.io/?name=${name}`);
	return res.json();
};
const getPredictedGender = async (name: string) => {
	const res = await fetch(`https://api.genderize.io/?name=${name}`);
	return res.json();
};
const getPredictedCountry = async (name: string) => {
	const res = await fetch(`https://api.nationalize.io/?name=${name}`);
	return res.json();
};
const getActualCountry = async (name: string) => {
	const res = await fetch(`https://restcountries.com/v3.1/alpha/${name}`);
	return res.json();
};

export default async function Page({ params }: Params) {
	const ageData = getPredictedAge(params.name);
	const genderData = getPredictedGender(params.name);
	const countryCodeData = getPredictedCountry(params.name);

	const [age, gender, country] = await Promise.all([
		ageData,
		genderData,
		countryCodeData,
	]);

	const actualCountryData = getActualCountry(
		country?.country?.[0]?.country_id
	);
	const [actualCountry] = await Promise.all([actualCountryData]);

	return (
		<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
			<div className="p-8">
				<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
					your Personal info as predicted by api
				</div>
				<div className="block mt-1 text-lg leading-tight font-medium text-black">
					Name : {params.name}
				</div>
				<div className="block mt-1 text-lg leading-tight font-medium text-black">
					Age : {age?.age}
				</div>
				<div className="block mt-1 text-lg leading-tight font-medium text-black">
					Gender : {gender?.gender}{" "}
				</div>
				<div className="block mt-1 text-lg leading-tight font-medium text-black">
					Country Code : {country?.country?.[0]?.country_id}{" "}
				</div>
				<div className="block mt-1 text-lg leading-tight font-medium text-black">
					Country : {actualCountry?.[0]?.name?.common}
				</div>
			</div>
		</div>
	);
}
