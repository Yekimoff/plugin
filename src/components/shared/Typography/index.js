// import React from 'react';
import Text from './Text';
import { default as Header } from './Header';
import { default as Link } from './Link';


const Typography = Text;
Typography.Header = Header;
Typography.Link = Link;

export { Text, Header, Link };

export default Typography;
