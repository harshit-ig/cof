// Run this in your browser console to clear authentication and test
console.log('Clearing authentication data...');
localStorage.removeItem('token');
console.log('Token removed from localStorage');

// Redirect to login
if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
  window.location.href = '/admin/login';
}





