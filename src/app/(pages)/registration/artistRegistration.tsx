'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ArtistRegistration () {
  const [form, setForm] = useState({firstName: "", lastName: "", dateOfBirth: "", stageName: "", phoneNumber: "", location: "", aboutYou: ""});
  const [validity, setvalidity] = useState({firstName: true, lastName: true, dateOfBirth: true, stageName: true, phoneNumber: true, location: true});
  const [pt1Submitted, setPt1Submitted] = useState(false);

  const router = useRouter();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.type = 'date';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!e.target.value) {
        e.target.type = 'text';
      }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = /^(?!.*[<>;'\"()\[\]{}\\&|])\d+$/.test(value);
    setForm({...form, phoneNumber: value});
    setvalidity({...validity, phoneNumber: isValid});
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, input: string) => {
    const value = event.target.value;
    const isValid = /^(?!.*[<>;'\"()\[\]{}\\&|])[a-zA-Z]+$/.test(value);
    setForm({...form, [input]: value});
    setvalidity({...validity, [input]: isValid});
  }

  const handleGenericChange = (event: React.ChangeEvent<HTMLElement>, input: string) => {
    const value = ( event.target as HTMLInputElement || HTMLTextAreaElement).value;
    const isValid = /^(?!.*[<>;'\"()\[\]{}\\&|])/.test(value);
    setForm({...form, [input]: value});
    setvalidity({...validity, [input]: isValid});
  }

  const handleDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(event.target.value);
    const today = new Date();
    const isDateInRange = /^(?!.*[<>;'\"()\[\]{}\\&|])\d{4}-\d{2}-\d{2}$/.test(event.target.value) && !isNaN(inputDate.getTime());
    let isValid = isDateInRange && inputDate <= today;
    setForm({...form, dateOfBirth: event.target.value});
    setvalidity({...validity, dateOfBirth: isValid});
  }

  const formPt2 = (event: React.FormEvent) => {
    setPt1Submitted(true);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validity.firstName && validity.lastName && validity.dateOfBirth && validity.stageName && validity.phoneNumber && validity.location) {
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: (form.firstName + " " + form.lastName),
          dateOfBirth: new Date(form.dateOfBirth),
          contactNumber: form.phoneNumber,
          location: form.location,
          aboutYou: form.aboutYou,
          _id: "67040091932dc78d7584bb38",
          typeOfAccount: "artist",
          email:"test@test.com",
          profilleDetails: {
            aboutMe: form.aboutYou
          }
        }),
      })
      setForm({firstName: "", lastName: "", dateOfBirth: "", stageName: "", phoneNumber: "", location: "", aboutYou: ""});
      setvalidity({firstName: true, lastName: true, dateOfBirth: true, stageName: true, phoneNumber: true, location: true});
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex flex-col">
    <h1 className={`mb-4 text-xl md:text-2xl`}>
      Artist Registration
    </h1>
    {!pt1Submitted && (
    <form className="flex flex-col" onSubmit={formPt2}>
      <input type="text" placeholder="First Name" className="text-black" value={form.firstName} onChange={(e) => handleNameChange(e, "firstName")} required/>
      {!validity.firstName && (
          <p className="text-red-500 mt-[5px]">Invalid first name.</p>
        )}
      <input type="text" placeholder="Last Name" className="text-black" value={form.lastName} onChange={(e) => handleNameChange(e, "lastName")} required/>
      {!validity.lastName && (
          <p className="text-red-500 mt-[5px]">Invalid last name.</p>
        )}
      <input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Date of Birth"
        className="text-black"
        value={form.dateOfBirth}
        onChange={(e) => handleDateInput(e)}
        required
      />
      {!validity.dateOfBirth && (
          <p className="text-red-500 mt-[5px]">Invalid date.</p>
        )}
      <input type="text" placeholder="Stage Name" className="text-black" value={form.stageName} onChange={(e) => handleGenericChange(e, "stageName")}/>
      {!validity.stageName && (
          <p className="text-red-500 mt-[5px]">Invalid stage name.</p>
        )}
      <input type="tel" placeholder="Phone Number" className="text-black" value={form.phoneNumber} onChange={(e) => handlePhoneChange(e)} required/>
      {!validity.phoneNumber && (
          <p className="text-red-500 mt-[5px]">Invalid phone number format.</p>
        )}
      <input type="text" placeholder="Location" className="text-black" value={form.location} onChange={(e) => handleGenericChange(e, "location")} required/>
      {!validity.location && (
          <p className="text-red-500 mt-[5px]">Invalid location.</p>
        )}
      <button type="submit">Submit</button>
    </form>
    )}
    {pt1Submitted && (
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <textarea placeholder="About you" className="text-black" value={form.aboutYou} onChange={(e) => handleGenericChange(e, "aboutYou")} required/>
        <button type="submit">Submit</button>
      </form>
    )}
    </div>
  )
}