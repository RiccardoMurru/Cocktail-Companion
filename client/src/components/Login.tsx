"use strict";

import React from "react";
import { getUser } from "../apiComs/myApi";
import { PageProps } from "../interfaces/Props";

export default function Login({ setUser, setPage }:PageProps) {

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Cast event.target to HTMLFormElement
    const form = event.target as HTMLFormElement;

    // Access input values using their name attributes
    const username = form.username.value;
    const password = form.password.value;

    const response = await getUser(username, password);

    if (response.error) {
      window.alert("Username or password incorrect");
    } else {
      setUser(response);
      setPage("search");
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="form-input"
          name="username"
          placeholder="Enter username here"
          required={true}
        ></input>
        <input
          className="form-input"
          name="password"
          placeholder="Enter password here"
          required={true}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
