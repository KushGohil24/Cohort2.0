import axios from 'axios';
axios.get('http://localhost:5000/api/product').then(console.log).catch(console.error);
