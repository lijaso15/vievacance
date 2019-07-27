function assignColour(popularity: number) {
  if (popularity < 10) {
    return "hero is-danger"; //danger
  } else if (popularity < 30) {
    return "hero is-warning"; //warning
  } else if (popularity < 50) {
    return "hero is-success"; //success
  } else if (popularity < 75) {
    return "hero is-info"; //info
  } else {
    return "hero is-primary"; //primary
  }
}

export default assignColour;
