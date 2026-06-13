"use client";

import { useEffect, useState } from "react";

export default function
ListMyBusinessPage() {

  const [categories,
    setCategories] =
    useState([]);

  const [cities,
    setCities] =
    useState([]);

  const [formData,
    setFormData] =
    useState({

      name: "",

      description: "",

      phone: "",

      whatsapp: "",

      categoryId: "",

      cityId: "",

    });

  useEffect(() => {

    fetch(
      "http://localhost:5000/categories"
    )
      .then(r => r.json())
      .then(setCategories);

    fetch(
      "http://localhost:5000/cities"
    )
      .then(r => r.json())
      .then(setCities);

  }, []);

  async function submitBusiness() {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      window.location.href =
        "/login";

      return;

    }

    const res =
      await fetch(

        "http://localhost:5000/vendors/submit",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,

          },

          body:
            JSON.stringify(
              formData
            ),

        }

      );

    if (res.ok) {

      alert(
        "Business submitted successfully"
      );

      window.location.href =
        "/vendor-dashboard";

    }

  }

  return (

    <div
      style={{
        padding: "20px",
      }}
    >

      <h1>
        List My Business
      </h1>

      <input
        placeholder="Business Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({

            ...formData,

            name:
              e.target.value,

          })
        }
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={
          formData.description
        }
        onChange={(e) =>
          setFormData({

            ...formData,

            description:
              e.target.value,

          })
        }
      />

      <br /><br />

      <input
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) =>
          setFormData({

            ...formData,

            phone:
              e.target.value,

          })
        }
      />

      <br /><br />

      <input
        placeholder="WhatsApp"
        value={formData.whatsapp}
        onChange={(e) =>
          setFormData({

            ...formData,

            whatsapp:
              e.target.value,

          })
        }
      />

      <br /><br />

      <select
        value={
          formData.categoryId
        }
        onChange={(e) =>
          setFormData({

            ...formData,

            categoryId:
              e.target.value,

          })
        }
      >

        <option>
          Select Category
        </option>

        {categories.map(
          (c: any) => (

            <option
              key={c.id}
              value={c.id}
            >
              {c.name}
            </option>

          )
        )}

      </select>

      <br /><br />

      <select
        value={formData.cityId}
        onChange={(e) =>
          setFormData({

            ...formData,

            cityId:
              e.target.value,

          })
        }
      >

        <option>
          Select City
        </option>

        {cities.map(
          (c: any) => (

            <option
              key={c.id}
              value={c.id}
            >
              {c.name}
            </option>

          )
        )}

      </select>

      <br /><br />

      <button
        onClick={
          submitBusiness
        }
      >

        Submit Business

      </button>

    </div>

  );

}