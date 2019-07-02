import EditMementosView from "./EditMementos-view.js";
import axios from "axios";
import React from "react";

const EditMementos = ({
  owner,
  photos,
  title,
  description,
  id,
  profilePicture,
  username,
  onClick,
  loadData,
  selectedPhotos,
  cities,
  _id,
  setError,
  wasCalled,
  message
}) => {
  if (!wasCalled) {
    axios.get(`/photos/${owner}`).then(res => {
      loadData(
        res.data.map(p => {
          return photos.includes(p.id) ? { ...p, active: true } : p;
        }),
        "PHOTOS"
      );
    });
    axios
      .get(`/globeData`)
      .then(res => {
        loadData(
          res.data.map(c => {
            return {
              city: c.city,
              country: c.country,
              active: c.city + ", " + c.country === title
            };
          }),
          "CITIES"
        );
      })
      .catch(err => alert(err));
    setError("ERR_EDIT");
  }

  return (
    <EditMementosView
      owner={owner}
      photos={photos}
      title={title}
      description={description}
      editMemento={() => {
        if (!document.querySelector("select").selectedIndex) {
          setError("ERR_EDIT", "Select a city");
          return;
        } else {
          const city =
            cities[document.querySelector("select").selectedIndex - 1].city;
          const country =
            cities[document.querySelector("select").selectedIndex - 1].country;
          const description = document.querySelector("textarea").value;
          const photos = selectedPhotos.map(p => p.id);

          if (!photos.length) {
            setError("ERR_EDIT", "Select one or more photos");
            return;
          } else if (!description) {
            setError("ERR_EDIT", "Write about your trip");
            return;
          } else {
            axios
              .post(`/mementos/edit/${_id}`, {
                description,
                photos,
                city,
                country
              })
              .then(res => {
                if (res.status === 200) {
                  setError("ERR_EDIT", "Success!");
                  setTimeout(() => window.location.reload(), 1000);
                }
              })
              .catch(err => alert(err));
          }
        }
      }}
      id={id}
      profilePicture={profilePicture}
      username={username}
      onClick={onClick}
      message={message}
    />
  );
};

export default EditMementos;
