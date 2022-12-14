import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Route/Route';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className='bg-color'>
      <RouterProvider
      router={router}
      ></RouterProvider>
       <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
