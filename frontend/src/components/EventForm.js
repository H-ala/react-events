import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import classes from "./EventForm.module.css";
import { getAuthToken } from "../util/auth";

import DateInput from "./DateInput";

import { useState } from "react";

function EventForm({ method, event }) {
  const [eventDate, setEventDate] = useState(
    event && event.date
      ? new DateObject({
          date: event.date, // رشته میلادی از event
          calendar: persian, // تقویم شمسی
          locale: persian_fa, // زبان فارسی
          format: "YYYY-MM-DD", // فرمت رشته اولیه
        })
      : null
  );

  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">عنوان</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">تصویر</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <div>
        <label htmlFor="date">تاریخ</label>
        <DateInput
          date={eventDate}
          setDate={setEventDate}
          required
          placeholder="تاریخ را انتخاب کنید"
          inputClass={classes["date-input"]}
        />
        <input
          type="hidden"
          name="date"
          value={eventDate ? eventDate.format("YYYY/MM/DD") : ""}
        />
      </div>
      <p>
        <label htmlFor="description">توضیحات</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "در حال ارسال…" : "ذخیره"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:5000/events";

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = "http://localhost:5000/events/" + eventId;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "امکان ذخیره رویداد وجود ندارد." }),
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
}
