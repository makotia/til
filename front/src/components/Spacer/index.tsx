import { h, FunctionComponent } from "preact"

import { style } from "typestyle"

type Size = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128

type Props = {
  width?: Size,
  height?: Size,
  spOnly?: boolean,
  pcOnly?: boolean,
}

const Spacer: FunctionComponent<Props> = ({ width = 0, height = 0, spOnly, pcOnly }: Props) => {
  const spOnlyStyle = style({
    display: "none",
    $nest: {
      "@media (max-width: 1000px)": {
        display: "block",
      },
    },
  })

  const pcOnlyStyle = style({
    display: "block",
    $nest: {
      "@media (max-width: 1000px)": {
        display: "none",
      },
    },
  })

  const defaultStyle = style({
    display: "block",
    width: `${width}px`,
    height: `${height}px`,
  })

  const styles = [defaultStyle]
  spOnly && styles.push(spOnlyStyle)
  pcOnly && styles.push(pcOnlyStyle)

  return (
    <span className={styles.join(" ")} />
  )
}

export default Spacer
