import React from 'react'

export default function syncComponent (chunkName, mod) {
  const Component = mod.default ? mod.default : mod // es6 module compat

  function SyncComponent (props) {
    return <Component {...props} />
  }

  return SyncComponent
}
