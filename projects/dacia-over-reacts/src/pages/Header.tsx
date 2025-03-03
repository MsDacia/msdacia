import content from '../json/static.en-us.json'

let invertColors = false
let showMenu = false
let showMenuClassName = showMenu ? 'toggle off icon hide-content' : 'toggle on icon show-content'

function colorsInverted(): void {
  const bodyTag = document.getElementsByTagName('body')[0]
  invertColors = !invertColors

  if (invertColors) {
    if (bodyTag.classList) {
      bodyTag.classList.add('light')
    } else {
      bodyTag.className += ' light'
    }
  } else {
    if (bodyTag.classList) {
      bodyTag.classList.remove('light')
    } else {
      bodyTag.className = bodyTag.className.replace(new RegExp('(^|\\b)' + 'light'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  }
}

function hideMenu(): void {
  showMenu = false
}

function toggleMenu(): void {
  showMenu = !showMenu
}

export default function Footer(props: MenuProps) {
  return (
    <header>
      <i className="eyedropper icon" onClick={colorsInverted} />

      <div className="item" onClick={toggleMenu}>
        <i className={showMenuClassName} />
        <em className={showMenu ? 'active' : ''}>{content.common.global.menu}</em>
      </div>

      <div className={showMenu ? 'menu show-content' : 'menu hide-content'}>
        {props.items.map(nav =>
          <a href={nav.path} key={nav.item} onClick={hideMenu}>
            <i className="terminal icon" /> {nav.title}
          </a>
        )}
      </div>
    </header>
  )
}

export interface MenuProps {
  items: MenuItem[]
}

export interface MenuItem {
  item: string
  path: string
  title: string
}
