/**
 * Translate passenger type
 * @param x0 passenger type
 */
 export const translatePassengerAgeCategory = (x) => {
  switch (x.toLowerCase()) {
    case 'adult':
      return 'Взрослый';
    case 'child':
      return 'Ребёнок';
    default:
      return 'Младенец';
  }
};
