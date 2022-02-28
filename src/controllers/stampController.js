let stampService = require("../service/stampService");

module.exports = {
  
  createStamp: async (req, res, next) => {
    try {
      let response = await stampService.createStamp(req.body,req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },


  getStamps: async(req,res,next)=>{

    try {
      let response = await stampService.getStamps(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  getStamp: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await stampService.getStamp(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
  updateStamp: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await stampService.updateStamp(
        req.body,
        id,
        req.user
      );
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
  deleteStamp: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await stampService.deleteStamp(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },


};


