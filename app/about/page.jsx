"use client";
import { useState } from "react";

function AboutPage() {
  const [count, useCount] = useState(0);
  return (
    <div>
      <h1>count : {count}</h1>
    </div>
  )
}

export default AboutPage;
