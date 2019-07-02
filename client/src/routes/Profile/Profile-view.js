import React from "react";
import Drawer from "../../components/Drawer";
import Footer from "../../components/Footer";
import NavbarOther from "../../components/Navbar/NavbarOther";
import {
  setSignedIn,
  setViewer,
  setOwner,
  loadData,
  newSlide,
  setError
} from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
import Memento from "../../components/Cards/Mementos";

const ProfileView = ({
  setSignedIn,
  setOwner,
  setViewer,
  match,
  fullAccess,
  loadData,
  newSlide,
  setError,
  wasCalled
}) => {
  window.onload = () => {
    function waitForUser(done) {
      if (done) {
        axios
          .get(`/users/${match.params.id}`)
          .then(r => {
            setSignedIn(done);
            setViewer(done);
            setOwner(r.data);
            axios
              .get(`/globeData`)
              .then(res => {
                loadData(
                  res.data.map(c => {
                    return {
                      city: c.city,
                      country: c.country
                    };
                  }),
                  "CITIES"
                );
              })
              .catch(err => alert(err));

            axios.get(`/photos/${match.params.id}`).then(res => {
              loadData(res.data, "PHOTOS");
            });
          })
          .catch(err => alert(err));
        return;
      }
      axios
        .get("/users", { withCredentials: true })
        .then(res => {
          // setSignedIn(res.data._id)
          // setViewer(res.data._id)
          waitForUser(res.data._id);
        })
        .catch(err => alert(err));
    }

    if (!wasCalled) {
      waitForUser(false);
      axios
        .get(`/mementos/user/${match.params.id}`)
        .then(res => {
          if (res.status === 200) {
            res.data.map(mem => {
              newSlide();
              axios.get(`/users/${mem.owner}`).then(r => {
                loadData(
                  {
                    ...mem,
                    username: r.data.username,
                    profilePicture: r.data.profilePicture
                  },
                  "MEMENTOS"
                );
              });
            });
          } else {
            alert(res);
          }
        })
        .catch(err => alert(err));
    }
    setError("ERR_PROFILE");
  };

  return (
    <div>
      <NavbarOther />
      <div
        className="columns"
        style={{
          minHeight: "-webkit-fill-available",
          paddingTop: "3.25rem"
        }}
      >
        <Drawer location="/profile" fullAccess={fullAccess} />
        <Memento fullAccess={fullAccess} />
        <div className="column is-1"> </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => {
  if (!state.perspective.owner._id) {
    return {
      wasCalled: state.err.profile,
      fullAccess: true
    };
  } else {
    return {
      wasCalled: state.err.profile,
      fullAccess: state.perspective.viewer === state.perspective.owner._id
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setSignedIn: id => dispatch(setSignedIn(id)),
    setOwner: id => dispatch(setOwner(id)),
    setViewer: id => dispatch(setViewer(id)),
    loadData: (id, label) => dispatch(loadData(id, label)),
    newSlide: () => dispatch(newSlide()),
    setError: label => dispatch(setError(label))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);
