/**
 * @param {string} selector
 * @returns {HTMLElement}
 */
export const $ = (selector) => document.querySelector(selector);
/**
 * @param {string} selector
 * @returns {HTMLElement[]}
 */
export const $$ = (selector) => document.querySelectorAll(selector);

  /**
   * Transforma un texto plano en nodos html
   * @param {string} str
   * @returns {HTMLElement}
   */
  export const string2html = (str) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    return doc.body.children[0];
  }
/**
 * Función encargada de realizar consultas a servicios api,
 * mientras las almacena en cache para evitar sobre carga de consultas
 * @param {string} urlResponse ruta de consulta de la consulta
 * @param {{cacheName: string, revalidate: number}} options cacheName: es el nombre del storge donde se almacena la cache,
 * revalidate:  es el tiempo en minutos que debe transcurrir para que la consulta almacenada en cache sea actualizada con otra consulta
 * @returns {Promise<JSON>}
 */
export const fetchCacheInterceptor = async (urlResponse, {cacheName, revalidate})=>{
  try {
    
  
  //verificamos si la ultima consulta de este url tiene más de una hora, para ello llevamos un control del tiempo con el local storage
  const confirmDate = window.localStorage
    .getItem(`timeof_${urlResponse}`);
  let isOutTime = false;
  if(!confirmDate) window.localStorage
    .setItem(
      `timeof_${urlResponse}`, 
      `${Date.now()}`
    )
    if((Date.now() - parseInt(confirmDate)) > 1000 * 60 * 60 * revalidate){
      isOutTime = true;
    }
  
  const cache = await window.caches.open(cacheName);
  const resCache = await cache.match(urlResponse);
  if(!resCache || isOutTime){
    
    window.localStorage
    .setItem(`timeof_${urlResponse}`, `${Date.now()}`)
    const req = await fetch(urlResponse);
    const responseToReturn = await req.json();
    const responseToCache = new Response(JSON.stringify(responseToReturn), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(urlResponse, responseToCache);
    return responseToReturn
  }else{
    return await resCache.json();
  }
} catch (error) {
  alert(`${error}`)
   throw error 
}
}

/**
 * Función encargada de realizar consultas a servicios api,
 * mientras las almacena en cache para evitar sobre carga de consultas
 * @param {string} urlResponse ruta de consulta de la consulta
 * @param {{cacheName: string, revalidate: number}} options cacheName: es el nombre del storge donde se almacena la cache,
 * revalidate:  es el tiempo en minutos que debe transcurrir para que la consulta almacenada en cache sea actualizada con otra consulta
 * @returns {Promise<JSON>}
 */
export const fetchPersistenceInterceptor = async (urlResponse, {storeName, revalidate})=>{
  try {
    
  
  //verificamos si la ultima consulta de este url tiene más de una hora, para ello llevamos un control del tiempo con el local storage
  const confirmDate = window.localStorage
    .getItem(`timeof_${urlResponse}`);
  let isOutTime = false;
  if(!confirmDate) window.localStorage
    .setItem(
      `timeof_${urlResponse}`, 
      `${Date.now()}`
    )
    if((Date.now() - parseInt(confirmDate)) > 1000 * 60 * 60 * revalidate){
      isOutTime = true;
    }
  
  //consultamos la base de datos local-----------
  const indxDB = window.indexedDB
  /**
   * @type {IDBDatabase}
   */
  let db;
  if(!indxDB) throw new Exception('no hay indexedDB')
  const request = indxDB.open('my_movies', 1)
  request.onsuccess = ()=>{
    db = request.result;
    console.log('base de datos abierta');
  }
  
  request.onupgradeneeded = ()=>{
    
    db = request.result;
    console.log('base de datos creada');
    //la clave será generada autamáticamente de forma incremental
    const objectStore = db.createObjectStore(storeName,{
      keyPath: 'key'
    })
    
    //transaccion de escritura
    // const transaction = db.transaction([storeName],'readwrite');
    // const store = transaction.objectStore(storeName);
    // const request = store.add('comprar el pan mundo')
    //transaccion de lectura
    const transaction = db.transaction([storeName],'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.get(urlResponse);
    request.onsuccess = () =>{

    }
  }

  if(!resCache || isOutTime){
    
    window.localStorage
    .setItem(`timeof_${urlResponse}`, `${Date.now()}`)
    const req = await fetch(urlResponse);
    const responseToReturn = await req.json();
    const responseToCache = new Response(JSON.stringify(responseToReturn), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(urlResponse, responseToCache);
    return responseToReturn
  }else{
    return await resCache.json();
  }
} catch (error) {
  alert(`${error}`)
   throw error 
}
}
