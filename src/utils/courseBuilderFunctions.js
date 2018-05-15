const React = require('react')
const moment = require('moment');
module.exports ={
    calenderBuilder(startDate, endDate){

    },

    startDateFunc(startDate){
        return startDate
    },
    endDateFunc(startDate){
        return startDate
    },
    courseRange(startDate, endDate){
        var a = moment(startDate)
        var b = moment(endDate)
     return b.diff(a, 'days')
    },


}