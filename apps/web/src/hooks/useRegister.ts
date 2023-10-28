import React, { useEffect, useState } from "react";
import { Country, StylePreferenceEnum } from "@/interfaces/register";
import { getCountries } from "@/services/countries";

const useRegister = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    value: "+1",
    icon: "🇺🇸",
    label: "United States",
  });
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [stylePreference, setStylePreference] = useState<StylePreferenceEnum>();
  const [userPhoto, setUserPhoto] = useState<File>();

  const handlePhone = (value: string) => {
    setPhone(value);
  };

  const handleCode = (value: string) => {
    setCode(value);
  };

  const handleFirstName = (value: string) => {
    setFirstName(value);
  };

  const handleLastName = (value: string) => {
    setLastName(value);
  };

  const handleUsername = (value: string) => {
    setUsername(value);

    if (value.length < 3) {
      setUsernameError("❌ Usernames must be at least 3 characters long");
      return;
    }

    if (value === "test") {
      setUsernameError(
        "❌ This username has already been taken. Please choose another!"
      );
      return;
    }

    setUsernameError("");
  };

  const handleSelectedCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleStylePreference = (value: StylePreferenceEnum) => {
    setStylePreference(value);
  };

  const handleUserPhoto = (value: File) => {
    setUserPhoto(value);
  };

  const getCountriesData = async () => {
    try {
      const response = await getCountries();

      const countries: Array<any> = response.data.map((country: any) => ({
        icon: country.flag,
        label: country.name.common,
        value: `${country.idd.root}${
          country.idd.suffixes.length === 1 ? country.idd.suffixes[0] : ""
        }`,
      }));

      const sortedCountries = countries.sort((a: any, b: any) =>
        a.label.localeCompare(b.label)
      );

      setCountries(sortedCountries);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  return {
    phone,
    handlePhone,
    code,
    handleCode,
    firstName,
    handleFirstName,
    lastName,
    handleLastName,
    username,
    handleUsername,
    usernameError,
    stylePreference,
    handleStylePreference,
    countries,
    selectedCountry,
    handleSelectedCountry,
    userPhoto,
    handleUserPhoto,
  };
};

export default useRegister;
