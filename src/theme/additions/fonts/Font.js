import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Cygnito Mono';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Cygnito Mono.otf') format('opentype');
      }
      `}
  />
)

export default Fonts