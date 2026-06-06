"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewForm({
    vendorId,
}: {
    vendorId: number;
}) {

    const [reviewerName, setReviewerName] =
        useState("");

    const [rating, setRating] =
        useState("5");

    const [comment, setComment] =
        useState("");
    const router = useRouter();

    async function submitReview() {

        const payload = {

            reviewerName,

            rating,

            comment,

        };

        const res = await fetch(

            `http://localhost:5000/vendors/${vendorId}/reviews`,

            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify(
                    payload
                ),

            }

        );

        const data =
            await res.json();

        console.log(data);

        alert(
            "Review submitted successfully!"
        );
        setReviewerName("");
        setRating("5");
        setComment("");
        console.log(
  "Refreshing page..."
);
        router.refresh();

    }

    return (

        <div>

            <h3>
                Leave A Review
            </h3>

            <input
                placeholder="Your Name"
                value={reviewerName}
                onChange={(e) =>
                    setReviewerName(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <select
                value={rating}
                onChange={(e) =>
                    setRating(
                        e.target.value
                    )
                }
            >

                <option value="5">
                    5 Stars
                </option>

                <option value="4">
                    4 Stars
                </option>

                <option value="3">
                    3 Stars
                </option>

                <option value="2">
                    2 Stars
                </option>

                <option value="1">
                    1 Star
                </option>

            </select>

            <br />
            <br />

            <textarea
                placeholder="Write your review"
                value={comment}
                onChange={(e) =>
                    setComment(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={submitReview}
            >
                Submit Review
            </button>

        </div>

    );

}