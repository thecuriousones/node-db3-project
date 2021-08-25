const Schemes = require('./scheme-model.js')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const { id } = req.params
  Schemes.findById(id)
    .then(scheme =>{
      if(!scheme) {
        res.status(404).json({message: `scheme with scheme_id ${id} not found`})
      } else {
        console.log(scheme)
        req.scheme = scheme
        next()
      }
    })
    .catch(error =>{
      console.log(error)
      res.status(500).json({
        message: "Could not find scheme id"
      })
    })


}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if(!req.body.scheme_name){
    res.status(400).json({message: "invalid scheme_name"})
  } else {
    next()
  }

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body
  if(!instructions || instructions === undefined || typeof instructions !== 'string' || typeof step_number !== 'number' || step_number < 1) {
    res.status(400).json({message: "invalid step"})
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
