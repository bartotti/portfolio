import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createContactAsync,
  fetchContactAsync,
  selectContact,
} from "../api/store/createContactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  let [dbIpAddress, setDbIpAddress] = useState([]);

  const ipRequestCount = {};

  useEffect(() => {
    dispatch(fetchContactAsync());
  }, [dispatch]);

  const fetchContactTable = useSelector(selectContact);
  useEffect(() => {
    // const dbIpAddress = [];

    const ipAddresses = fetchContactTable.map(contact => contact.ip_address);
    dbIpAddress.push(...ipAddresses);
  }, []);
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const ipAddress = data.ip;
        setIpAddress(ipAddress);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);

  const resetIpAddress = e => {
    setDbIpAddress([]);
  };
  const handleSetName = e => {
    setName(e.target.value);
  };

  const handleSetEmail = e => {
    setEmail(e.target.value);
  };

  const handleSetMessage = e => {
    setMessage(e.target.value);
  };
  const handleAddContact = async e => {
    const ip_address = ipAddress;
    if (dbIpAddress.length > 0) {
      let count = 0;
      for (let i = 0; i < dbIpAddress.length; i++) {
        if (dbIpAddress[i] === ipAddress) {
          count++;
          if (count > 3) {
            console.log("You have reached the maximum limit of submissions.");
            return;
          }
        }
      }
      // console.log("this is count " + count);
    }

    // dispatch(createContactAsync({ name, email, message, ip_address }));
    dispatch(createContactAsync({ name, email, message }));

    setEmail("");
    setName("");
    setMessage("");
    // take over around here still fixing the ip_address that goes into db
    window.alert(name + "  Thanks you the contacting !");
    // console.log("my name is ip address ;  " + ipAddress);
    // console.log(dbIpAddress);
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
