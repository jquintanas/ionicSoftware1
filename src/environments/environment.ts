export const environment = {
  production: false,
  codigoCategoriaBebida: 0,
  codigoCategoriaDulces: 1,
  codigoCategoriaPostres: 2,
  codigoCategoriaTortas: 4,
  codigoCategoriaPromociones: 5,
  codigoFavoritos: "favoritos",
  mapboxkey: 'pk.eyJ1IjoiZGFubnBhcjk2IiwiYSI6ImNrYWJiaW44MjFlc2kydG96YXVxc2JiMHYifQ.iWfA_z-InyvNliI_EysoBw',
  phonePatter: "^(09){1}[0-9]{8}$",
  emailPatter: "^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$",
  idRol: 3,
  // tslint:disable-next-line: max-line-length
  secretEncryp: "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a",
  secretToken: "7187ba3735b821b9ae7bd7d5dd98b61a07ec2e9cef2aad92b97a4ed6080290e6",
  urlPerfil: "/api/usuarios/",
  urlBaseApi: "https://omipalisf2.herokuapp.com",
  // tslint:disable-next-line: max-line-length
  img_markers: ",14,0/300x300@2x?access_token=pk.eyJ1IjoiZGFubnBhcjk2IiwiYSI6ImNrYWJiaW44MjFlc2kydG96YXVxc2JiMHYifQ.iWfA_z-InyvNliI_EysoBw&attribution=false&logo=false",
  imgsecondpart: "),pin-s-cafe+e00000(-79.5419038,-1.8017518)/",
  rutas: {
    urlLogin: 'https://omipalisf2.herokuapp.com/api/login/usuario',
    urlNovelty: 'https://omipalisf2.herokuapp.com/api/noveltys/1',
    urlHistorial: 'https://omipalisf2.herokuapp.com/api/orders',
    urlGetUser: 'https://omipalisf2.herokuapp.com/api/usersS/',
    urlToken :  "https://omipalisf2.herokuapp.com/api/login/token",
    urlLogout : "https://omipalisf2.herokuapp.com/api/login/reject",
    urlHistorialUsuario: "/user",
    updateUser: 'https://omipalisf2.herokuapp.com/api/usersS/update/'
  },
  nombresCategorias: {
    dulces: "dulces",
    bebidas: "bebidas",
    promociones: "promociones",
    torta: "tortas",
    postres: "postres"
  },
  nombresTablasFirebase: {
    categorias: "categorias",
    productos: "producto",
    pedidos: "pedido"
  }
};

export const firebaseConfig = {
  apiKey: "AIzaSyAiPTePHyltKbiZeyXkuzMHQCfOVSz_Ezo",
  authDomain: "omi-y-pali-80d1d.firebaseapp.com",
  databaseURL: "https://omi-y-pali-80d1d.firebaseio.com",
  projectId: "omi-y-pali-80d1d",
  storageBucket: "omi-y-pali-80d1d.appspot.com",
  messagingSenderId: "1021916524711",
  appId: "1:1021916524711:web:53ad66cdb16967169eeb82",
  measurementId: "G-0WPXHE9SG1"
};
