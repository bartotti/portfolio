import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createContactAsync,
  fetchContactAsync,
  selectContact,
} from "../api/store/createContactSlice";
import { isRejected } from "@reduxjs/toolkit";

const Contact = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(null);

  const ipRequestCount = {};

  useEffect(() => {
    dispatch(fetchContactAsync());
  }, [dispatch]);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(response => response.json())
      .then(data => {
        setLocation(data.ip);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSetName = e => {
    setName(e.target.value);
  };

  const handleSetEmail = e => {
    setEmail(e.target.value);
  };

  const handleSetMessage = e => {
    setMessage(e.target.value);
  };
  const handleAddContact = async (e, location) => {
    if (ipRequestCount[location]) {
      if (ipRequestCount[location] >= 3) {
        alert("Max request limit reached from Send Request");
        return;
      }
      ipRequestCount[location]++;
    } else {
      ipRequestCount[location] = 1;
    }

    dispatch(createContactAsync({ name, email, message }));
    console.log(ipRequestCount);
  };

  return (
    <div className="contact-form-container">
      <h2>Contact</h2>
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={name} onChange={handleSetName} />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleSetEmail}
        />
      </div>
      <div className="form-field">
        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={handleSetMessage} />
      </div>
      <div className="button-container">
        <button type="submit" onClick={handleAddContact}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;
