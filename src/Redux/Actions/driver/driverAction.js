import APIs from '../../../ServicesConfig/createApi';

export const getAllDriversService = (params, cbSuccess, cbError) => (dispatch) => {
    var endpoint = `/drivers/`;
    console.log(' Get all driver EndPoint:===>>>>>', endpoint)
    APIs.apiAuth.get(endpoint)
        .then((data) => {
            if (cbSuccess) {
                cbSuccess(data)
                return data
            }
        })
        .catch((error) => {
            console.log("Get all driver Error--->>>>>", error);
            if (cbError) {
                cbError(error)
                return error
            }
        })
}



export const createDriversService = (params, cbSuccess, cbError) => (dispatch) => {
  var endpoint = `/drivers/`;
  console.log('create driver EndPoint:===>>>>>', endpoint)
  APIs.apiAuth.post(endpoint,params)
      .then((data) => {
          if (cbSuccess) {
              cbSuccess(data)
              return data
          }
      })
      .catch((error) => {
          console.log("create driver Error--->>>>>", error);
          if (cbError) {
              cbError(error)
              return error
          }
      })
}

export const editDriversService = (params,id, cbSuccess, cbError) => (dispatch) => {
  var endpoint = `/drivers/${id}`;
  console.log('update driver EndPoint:===>>>>>', endpoint)
  APIs.apiAuth.put(endpoint,params)
      .then((data) => {
          if (cbSuccess) {
              cbSuccess(data)
              return data
          }
      })
      .catch((error) => {
          console.log("update driver Error--->>>>>", error);
          if (cbError) {
              cbError(error)
              return error
          }
      })
}

export const deleteDriversService = (id, cbSuccess, cbError) => (dispatch) => {
  var endpoint = `/drivers/${id}`;
  console.log('delete driver EndPoint:===>>>>>', endpoint)
  APIs.apiAuth.delete(endpoint)
      .then((data) => {
          if (cbSuccess) {
              cbSuccess(data)
              return data
          }
      })
      .catch((error) => {
          console.log("delete driver Error--->>>>>", error);
          if (cbError) {
              cbError(error)
              return error
          }
      })
}


export const getDriverDetailsService = (id, cbSuccess, cbError) => (dispatch) => {
  var endpoint = `/drivers/${id}`;
  console.log('delete driver EndPoint:===>>>>>', endpoint)
  APIs.apiAuth.get(endpoint)
      .then((data) => {
          if (cbSuccess) {
              cbSuccess(data)
              return data
          }
      })
      .catch((error) => {
          console.log("delete driver Error--->>>>>", error);
          if (cbError) {
              cbError(error)
              return error
          }
      })
}