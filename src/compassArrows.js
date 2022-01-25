const windIcons = "/images/wind_direction";

const compassArrow = (windDirection) => {
  if (windDirection === 'N') {
    return `${windIcons}/n.png`
  } else if (windDirection === 'E') {
    return `${windIcons}/e.png`
  } else if (windDirection === 'S') {
    return `${windIcons}/s.png`
  } else if (windDirection === 'W') {
    return `${windIcons}/w.png`
  } else if (windDirection === 'NE') {
    return `${windIcons}/ne.png`
  } else if (windDirection === 'NW') {
    return `${windIcons}/nw.png`
  } else if (windDirection === 'SE') {
    return `${windIcons}/se.png`
  } else if (windDirection === 'SW') {
    return `${windIcons}/sw.png`
  } else if (windDirection === 'NNE') {
    return `${windIcons}/nne.png`
  } else if (windDirection === 'NNW') {
    return `${windIcons}/nnw.png`
  } else if (windDirection === 'SSE') {
    return `${windIcons}/sse.png`
  } else if (windDirection === 'SSW') {
    return `${windIcons}/ssw.png`
  } else if (windDirection === 'ENE') {
    return `${windIcons}/ene.png`
  } else if (windDirection === 'ESE') {
    return `${windIcons}/ese.png`
  } else if (windDirection === 'WNW') {
    return `${windIcons}/wnw.png`
  } else if (windDirection === 'WSW') {
    return `${windIcons}/wsw.png`
  }
}

export default compassArrow;