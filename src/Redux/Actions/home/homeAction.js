import axios from 'axios';

export const getAllFlightService = (data, cbSuccess, cbError) => {
      return async dispatch => {
        try {
          var config = {
            method: 'get',
            url: `https://api.instantwebtools.net/v1/passenger?page=${data.page}&amp;size=10`,
            headers: {
              'Content-Type': 'application/json',
            }
          };
          let response = await axios(config);
          if (cbSuccess) {
            cbSuccess(response)
            return response
          }
  
        } catch (err) {
          if (cbError) {
            cbError(err);
            return err.response
          }
        }
      };
  };