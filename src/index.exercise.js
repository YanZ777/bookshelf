import * as React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import Dialog from '@reach/dialog';
import "@reach/dialog/styles.css";


function App() {
   const [showLoginDialog, setShowLoginDialog] = React.useState(false);
   const [showRegisterDialog, setShowRegisterDialog] = React.useState(false);

   const onOpenLoginDialog = ()=> {
      setShowLoginDialog(true);
   };
   const onOpenRegisterDialog = () => {
      setShowRegisterDialog(true);
   };

   const onCloseLoginDialog = () => {
      setShowLoginDialog(false);
   };
   const onCloseRegisterDialog = () => {
      setShowRegisterDialog(false);
   };

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
         <div>
         <button onClick={onOpenLoginDialog}>Login</button>
         </div>
      <Dialog isOpen={showLoginDialog} onDismiss={onCloseLoginDialog}>
         Login
      </Dialog>
         <div>
         <button onClick={onOpenRegisterDialog}>Register</button>
         </div>
      <Dialog isOpen={showRegisterDialog} onDismiss={onCloseRegisterDialog}>
         Register
      </Dialog>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
