export const getAirlineLogo = (
  code,
  width,
  height,
  standart,
) =>
  `http://mpics.avs.io/${!standart ? 'al_square/' : ''}${width || 64}/${
    height || 64
  }/${code}.png`;