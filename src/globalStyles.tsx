import { GlobalStyles as TwinGlobalStyles } from 'twin.macro';
import { css, Global } from '@emotion/react';

const styles = css`
  :root {
    --d: 0 0% 100%;
    --p1: 259 94% 61%;
    --p2: 259 94% 51%;
    --p3: 259 94% 41%;
    --s1: 314 100% 57%;
    --s2: 314 100% 47%;
    --s3: 314 100% 37%;
    --a1: 174 60% 61%;
    --a2: 174 60% 51%;
    --a3: 174 60% 41%;
    --cp: 0 0% 100%;
    --cs: 0 0% 100%;
    --ca: 0 0% 100%;
    --c1: 220 14% 96%;
    --c2: 228 14% 93%;
    --c3: 220 15% 84%;
    --c4: 218 14% 65%;
    --c5: 220 14% 46%;
    --c6: 220 14% 37%;
    --c7: 219 14% 28%;
    --c8: 222 13% 19%;
    --c9: 223 14% 10%;
    --in: 207 90% 54%;
    --su: 174 100% 29%;
    --wa: 36 100% 50%;
    --er: 14 100% 57%;
  }
`;

const globalStyles = [<Global styles={styles} />, <TwinGlobalStyles />];

export default globalStyles;
