import { h, FunctionComponent } from "preact"

import { styled, setup } from "goober"

setup(h)

type Size = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128

type Props = {
  width?: Size,
  height?: Size,
  spOnly?: boolean,
  pcOnly?: boolean,
}

const Spacer: FunctionComponent<Props> = ({ width = 0, height = 0, spOnly, pcOnly }: Props) => {
  const SpacerComponent = styled("span")({
    display: spOnly ? undefined : "block",
    width: `${width}px`,
    height: `${height}px`,
    "@media (max-width: 1000px)": {
      display: pcOnly ? "none" : undefined,
    },
  })

  return <SpacerComponent />
}

export default Spacer
