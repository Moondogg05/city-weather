const iconUrl = "https://worldweather.wmo.int/images";

const weatherIcon = (conditions) => {
  if (conditions === 'sn') {
    return `${iconUrl}/6.png`
  } else if (conditions === 'sl') {
    return `${iconUrl}/8.png`
  } else if (conditions === 'h') {
    return `${iconUrl}/3.png`
  } else if (conditions === 't') {
    return `${iconUrl}/2.png`
  } else if (conditions === 'hr') {
    return `${iconUrl}/9.png`
  } else if (conditions === 'lr') {
    return `${iconUrl}/15.png`
  } else if (conditions === 's') {
    return `${iconUrl}/12.png`
  } else if (conditions === 'hc') {
    return `${iconUrl}/23a.png`
  } else if (conditions === 'lc') {
    return `${iconUrl}/22a.png`
  } else if (conditions === 'c') {
    return `${iconUrl}/24a.png`
  }
}

export default weatherIcon;