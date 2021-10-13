"use strict";
let countryService = require("../service/countryService");

module.exports = {
  createCountry: async (req, res,next) => {
    try {
      let response = await countryService.createCountry(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
  getAllCountries: async (req, res, next) => {
    try {
      let response = await countryService.getAllCountries(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
  getCountry: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await countryService.getCountry(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
  updateCountry: async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let response = await countryService.updateCountry(
        req.body,
        id,
        req.user
      );
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
  deleteCountry: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await countryService.deleteCountry(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

};