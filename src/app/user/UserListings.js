"use client";

import "./UserListings.css";
import { useState, useEffect } from "react";
import Link from "next/link";

import * as api from "../utils";

export default function UserListings() {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    api.fetchFeaturedListings(controller).then((data) => {
      console.log(data)
      setShoes(data);
    });

    return () => controller.abort();
  }, []);

  const handleDelete = (e, shoeId) => {
    e.stopPropagation(); // Stop event propagation
    console.log("deleting", shoeId);
  };

  return (
    <div className="userListings">
      <hr />
      <div className="category">
        <h1>Your Items</h1>
      </div>

      <div className="shoe-grid">
        {shoes?.map((shoe) => (
          <Link className="shoecardbuttonlink" href={`/individualshoe?shoeId=${shoe.id}`} key={shoe.id}>
            <div className="shoe-card">
              <img src={shoe.sideview} alt={shoe.name} />
              <h2>{shoe.name}</h2>
              <div className="priceanddelete">
                <p>${shoe.price}</p>
                <button className="deleteButton" onClick={(e) => handleDelete(e, shoe.id)}>Delete</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
