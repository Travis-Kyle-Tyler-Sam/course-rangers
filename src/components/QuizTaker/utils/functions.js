

module.exports = {

    state: {
        index: 0,
        
    },

    setState: function(state) {
        this.state = Object.assign({}, state)
    },

    cycleLeft: function(indexIn) {

        if( indexIn !== 0) {
            indexIn--
            this.setState({ index: indexIn })
        } 
    },

    cycleRight: function(indexIn, questions) {

        if( indexIn !== questions.length -1) {
            indexIn++
            this.setState({ index: indexIn })
        } 
    },

    selectQuestion: function (i) {
        this.setState({
            index: i
        })
    }
}