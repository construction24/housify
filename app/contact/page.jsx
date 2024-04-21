"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

function Contact() {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    phone: "",
    message: "",
  });

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ Name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="container">
      <Navbar />
      <div className="  m-2 min-h-[90vh] flex flex-col justify-center items-center overflow-x-hidden">
        <div className=" border-[1px]  h-[90%] w-[90%] flex flex-col justify-center items-center p-4 shadow-lg rounded-md m-2 ">
          <div className="  w-full flex flex-col justify-center items-center mb-10">
            <div className=" h-[90%] w-[85%] flex flex-col sm:flex-col lg:flex-row md:flex-col justify-center items-center  ">
              <div className=" w-full sm:w-1/4 flex lg:flex-col md:flex-col sm:flex-row flex-col justify-center items-center mb-4 sm:mb-0">
                <div className=" h-12 w-full flex justify-center items-center mb-2">
                  <img
                    src="/contact/location.png"
                    height={50}
                    width={50}
                    alt="this is location logo"
                  />
                </div>
                <div className=" text-sm text-center mt-2">
                  Address: B-31 Rajdhani Park, Nangloi Delhi-41
                </div>
              </div>
              <div className=" w-full sm:w-1/4 flex lg:flex-col md:flex-col sm:flex-row flex-col justify-center items-center mb-4 sm:mb-0">
                <div className=" h-12 w-full flex justify-center items-center mb-2">
                  <img src="/contact/call.png" height={50} width={50} alt="this is call logo" />
                </div>
                <div className=" text-sm text-center mt-2">
                  Phone: 8882108780
                </div>
              </div>
              <div className=" w-full sm:w-1/4 flex lg:flex-col md:flex-col sm:flex-row flex-col justify-center items-center mb-4 sm:mb-0">
                <div className=" h-12 w-full flex justify-center items-center mb-2">
                  <img src="/contact/email.png" height={50} width={50} alt="this is email logo" />
                </div>
                <div className=" text-sm text-center mt-2">
                  Email: srivastavajaya175@gmail.com
                </div>
              </div>
              <div className=" w-full sm:w-1/4 flex lg:flex-col md:flex-col sm:flex-row flex-col justify-center items-center mb-4 sm:mb-0">
                <div className=" h-12 w-full flex justify-center items-center mb-2">
                  <img
                    src="/contact/website.png"
                    height={50}
                    width={50}
                    alt="this is website logo"
                  />
                </div>
                <div className=" text-sm text-center mt-2">
                  Website: Housify.com
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full flex flex-col sm:flex-row justify-center items-center">
            <div className=" w-full sm:w-1/2 flex flex-col justify-center items-center mb-4 sm:mb-0">
              <div className="w-full flex justify-center items-center text-2xl font-semibold text-primary mb-4">
                Contact Us
              </div>
              <div className="w-[70%] mb-4">
                <Input
                  placeholder="Your Name"
                  name="Name"
                  value={formData.Name}
                  onChange={onChangeHandler}
                  className=" border-[#39393a] border-[2px]"
                />
              </div>
              <div className="w-[70%] mb-4">
                <Input
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  className=" border-[#39393a] border-[2px]"
                />
              </div>
              <div className="w-[70%] mb-4">
                <Input
                  placeholder="Your phone no."
                  name="phone"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  className=" border-[#39393a] border-[2px]"
                />
              </div>
              <div className="w-[70%] mb-4">
                <Textarea
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={onChangeHandler}
                  className=" border-[#39393a] border-[2px]"
                />
              </div>
              <div className="w-full flex justify-center items-start mt-4">
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
            <div className="  w-full sm:w-1/2 flex justify-center items-center overflow-hidden mb-4 sm:mb-0">
              <div className=" w-[85%] h-[366px] flex justify-center items-center">
                <div className=" w-[90%] h-[100%]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2511463738547!2d77.0514563967895!3d28.682133000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05cb546dbc05%3A0x80e4a5f90fd6e38e!2sNangloi%20Railway%20Station!5e0!3m2!1sen!2sin!4v1713279310723!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    className="border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
