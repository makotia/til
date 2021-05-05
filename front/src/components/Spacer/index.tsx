import { h, FunctionComponent } from "preact"

import { css } from "goober"

type Size = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128

type Props = {
  width?: Size,
  height?: Size,
  spOnly?: boolean,
  pcOnly?: boolean,
}

const Spacer: FunctionComponent<Props> = ({ width = 0, height = 0, spOnly, pcOnly }: Props) => {
  const spOnlyStyle = css({
    display: "none",
    "@media (max-width: 1000px)": {
      display: "block",
    },
  })

  const pcOnlyStyle = css({
    display: "block",
    "@media (max-width: 1000px)": {
      display: "none",
    },
  })

  const style = css({
    display: "block",
    width: `${width}px`,
    height: `${height}px`,
  })

  const styles = [style]
  spOnly && styles.push(spOnlyStyle)
  pcOnly && styles.push(pcOnlyStyle)

  return (
    <span className={styles.join(" ")} />
  )
}

export default Spacer
