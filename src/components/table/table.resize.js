import { $ } from '@core/dom'

export function resizeHandler ($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  let value
  $resizer.css({
    opacity: 1,
    bottom: type === 'col' ? '-5000px' : 0,
    right: type === 'row' ? '-5000px' : 0
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({ right: -delta + 'px' })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({ bottom: -delta + 'px' })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(cell => cell.style.width = value + 'px')
    } else {
      $parent.css({ height: value + 'px' })
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}
