"use client";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import { Input } from "..";

const PhoneInput = ({
  onChange,
}: {
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  const [number, setNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("US");

  useEffect(() => {
    if (onChange) {
      // @ts-ignore
      const _fullNumber = `+${getCountryCallingCode(countryCode)}${number}`;
      onChange({ target: { value: _fullNumber } } as any);
    }
  }, [number, countryCode]);

  const getOrderedCountries = () => {
    const countries = getCountries();
    // remove US and CA and put them in the front
    return [
      "US",
      "CA",
      "GB",
      ...countries.filter(
        (country) => country !== "US" && country !== "CA" && country !== "GB"
      ),
    ] as ReturnType<typeof getCountries>;
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <select
        className="border-0 bg-gray-200 px-4 py-3 rounded-2xl appearance-none"
        onChange={(e) => {
          setCountryCode(e.target.value);
        }}
        defaultValue={"US"}
      >
        {getOrderedCountries().map((country) => (
          <option key={country} value={country}>
            {country} +{getCountryCallingCode(country)}
          </option>
        ))}
      </select>

      <Input
        type="tel"
        placeholder="Phone Number"
        value={number}
        onChange={(e) => {
          if (e.target.value.length > 16) return;
          setNumber(e.target.value);
        }}
        className="w-full"
      />
    </div>
  );
};

export default PhoneInput;
