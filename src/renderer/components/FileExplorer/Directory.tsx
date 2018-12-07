import * as React from 'react'

export default props => {
  return props.visible ? <div className="material-icons">folder_open</div> : <div className="material-icons">folder</div>
}
