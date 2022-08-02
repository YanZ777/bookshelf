/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {Dialog} from './lib'

const ModalContext = React.createContext()

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn?.(...args))

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  const toggle = () => setIsOpen(false)
  return React.cloneElement(child, {
    onClick: callAll(toggle, child.props.onClick),
  })
}

function ModalOpenButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  const toggle = () => setIsOpen(true)
  return React.cloneElement(child, {
    onClick: callAll(toggle, child.props.onClick),
  })
}

function ModalContents(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}
