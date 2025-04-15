import axios from 'axios';

export default async function checkAuthAndRedirect(navigate,num=0) {

    const currentPath = window.location.pathname;
    if (currentPath === '/registration') {
        return { result: 1 };
      }

    if(num===0){
  const token = localStorage.getItem('token'); // or 'access' if that's your key
  console.log(token)
  if (!token) {
    navigate('/login'); // redirect if no token
    return;
  }

  try {
    console.log(token)
    const response = await axios.get('http://127.0.0.1:8000/richim/hello/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    if (response.data.success !== 1) {
      navigate('/login');
    }

  } catch (error) {
    console.log('Token is invalid or expired', error);
    localStorage.removeItem('token')
    navigate('/login');
  }
}
return {result:1};
}
