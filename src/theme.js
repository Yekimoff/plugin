export const MainTheme = {
  borderRadius: '4px',
  breakpoints: {
    mobile: '375px',
    tablet: '768px',
    hd: '1024px',
    fullHD: '1920px',
  },
  colors: {
    main: '#4872F2',
    gray: '#B9B9B9',
    lightGray: '#DCDCDC',
    darkGray: '#737373',
    blackGray: '#3C3C3C',
    white: '#FFFFFF',
    red: '#E73C3E',
    blue: '#4872F2',
    lightBlue: '#EDF1FE',
    yellow: '#FFE100',
    black: '#000000',
  },
  fonts: {
    bold: 'OpenSans-Bold',
    semiBold: 'OpenSans-SemiBold',
    regular: 'Open Sans',
  },
  max: (breakpoint) => `@media (max-width: ${breakpoint})`,
  min: (breakpoint) => `@media (min-width: ${breakpoint})`,
};



