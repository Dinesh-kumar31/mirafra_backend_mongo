const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const Admin = require('../models/admin').admin
const Employee = require('../models/employee').employee
const Rating = require('../models/rating').rating

async function login(req, res) {
    try {
        const data = req.body
        Admin.findOne({email: data.email}).then(admin => {
            if (!admin)
                 res.json({status: 400, message: 'No user found'});
            else{
                if (data.password === admin.password) {
                    const token = jwt.sign(
                        {id: admin.id, email: admin.email },
                        'A@B#C$D%',
                        {
                          expiresIn: "1h",
                        }
                      );
                    res.json({status: 200, message: 'Approved', token: token})
                }else{
                    res.json({status: 400, message: 'Enter valid password'})
                }
            }
        })
    } catch (error) {
        res.json({status: 500, message: 'Unable to connect'})
    }
}

async function getAllEmployee(req, res) {
    try {
       Employee.find().then(employees => {
        if (!employees)
        res.json({status: 400, message: 'No employees found'});
    else{
        res.json({status: 200, message: 'Employees list founded', employees: employees})
     }
       })
    } catch (error) {
        res.json({status: 500, message: 'Unable to connect'})
    }
}

async function createEmployee(req, res) {
    try {
        const employeeData = new Employee(req.body) 
        employeeData.save().then(employee => {
        if (!employee)
        res.json({status: 400, message: 'Employee not Created'});
     else{
        res.json({status: 200, message: 'Employee Created', employee: employee})
     }
       });
    } catch (err) {
        res.json({status: 500, message: 'Unable to connect'})
    }
}

async function updateEmployee(req, res) {
    let Id;
    if (mongoose.isValidObjectId(req.params.id)) 
    Id = req.params.id;
    else
    Id = Number(req.params.id)
    try {
        const employeeData = req.body
       Employee.findByIdAndUpdate(Id, employeeData).then(employee => {
            if (!employee)
            res.json({status: 400, message: 'Employee not Updated'});
         else{
            res.json({status: 200, message: 'Employee Updated', employee: employee})
         }
       });
    } catch (err) {
        res.json({status: 500, message: 'Unable to connect'})
    }
}

async function deleteEmployee(req, res) {
    let Id;
    if (mongoose.isValidObjectId(req.params.id)) 
    Id = req.params.id;
    else
    Id = Number(req.params.id)
    try {
    Employee.findByIdAndDelete(Id).then(deleteUser => {
    if (!deleteUser)
        res.json({status: 400, message: 'Employee not Deleted'});
    else{
        res.json({status: 200, message: 'Employee Deleted', employee: deleteUser})
        }
   });
    } catch (error) {
        res.json({status: 500, message: 'Unable to connect'})
    }
}

async function addRating(req, res) {
    try {
        const ratingData = new Rating(req.body)
       await ratingData.save().then(rating => {
            if (!rating)
            res.json({status: 400, message: 'Employee rating not Created'});
         else{
            Employee.findByIdAndUpdate(rating.empId,  { $set: { rated: true }}).exec()
            res.json({status: 200, message: 'Employee rating created', ratings: rating})
         }
        })
    } catch (err) {
        console.log(err)
        res.json({status: 500, message: 'Unable to connect'})
    }
}


async function getRating(req, res) {
    let Id;
    if (mongoose.isValidObjectId(req.params.empId)) 
    Id = req.params.empId;
    else
    Id = Number(req.params.empId)
    try {
        Rating.findOne({empId: Id}).exec((err, rating) => {
            if (!rating)
            res.json({status: 400, message: 'Employee rating not able to get'});
         else{
            res.json({status: 200, message: 'Employee rating found', employeeRating: rating})
         }
        });
    } catch (err) {
        res.json({status: 500, message: 'Unable to connect'})
    }
}

async function updateRatings(req, res) {
    let Id;
    if (mongoose.isValidObjectId(req.params.rateid)) 
    Id = req.params.rateid;
    else
    Id = Number(req.params.rateid)
    try {
        const ratingData = req.body
        console.log(ratingData)
        Rating.findByIdAndUpdate(Id, ratingData).then(rating => {
            console.log(rating)
        if (!rating)
        res.json({status: 400, message: 'Employee rating not updated'});
     else{
        res.json({status: 200, message: 'Employee rating updated', employeeRating: rating})
     }
        })
    } catch (err) {
        res.json({status: 500, message: 'Unable to connect'})
    }
}

module.exports = {
    login,
    getAllEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    addRating,
    getRating,
    updateRatings
}