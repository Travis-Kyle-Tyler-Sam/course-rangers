const fns = require('./utils/functions')

describe( 'Cycle Left Test', () => {
    test('When passed 0, the index should not decrement', () => {
        let before = fns.state.index
        fns.cycleLeft(0)
        expect(fns.state.index).toEqual(before)
    })
    test('When passed 2, the index should decrement by 1', () => {
        let before = fns.state.index;
        fns.cycleLeft(2)
        let after = fns.state.index
        let difference = after - before
        expect(difference).toEqual(1)
    })
})

describe('Set index test', ()=>{
    test('When passed 10, index should state.index should equal 10', ()=>{
        fns.state.index = 0
        fns.selectQuestion(10)
        expect(fns.state.index).toEqual(10)
    })
})

describe('Cycle right tests', ()=>{
    test('When passed 4, the index should not increment', ()=>{
        fns.state.index = 0;
        let start = fns.state.index;
        let arry = ['a', 'b', 'c', 'd', 'e']
        fns.cycleRight(4, arry)
        let end = fns.state.index;
        let diff = end - start;
        expect(diff).toEqual(0)
    })
    test('When passed 3, the index should increment by 1', ()=>{
        fns.state.index = 0;
        let start = fns.state.index;
        let arry = ['a', 'b', 'c', 'd', 'e']
        fns.cycleRight(3, arry)
        let end = fns.state.index;
        let diff = end - start;
        expect(diff).toEqual(4)
    })
})

