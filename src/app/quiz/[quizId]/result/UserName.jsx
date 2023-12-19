"use client";

export default function UserName() {
  return <span>{window.localStorage.getItem("name")}</span>;
}
