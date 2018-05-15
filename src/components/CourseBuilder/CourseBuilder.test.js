const React = require('react');
const courseBuilderFunctions = require('./../../utils/courseBuilderFunctions');
const CourseBuilderTool = require('./CourseBuilderTool');


describe('Does function create calender days', ()=>{
    test('Start date is a date', ()=>{
        let date = new Date('2018-05-14')
        let result = courseBuilderFunctions.startDateFunc(date) instanceof Date
        expect(result).toBe(true)
    })
    test('End date is a date', ()=>{
        let date = new Date('2018-05-14')
        let result = courseBuilderFunctions.endDateFunc(date) instanceof Date
        expect(result).toBe(true)
    })
    test('Course range calculates difference in days', ()=>{
        let startDate = new Date('2018-05-14')
        let endDate = new Date('2018-05-15')
        let result = courseBuilderFunctions.courseRange(startDate, endDate)
        expect(result).toEqual(1)
    })

})


